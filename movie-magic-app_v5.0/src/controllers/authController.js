import { Router } from "express";

import authService from "../services/authService.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
})

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (error) {
        console.error(error.message);
        res.redirect('/404');
    }
})

authController.get('/login', (req, res) => {
    res.render('auth/login');
})

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        console.error(error.message);
        res.redirect('/404');
    }
})

authController.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;