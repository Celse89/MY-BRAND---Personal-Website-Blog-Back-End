import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";
import dotenv from 'dotenv';
import { ValidationError, NotFoundError } from '../utils/error.js';

dotenv.config();

async function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new Error('No authentication token found'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new Error('User associated with the token not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
export default authenticate;
