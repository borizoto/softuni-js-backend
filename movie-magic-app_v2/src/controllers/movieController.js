import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const movieDataObj = req.body;

    movieService.create(movieDataObj);
    console.log(movieDataObj)

    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getMovie(movieId);
    
    res.render('details', movie);
});

export default movieController;