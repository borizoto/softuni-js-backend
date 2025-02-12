import Movie from "../models/Movie.js";

// import movies from "../movies.js";

function getMovie(movieId) {
    const result = Movie.findById(movieId);

    return result;
}

function create(movieDataObj, creatorId) {
    // Movie.create({ ...movieDataObj, year: Number(movieDataObj.year), rating: Number(movieDataObj.rating) });
    movieDataObj.creator = creatorId;
    return Movie.create(movieDataObj); // It knows that year and ratings are numbers because we have specified it in the model.
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

function attachCast(castId, movieId) {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}

function deleteMovie(movieId) {
    return Movie.findByIdAndDelete(movieId);
}

function editMovie(movieData, movieId) {
    return Movie.findByIdAndUpdate(movieId, movieData);
}

export default {
    getMovie,
    create,
    getAll,
    attachCast,
    deleteMovie,
    editMovie
}