import { Router } from "express";

import disasterService from "../services/disasterService.js";
import { isAuthRouteGuard } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import disasterTypesPicker from "../helpers/eventHelpers.js";

const disasterController = Router();

disasterController.get('/', async (req, res) => {
    try {
        const disasters = await disasterService.getAll();

        res.render('disasters/catalog', { disasters });
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('disasters/catalog', { error: curError });
    }
});

disasterController.get('/create', isAuthRouteGuard, (req, res) => {
    res.render('disasters/create');
});

disasterController.post('/create', isAuthRouteGuard, async (req, res) => {
    const disasterData = req.body;
    const userId = req.user._id;

    try {
        await disasterService.create(disasterData, userId);

        res.redirect('/disasters');
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('disasters/create', { error: curError, disaster: disasterData })
    }
});

disasterController.get('/:disasterId/details', async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterService.getOne(disasterId);

    try {
        const isOwner = disaster.owner.equals(req.user?._id);
        const isPreferred = disaster.interestedList.includes(req.user?._id);

        res.render('disasters/details', { disaster, isOwner, isPreferred })
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('/', { error: curError });
    }
});

disasterController.get('/:disasterId/prefer', isAuthRouteGuard, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user._id;

    try {
        await disasterService.prefer(disasterId, userId);
        res.redirect(`/disasters/${disasterId}/details`);
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('404', { error: curError });
    }
});

disasterController.get('/:disasterId/delete', isAuthRouteGuard, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user._id;

    try {
        await disasterService.deleteDisaster(disasterId, userId);
        res.redirect('/disasters');
    } catch (error) {
        const curError = getErrorMessage(error);
        console.error(error)
        res.render('404', { error: curError });
    }
});

disasterController.get('/:disasterId/edit', isAuthRouteGuard, async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterService.getOne(disasterId);
    const userId = req.user._id;

    try {
        if (!disaster.owner.equals(userId)) {
            throw new Error('Cannot edit offers of other users!');
        }

        const disasterTypes = disasterTypesPicker(disaster.disasterType);

        res.render('disasters/edit', { disaster, disasterTypes })
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('404', { error: curError });
    }

});

disasterController.post('/:disasterId/edit', isAuthRouteGuard, async (req, res) => {
    const disasterId = req.params.disasterId;
    const disasterData = req.body;
    const userId = req.user._id;

    try {
        await disasterService.update(disasterId, userId, disasterData);

        res.redirect(`/disasters/${disasterId}/details`);
    } catch (error) {
        const disasterTypes = disasterTypesPicker(disasterData.disasterType);
        const curError = getErrorMessage(error);
        res.render('disasters/edit', { disaster: disasterData, disasterTypes, error: curError });
    }
});

disasterController.get('/search', async (req, res) => {
    const filterDataObj = req.query;
    const disasters = await disasterService.search(filterDataObj);

    res.render('disasters/search', { disasters, filterDataObj });
});

export default disasterController;