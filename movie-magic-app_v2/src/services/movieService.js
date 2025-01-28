import { v4 as idGenerator } from "uuid";

import movies from "../movies.js";

function getMovie(movieId) {
    const result = movies.find(movie => movie.id === movieId);

    return result;
}

function create(movieDataObj) {
    const id = idGenerator();

    movies.push({ id, ...movieDataObj });
}

function getAll() {
    return movies;
}

export default {
    getMovie,
    create,
    getAll
}