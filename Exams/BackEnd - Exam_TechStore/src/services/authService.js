import bcrypt from "bcrypt";

import User from "../models/User.js";
import authUtils from "../utils/authUtils.js";

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
        throw new Error('Invalid email or password!');
    }

    const token = authUtils.genereateToken(user);

    return token;
}

async function register(userData) {
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password must be correct!')
    }

    const registeredUser = await User.findOne({ email: userData.email }).select({ _id: 1 });

    if (registeredUser) {
        throw new Error('User is already registered!');
    }

    const newUser = await User.create(userData);

    const token = authUtils.genereateToken(newUser);

    return token;
}

const authService = {
    register,
    login
};

export default authService;