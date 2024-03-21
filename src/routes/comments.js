import express from 'express';

import CommentControllers from '../controllers/commentControllers.js'; 
import authenticate from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validatePost, validatePostId } from '../utils/validation.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/{postId}/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to comment on.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comments'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 */
router.post('/:postId/comments', authenticate, CommentControllers.createComment);

/**
 * @swagger
 * /api/{postId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comments'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 */
router.put('/:postId/comments/:commentId', authenticate, CommentControllers.updateComment);

/**
 * @swagger
 * /api/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
router.delete('/:postId/comments/:commentId', authenticate, isAdmin, CommentControllers.deleteComment);

/**
 * @swagger
 * /api/{postId}/comments/{commentId}/like:
 *   put:
 *     summary: Like a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to like.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment liked successfully
 */
router.put('/:postId/comments/:commentId/like', authenticate, CommentControllers.likeComment);

/**
 * @swagger
 * /api/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 */
router.get('/:postId/comments', authenticate, CommentControllers.getComments);

export default router;