import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

//TODO: Modify schema
const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required!'], minLength: 10 },
    name: { type: String, required: [true, 'Name is required!'], minLength: 2, maxLength: 20 },
    password: { type: String, required: [true, 'Password is required!'], minLength: 4 }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;