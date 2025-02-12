import { Router } from "express";

import movieService from "../services/movieService.js";
import ratingSetter from "../helpers/ratingHelper.js";
import castService from "../services/castService.js";
import categoryPicker from "../helpers/categoriePicker.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuthenticated, (req, res) => {
    res.render('create');
});

movieController.get('/search', async (req, res) => {
    const filterDataObj = req.query;

    const movies = await movieService.getAll(filterDataObj);

    res.render('search', { movies, filterDataObj });
});

movieController.post('/create', async (req, res) => {
    const movieDataObj = req.body;
    const userId = req.user?.id;

    await movieService.create(movieDataObj, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).populate('casts');

    const rating = ratingSetter(Number(movie.rating));

    const isCreator = movie.creator.equals(req.user?.id);

    res.render('movie/details', { movie, rating, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);
    const casts = await castService.getCast({ castsUsed: movie.casts });

    res.render('movie/attach-cast', { movie, casts });
})

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.castId;
    const movieId = req.params.movieId;

    await movieService.attachCast(castId, movieId);

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    const isCreator = movie.creator.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/404');
    }

    await movieService.deleteMovie(movieId);

    res.redirect('/');
})

movieController.get('/:movieId/edit', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    const categories = categoryPicker(movie.category);

    res.render('movie/edit', { movie, categories });
})

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    const isCreator = movie.creator.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/404');
    }

    console.log(movieData)

    await movieService.editMovie(movieData, movieId);
    res.redirect(`/movies/${movieId}/details`);
})

export default movieController;