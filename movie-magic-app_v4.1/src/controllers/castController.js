import { Router } from "express";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create')
})

castController.post('/create', (req, res) => {
    const castDataObj = req.body;
    console.log(castDataObj);
    
    res.redirect('/casts')
})

export default castController;