import { Router } from "express";

import deviceService from "../services/deviceService.js";
import { isAuthRouteGuard } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const deviceController = Router();

deviceController.get('/', async (req, res) => {
    try {
        const devices = await deviceService.getAll();

        res.render('devices/catalog', { devices });
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('devices/catalog', { error: curError });
    }
});

deviceController.get('/create', isAuthRouteGuard, (req, res) => {
    res.render('devices/create');
});

deviceController.post('/create', isAuthRouteGuard, async (req, res) => {
    const deviceData = req.body;
    const userId = req.user._id;

    try {
        await deviceService.create(deviceData, userId);

        res.redirect('/devices');
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('devices/create', { error: curError, device: deviceData })
    }
});

deviceController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    try {
        const isOwner = device.owner.equals(req.user?._id);
        const isPreferred = device.preferredList.includes(req.user?._id);

        res.render('devices/details', { device, isOwner, isPreferred })
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('/', { error: curError })
    }
});

deviceController.get('/:deviceId/prefer', isAuthRouteGuard, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user._id;

    try {
        await deviceService.prefer(deviceId, userId);
        res.redirect(`/devices/${deviceId}/details`);
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('404', { error: curError })
        // res.redirect(`/devices/${deviceId}/details`);
    }
});

deviceController.get('/:deviceId/delete', isAuthRouteGuard, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user._id;

    try {
        await deviceService.deleteOffer(deviceId, userId);
        res.redirect('/devices');
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('404', { error: curError });
    }
});

deviceController.get('/:deviceId/edit', isAuthRouteGuard, async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);
    const userId = req.user._id;

    try {
        if (!device.owner.equals(userId)) {
            throw new Error('Cannot edit offers of other users!');
        }

        res.render('devices/edit', { device })
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('404', { error: curError });
        //Look if the examers want to display or redirect to 404
        // res.redirect(`/devices/${deviceId}/details`) 
    }

});

deviceController.post('/:deviceId/edit', isAuthRouteGuard, async (req, res) => {
    const deviceId = req.params.deviceId;
    const deviceData = req.body;
    const userId = req.user._id;

    try {
        await deviceService.update(deviceId, userId, deviceData);

        res.redirect(`/devices/${deviceId}/details`);
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('devices/edit', { device: deviceData, error: curError });
    }
});

export default deviceController;