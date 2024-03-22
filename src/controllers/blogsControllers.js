import { v4 as uuidv4 } from 'uuid';
import Blogs from '../models/blogsModels.js';
import Comment  from '../models/commentModel.js'
import { User } from '../models/userModel.js';
import { CustomError, NotFoundError, ValidationError } from '../utils/error.js';

export class BlogsControllers {
    static async createPost(req, res, next) {
        try {
            console.log('Request body:', req.body); 

            const { title, content } = req.body; 
            let image = ""; 
    
            if (req.file) {
                console.log('Request file:', req.file);
                image = req.file.filename;
            }
    
            const user = await User.findById(req.user.id);
            console.log('User:', user); 
    
            if (!user) {
                throw new NotFoundError("User not found");
            }
    
            const blogPost = new Blogs({
                author: user.username,
                authorId: user._id,
                title,
                content,
                image: image || undefined 
            });
    
            await blogPost.save();
    
            res.status(201).json({ ok: true, message: "Post created", postId: blogPost._id });
        } catch (error) {
            console.error('Error:', error); 

            let statusCode = 500;
            let errorMessage = 'An unexpected error occurred';
        
            if (error instanceof ValidationError) {
                statusCode = 400;
                errorMessage = 'Invalid blog post data';
            } else if (error instanceof NotFoundError) {
                statusCode = 404;
                errorMessage = 'User not found';
            }
        
            res.status(statusCode).json({ ok: false, message: errorMessage });
        }
    }
    
    static async getPosts(req, res, next) {
        try {
            const blogPosts = await Blogs.find();
            res.status(200).json({ ok: true, data: blogPosts });
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
    
            res.status(200).json({ ok: true, data: blogPost });
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
            const { title, content, image: imageUrl } = req.body;
    
            let image = "";
    
            if (req.files && req.files.image && req.files.image[0]) {
                console.log('Request files:', req.files);
                image = 'http://localhost:5500/uploads/blogs/' + req.files.image[0].filename;
            } else if (imageUrl) {
                // If no new image file is provided, use the existing image URL
                image = imageUrl;
            }
    
            const blogPost = await Blogs.findById(postId);
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            blogPost.title = title;
            blogPost.content = content;
            if (image) { // Only update image if a new one is provided
                blogPost.image = image;
            }
    
            await blogPost.save();
    
            res.status(200).json({ ok: true, message: "Post updated" });
        } catch (error) {
            
            console.log('Error:', error);
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
                return res.status(404).json({ ok: false, message: "Post not found" });
            }
    
            await Blogs.deleteOne({ _id: id });
    
            res.status(200).json({ ok: true, message: "Post deleted" });
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                res.status(400).json({ ok: false, message: "Invalid blog post ID" });
            } else {
                res.status(500).json({ ok: false, message: "An unexpected error occurred" });
            }
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
    
            res.status(200).json({ ok: true, message: "Post liked" });
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
    
            res.status(200).json({ ok: true, message: "Post unliked" });
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