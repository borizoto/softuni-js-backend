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

function getAll(filterDataObj = {}) {
    let resultArr = movies;

    if (filterDataObj.title) {
        resultArr = movies.filter(movie => movie.title.toLowerCase().includes(filterDataObj.title.toLowerCase()));
    }

    if (filterDataObj.genre) {
        resultArr = movies.filter(movie => movie.genre.toLowerCase() === filterDataObj.genre.toLowerCase());
    }

    if (filterDataObj.year) {
        resultArr = movies.filter(movie => movie.year === filterDataObj.year);
    }

    return resultArr;
}

export default {
    getMovie,
    create,
    getAll
}