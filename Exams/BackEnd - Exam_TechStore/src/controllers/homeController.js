import { Router } from "express";

import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuthRouteGuard } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const devices = await deviceService.getLatest();

        res.render('home', { devices });
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('home', { error: curError });
    }
})

homeController.get('/about', (req, res) => {
    res.render('about');
});

homeController.get('/profile', isAuthRouteGuard, async (req, res) => {
    const ownDevices = await deviceService.getAll({ owner: req.user._id });
    const preferredDevices = await deviceService.getAll({ preferredBy: req.user._id });
    
    res.render('profile', {
        ownDevices,
        preferredDevices
    });
});

export default homeController;