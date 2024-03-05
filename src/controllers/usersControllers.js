import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";
import { JWT } from "../utils/jwt.js";
import { CustomError } from '../utils/error.js';
import mongoose from 'mongoose';

const BCRYPT_SALT_ROUNDS = 10;

export class UsersController {
    static async signup(req, res, next) {
        try {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if(existingUser) {
                throw new CustomError("User already exists", 400);
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

            const user = new User({
                username,
                email,
                password: hashedPassword
            });

            await user.save()

            const token = JWT.generateJwt({id: user._id});

            res.status(201).json({ token })
        } catch (error) {
            next(error);
        }
    }

    
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
    
            const user = await User.findOne({ email });
    
            if (!user) {
                throw new CustomError("User not found", 404);
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
            if (!isPasswordCorrect) {
                throw new CustomError("Invalid credentials", 401);
            }
    
        
            const token = JWT.generateJwt({ id: user._id });
            res.status(200).json({ token });

        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new CustomError('Invalid user id', 400);
            }
            const user = await User.findById(id);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

   
    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = { ...req.body };
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new CustomError('Invalid user id', 400);
            }
    
            if (updateData.password) {
                const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            }
    
            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!updatedUser) {
                throw new CustomError('User not found', 404);
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new CustomError('Invalid user id', 400);
            }

            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                throw new CustomError('User not found', 404);
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

}