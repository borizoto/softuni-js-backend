import { Router } from "express";

import movieService from "../services/movieService.js";
import ratingSetter from "../helpers/ratingHelper.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', async (req, res) => {
    const filterDataObj = req.query;

    const movies = await movieService.getAll(filterDataObj);

    res.render('search', { movies, filterDataObj });
});

movieController.post('/create', async (req, res) => {
    const movieDataObj = req.body;

    await movieService.create(movieDataObj);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).populate('casts');

    const rating = ratingSetter(Number(movie.rating));

    res.render('movie/details', { movie, rating });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
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

export default movieController;