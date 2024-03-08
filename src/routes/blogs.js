import express from 'express';

import { BlogsControllers } from '../controllers/blogsControllers.js'; 
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validatePost, validatePostId, validatePostIdParam } from '../utils/validation.js';
import { blogUpload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', authenticate, validatePost, BlogsControllers.createPost); 
router.get('/', authenticate, BlogsControllers.getPosts); 
router.get('/:id', authenticate, validatePostIdParam, BlogsControllers.getPost);
router.put('/:id', authenticate, validatePostId, validatePost, BlogsControllers.updatePost); 
router.delete('/:id', authenticate, validatePostId, BlogsControllers.deletePost); 
router.put('/:id/like', authenticate, BlogsControllers.likePost);
router.post('/', authenticate, blogUpload.single('image'), validatePost, BlogsControllers.createPost);

export default router;