
import Comment from '../models/commentModel.js';
import Blogs from '../models/blogsModels.js';
import { NotFoundError } from '../utils/error.js';

class CommentControllers {
    static async createComment(req, res, next) {
        try {
            const { content } = req.body;
            const { postId } = req.params; 
            const userId = req.user.id;
    
            const blogPost = await Blogs.findById(postId);
    
            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }
    
            const comment = new Comment({
                author: userId,
                post: postId,
                content
            });
    
            await comment.save();
    
            blogPost.comments.push(comment._id);
            await blogPost.save();
    
            res.status(201).json({ message: "Comment created", commentId: comment._id });
        } catch (error) {
            next(error);
        }
    }


    static async likeComment(req, res, next) {
        try {
            const { commentId } = req.body;
            const userId = req.user.id;

            const comment = await Comment.findById(commentId);

            if (!comment) {
                throw new NotFoundError("Comment not found");
            }

            if (comment.likes.includes(userId)) {
                throw new CustomError("User already liked the comment", 400);
            }

            comment.likes.push(userId);

            await comment.save();

            res.status(200).json({ message: "Comment liked" });
        } catch (error) {
            next(error);
        }
    }

    static async getComments(req, res, next) {
        try {
            const { postId } = req.params;

            const blogPost = await Blogs.findById(postId).populate('comments');

            if (!blogPost) {
                throw new NotFoundError("Post not found");
            }

            res.status(200).json({ comments: blogPost.comments });
        } catch (error) {
            next(error);
        }
    }

    static async updateComment(req, res, next) {
        try {
            const { postId, commentId } = req.params;
            const { content } = req.body;

            const comment = await Comment.findOne({ _id: commentId, post: postId });

            if (!comment) {
                throw new NotFoundError("Comment not found");
            }

            comment.content = content;

            await comment.save();

            res.status(200).json({ message: "Comment updated" });
        } catch (error) {
            next(error);
        }
    }

    static async deleteComment(req, res, next) {
        try {
            const { postId, commentId } = req.params;

            const comment = await Comment.findOne({ _id: commentId, post: postId });

            if (!comment) {
                throw new NotFoundError("Comment not found");
            }

            await comment.remove();

            res.status(200).json({ message: "Comment deleted" });
        } catch (error) {
            next(error);
        }
    }

}



export default CommentControllers;