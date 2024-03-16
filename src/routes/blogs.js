import express from 'express';

import { BlogsControllers } from '../controllers/blogsControllers.js'; 
import authenticate  from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validatePost, validatePostId, validatePostIdParam } from '../utils/validation.js';
import { blogUpload } from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid request or missing fields
 */
router.post('/', authenticate, validatePost, BlogsControllers.createPost); 

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/', BlogsControllers.getPosts); 

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog post not found
 *       400:
 *         description: Invalid blog post ID
 *       500:
 *         description: Server error
 */
router.get('/:id',validatePostIdParam, BlogsControllers.getPost);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog post not found
 */
router.put('/:id', authenticate, validatePostId, validatePost, BlogsControllers.updatePost);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 */
router.delete('/:id', authenticate, validatePostId, BlogsControllers.deletePost);

/**
 * @swagger
 * /api/blogs/{id}/like:
 *   put:
 *     summary: Like a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post liked successfully
 *       404:
 *         description: Blog post not found
 */
router.put('/:id/like', authenticate, BlogsControllers.likePost);

/**
 * @swagger
 * /api/blogs/{id}/unlike:
 *   put:
 *     summary: Unlike a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to unlike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post unliked successfully
 *       404:
 *         description: Blog post not found
 */
router.put('/:id/unlike', authenticate, BlogsControllers.unlikePost); 

/**
 * @swagger
 * /api/blogs/upload:
 *   post:
 *     summary: Upload a blog post image
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: Invalid request or missing image
 */
router.post('/', authenticate, blogUpload.single('image'), validatePost, BlogsControllers.createPost);

export default router;