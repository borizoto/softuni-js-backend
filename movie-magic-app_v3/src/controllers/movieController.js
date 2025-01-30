import { Router } from "express";

import movieService from "../services/movieService.js";
import ratingSetter from "../helpers/ratingHelper.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', (req, res) => {
    const filterDataObj = req.query;

    const movies = movieService.getAll(filterDataObj);

    res.render('search', { movies, filterDataObj });
});

movieController.post('/create', (req, res) => {
    const movieDataObj = req.body;

    movieService.create(movieDataObj);

    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getMovie(movieId);

    const rating = ratingSetter(Number(movie.rating));

    res.render('details', { movie, rating });
});

export default movieController;