import User from "../models/User.js";
import { SECRET } from "../lib/lib.js";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function register(userData) {
    const isRegistered = await User.findOne({email: userData.email});

    if (isRegistered) {
        throw new Error('Email is already registered!')
    }

    return User.create(userData);
}

async function login(email, password) {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password!');
    }
    // Check if password is correctr
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    // Create token jwt and return it 
    const payload = {
        id: user._id,
        email: user.email
    };

    const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});
    
    return token;
}

export default {
    register,
    login
}