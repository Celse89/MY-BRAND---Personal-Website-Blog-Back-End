import bcrypt from 'bcrypt';

import { User } from "../models/userModel.js";
import { JWT } from "../utils/jwt.js";
import { CustomError } from '../utils/error.js';
import mongoose from 'mongoose';

const BCRYPT_SALT_ROUNDS = 10;

export class UsersController {
    static async signup(req, res, next) {
        try {
            const { username, email, password, confirmPassword } = req.body;

            if(password !== confirmPassword) {
                throw new CustomError("Passwords do not match", 400);
            }

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


            res.status(201).json({ message: 'Signed up successfully' });
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
    
            res.status(200).json({ message: 'Logged in successfully', token: token, userId: user._id, isAdmin: user.isAdmin}); // Return the token in the response body
    
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.find({});
            res.status(200).json({ ok: true, data: users });
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
            res.status(200).json({ ok: true, data: user});
        } catch (error) {
            next(error);
        }
    }

   
    static async updateUser(req, res, next) {
        try {
          const { id } = req.params;
          const { username, email, isAdmin, subscribed } = req.body;
    
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new CustomError('Invalid user id', 400);
          }
    
          const user = await User.findById(id);
    
          if (!user) {
            throw new CustomError('User not found', 404);
          }
    
          if (username) {
            user.username = username;
          }
    
          if (email) {
            user.email = email;
          }
    
          if (isAdmin !== undefined) {
            user.isAdmin = isAdmin;
          }
    
          if (subscribed !== undefined) {
            user.subscribed = subscribed;
          }
    
          await user.save();
    
          const updatedUser = user.toObject();
          delete updatedUser.password;
    
          res.status(200).json({ ok: true, data: updatedUser });
        } catch (error) {
          next(error);
        }
    }

    static async updatePassword(req, res, next) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.params.userId;
    
            const user = await User.findById(userId);
    
            if (!user) {
                throw new CustomError("User not found", 404);
            }
            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    
            if (!isPasswordCorrect) {
                throw new CustomError("Current password is incorrect", 401);
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ message: 'Password updated successfully' }); 
    
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

            res.status(200).json({ ok: true, message: 'User deleted successfully', data: deletedUser });
        } catch (error) {
            next(error);
        }
    }

    static async updateSubscription(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
    
            user.subscribed = !user.subscribed;
            await user.save();
    
            res.status(200).json({ ok: true, message: "Subscription updated", data: user });
        } catch (error) {
            next(error);
        }
    }



    static async updateProfilePicture(req, res, next) {
        try {
            const { id } = req.params;

            if (!req.file) {
                throw new CustomError('No file uploaded', 400);
            }

            const profilePicture = '/uploads/profiles/' + req.file.filename;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new CustomError('Invalid user id', 400);
            }

            const updatedUser = await User.findByIdAndUpdate(id, { profilePicture }, { new: true });

            if (!updatedUser) {
                throw new CustomError('User not found', 404);
            }

            const userWithProfilePictureUrl = {
                ...updatedUser._doc,
                profilePicture: 'http://localhost:5500' + updatedUser.profilePicture
            };

            res.status(200).json({ ok: true, data: userWithProfilePictureUrl });
        } catch (error) {
            next(error);
        }
    }

    static async getUserByEmail(req, res, next) {
        try {
            const { email } = req.query;
            if (!email) {
                throw new CustomError('Email is required', 400);
            }
            const user = await User.findOne({ email });
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            res.status(200).json({ ok: true, data: user});
        } catch (error) {
            next(error);
        }
    }

    
}