import jsonwebtoken from "../lib/jsonwebtoken.js";

import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js";

//Function to know whether user is logged or is guest so that navigation is correct
async function authMiddleware(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    // Here we check if user is guest. If he is guest we let him as he is.
    if (!token) {
        return next();
    }

    try {
        // If the cookie.token is decoded, it means that the user is authenticated and is not guest.
        const decodedToken = await jsonwebtoken.verify(token, JWT_SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;

    } catch (error) {
        res.clearCookie(AUTH_COOKIE_NAME);
        return res.redirect('/auth/login');
    }

    return next();
}

function isAuthRouteGuard(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    return next();
}

function isGuestRouteGuard(req, res, next) {
    if (req.user) {
        console.error('User is already logged in!');
        return res.redirect('404');
    }

    next();
}

export {
    authMiddleware,
    isAuthRouteGuard,
    isGuestRouteGuard
};