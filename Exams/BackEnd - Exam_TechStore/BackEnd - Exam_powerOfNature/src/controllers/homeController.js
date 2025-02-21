import { Router } from "express";

import disasterService from "../services/disasterService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const disasters = await disasterService.getLatest();

        res.render('home', { disasters });
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('home', { error: curError });
    }
});

export default homeController;