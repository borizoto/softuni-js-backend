import Device from "../models/Device.js";

async function create(deviceData, userId) {
    deviceData.owner = userId;
    await Device.create(deviceData);
}

async function getLatest() {
    const devices = await Device.find({}).sort({ createdAt: 'desc' }).limit(3);
    // const devices = await Device.find({}).sort({ _id: 'desc' }).limit(3);

    return devices;
}

async function getAll(filter = {}) {
    let query = Device.find({});

    if (filter.owner) {
        query = query.find({ owner: filter.owner });
    }

    if (filter.preferredBy) {
        query = query.find({ preferredList: filter.preferredBy });
    }

    return query;
}

async function getOne(deviceId) {
    const device = await Device.findOne({ _id: deviceId });

    return device;
}

async function prefer(deviceId, userId) {
    const device = await Device.findById(deviceId);

    if (device.owner.equals(userId)) {
        throw new Error('Cannot prefer own offers!');
    }

    if (device.preferredList.includes(userId)) {
        throw new Error('You have already preferred this offer!');
    }

    device.preferredList.push(userId);

    return device.save();
}

async function deleteOffer(deviceId, userId) {
    const device = await Device.findById(deviceId);

    if (!device.owner.equals(userId)) {
        throw new Error('Cannot delete offers of other users!');
    }

    return await Device.findByIdAndDelete(deviceId);
}

async function update(deviceId, userId, deviceData) {
    const device = await Device.findById(deviceId);

    if (!device.owner.equals(userId)) {
        throw new Error('Cannot edit offers of other users!');
    }

    return await Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true })
}

const deviceService = {
    create,
    getLatest,
    getAll,
    getOne,
    prefer,
    deleteOffer,
    update
}

export default deviceService;