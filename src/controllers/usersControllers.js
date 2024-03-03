// controllers/usersController.js
import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";
import { JWT } from "../utils/jwt.js";
import { validateSignup, validatePost, validatePostId } from "../utils/validation.js";

const BCRYPT_SALT_ROUNDS = 10;

export class UsersController {
    static async signup(req, res, next) {
        try {
            const { username, email, password } = req.body;

            // Checking if the user exists
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                throw new CustomError("User already exists", 400);
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

            // Creating a new user 
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

    static async createPost(req, res, next) {
        try {
            const { title, content } = req.body;

            const user = await User.findById(req.user.id);

            if (!user) {
                throw new CustomError("User not found", 404);
            }

            user.posts.push({ title, content });
            await user.save();

            res.status(201).json({ message: "Post created" });
        } catch (error) {
            next(error);
        }
    }

    static async getPosts(req, res, next) {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                throw new CustomError("User not found", 404);
            }

            res.status(200).json(user.posts);
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { postId, title, content } = req.body;

            const user = await User.findById(req.user.id);

            if (!user) {
                throw new CustomError("User not found", 404);
            }

            const post = user.posts.id(postId);

            if (!post) {
                throw new CustomError("Post not found", 404);
            }

            post.title = title;
            post.content = content;

            await user.save();

            res.status(200).json({ message: "Post updated" });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { postId } = req.body;

            const user = await User.findById(req.user.id);

            if (!user) {
                throw new CustomError("User not found", 404);
            }

            const post = user.posts.id(postId);

            if (!post) {
                throw new CustomError("Post not found", 404);
            }

            post.remove();

            await user.save();

            res.status(200).json({ message: "Post deleted" });
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
}