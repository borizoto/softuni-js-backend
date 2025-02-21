import Disaster from "../models/Disaster.js";

async function create(disasterData, userId) {
    disasterData.owner = userId;
    await Disaster.create(disasterData);
}

async function getLatest() {
    const disasters = await Disaster.find({}).sort({ createdAt: 'desc' }).limit(3);

    return disasters;
}

async function getAll(filter = {}) {
    let query = Disaster.find({});

    if (filter.owner) {
        query = query.find({ owner: filter.owner });
    }

    if (filter.interestedBy) {
        query = query.find({ interestedList: filter.interestedBy });
    }

    return query;
}

async function getOne(disasterId) {
    const disaster = await Disaster.findOne({ _id: disasterId });

    return disaster;
}

async function prefer(disasterId, userId) {
    const disaster = await Disaster.findById(disasterId);

    if (disaster.owner.equals(userId)) {
        throw new Error('Cannot prefer own offers!');
    }

    if (disaster.interestedList.includes(userId)) {
        throw new Error('You have already interested this offer!');
    }

    disaster.interestedList.push(userId);

    return disaster.save();
}

async function deleteDisaster(disasterId, userId) {
    const disaster = await Disaster.findById(disasterId);

    if (!disaster.owner.equals(userId)) {
        throw new Error('Cannot delete offers of other users!');
    }

    return await Disaster.findByIdAndDelete(disasterId);
}

async function update(disasterId, userId, disasterData) {
    const disaster = await Disaster.findById(disasterId);

    if (!disaster.owner.equals(userId)) {
        throw new Error('Cannot edit offers of other users!');
    }

    return await Disaster.findByIdAndUpdate(disasterId, disasterData, { runValidators: true })
}

async function search(filterDataObj = {}) {
    let query = Disaster.find({});

    if (filterDataObj.disasterName) {
        query = query.find({ disasterName: { $regex: new RegExp(filterDataObj.disasterName, 'i') } });
    }

    if (filterDataObj.disasterType) {
        query = query.find({ disasterType: { $regex: new RegExp(filterDataObj.disasterType, 'i') } });
    }

    return query;
}


const disasterService = {
    create,
    getLatest,
    getAll,
    getOne,
    prefer,
    deleteDisaster,
    update,
    search
}

export default disasterService;