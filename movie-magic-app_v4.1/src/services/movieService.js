import Movie from "../models/Movie.js";

// import movies from "../movies.js";

function getMovie(movieId) {
    // const result = movies.find(movie => movie.id === movieId);
    // const result = Movie.find({_id: movieId});
    const result = Movie.findById(movieId);

    return result;
}

function create(movieDataObj) {
    // Movie.create({ ...movieDataObj, year: Number(movieDataObj.year), rating: Number(movieDataObj.rating) });
    Movie.create(movieDataObj); // It knows that year and ratings are numbers because we have specified it in the model.
}

function getAll(filterDataObj = {}) {
    let query = Movie.find({});

    //* Search functionality
    if (filterDataObj.title) {
        query = query.where({ title: filterDataObj.title });
    }

    if (filterDataObj.genre) {
        query = query.where({ genre: filterDataObj.genre });
    }

    if (filterDataObj.year) {
        query = query.where({ year: Number(filterDataObj.year) });
    }

    return query;
}

export default {
    getMovie,
    create,
    getAll
}