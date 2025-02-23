import { Router } from "express";

import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuthRouteGuard, isGuestRouteGuard } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get('/login', isGuestRouteGuard, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isGuestRouteGuard, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('auth/login', { error: curError, userData: { email } });
    }
});

authController.get('/register', isGuestRouteGuard, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuestRouteGuard, async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.register(userData);
        console.log(token)

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        const curError = getErrorMessage(error);
        res.render('auth/register', { error: curError, userData });
    }
});

authController.get('/logout', isAuthRouteGuard, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
})

export default authController;