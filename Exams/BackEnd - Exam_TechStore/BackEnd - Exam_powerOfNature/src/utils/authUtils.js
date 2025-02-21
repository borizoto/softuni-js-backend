import jsonwebtoken from "../lib/jsonwebtoken.js";

import { JWT_SECRET } from "../config.js";

async function genereateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = await jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
}

export default {
    genereateToken,
}