import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";
import dotenv from 'dotenv';

dotenv.config();

export async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
}