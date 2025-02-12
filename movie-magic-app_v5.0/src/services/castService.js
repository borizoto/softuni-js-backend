import Cast from "../models/Cast.js";

function getCast(filter = {}) {
    let query = Cast.find({});

    if (filter.castsUsed) {
        query = query.find({ _id: { $nin: filter.castsUsed } });
    }

    return query;
}

function create(castDataObj) {
    return Cast.create(castDataObj);
}

export default {
    getCast,
    create
}