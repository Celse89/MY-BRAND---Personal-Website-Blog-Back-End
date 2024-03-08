import { v4 as uuidv4 } from 'uuid';
import Blogs from '../models/blogsModels.js';
import Comment  from '../models/commentModel.js'
import { User } from '../models/userModel.js';
import { CustomError, NotFoundError, ValidationError } from '../utils/error.js';

export class BlogsControllers {
    static async createPost(req, res, next) {
        try {
            const { title, content } = req.body;
            const image = '/uploads/blogs/' + req.file.filename;

            const user = await User.findById(req.user.id);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            const blogPost = new Blogs({
                author: user.username,
                authorId: user._id,
                title,
                content,
                image
            });

            await blogPost.save();

            res.status(201).json({ message: "Post created", postId: blogPost._id });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400);
            } else if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

    static async getPosts(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const blogPosts = await Blogs.find().skip(skip).limit(limit);
            res.status(200).json(blogPosts);
        } catch (error) {
            next(error);
        }
    }

    static async getPost(req, res, next) {
        try {
            const { id } = req.params;
    
            const blogPost = await Blogs.findById(id).populate('comments');
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            res.status(200).json(blogPost);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { id: postId } = req.params;
            const { title, content } = req.body;

            const blogPost = await Blogs.findById(postId);

            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }

            blogPost.title = title;
            blogPost.content = content;

            await blogPost.save();

            res.status(200).json({ message: "Post updated" });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400);
            } else if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
    
            const blogPost = await Blogs.findById(id);
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            await Blogs.deleteOne({ _id: id });
    
            res.status(200).json({ message: "Post deleted" });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400);
            } else if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

    static async likePost(req, res, next) {
        try {
            const { id: postId } = req.params;
            const userId = req.user.id;
    
            const blogPost = await Blogs.findById(postId);
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            if (blogPost.likes.includes(userId)) {
                throw new CustomError("User already liked the post", 400);
            }
    
            blogPost.likes.push(userId);
    
            await blogPost.save();
    
            res.status(200).json({ message: "Post liked" });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400);
            } else if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

    static async unlikePost(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
    
            const blogPost = await Blogs.findById(id);
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            const index = blogPost.likes.indexOf(userId);
            if (index === -1) {
                throw new CustomError("User has not liked the post", 400);
            }
    
            blogPost.likes.splice(index, 1);
    
            await blogPost.save();
    
            res.status(200).json({ message: "Post unliked" });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400);
            } else if (error instanceof NotFoundError) {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
    }

}