import { Router } from "express";
import castService from "../services/castService.js";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
})

castController.post('/create', async (req, res) => {
    const castDataObj = req.body;
    await castService.create(castDataObj);
    
    res.redirect('/')
})

export default castController;