import express from 'express';

import { BlogsControllers } from '../controllers/blogsControllers.js'; 
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validatePost, validatePostId, validatePostIdParam } from '../utils/validation.js';

const router = express.Router();

router.post('/createPost', authenticate, validatePost, BlogsControllers.createPost);
router.get('/', authenticate, BlogsControllers.getPosts);
router.get('/getPost/:id', authenticate, validatePostIdParam, BlogsControllers.getPost);
router.put('/updatePost', authenticate, validatePostId, validatePost, BlogsControllers.updatePost);
router.delete('/deletePost', authenticate, validatePostId, BlogsControllers.deletePost);
router.put('/likePost', authenticate, BlogsControllers.likePost);

export default router;