import jwt, { decode } from "jsonwebtoken";

import { SECRET } from "../lib/lib.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.authUser = decodedToken;

        next();
    } catch (error) {
        res.clearCookie('auth')
        res.redirect('/auth/login');
    }
}

export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}