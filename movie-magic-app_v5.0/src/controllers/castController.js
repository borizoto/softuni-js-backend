import { Router } from "express";

import castService from "../services/castService.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const castController = Router();

castController.get('/create', isAuthenticated, (req, res) => {
    res.render('cast/create');
})

castController.post('/create', async (req, res) => {
    const castDataObj = req.body;
    await castService.create(castDataObj);

    res.redirect('/')
})

export default castController;