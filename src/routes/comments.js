import express from 'express';

import CommentControllers from '../controllers/commentControllers.js'; 
import authenticate from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validatePost, validatePostId } from '../utils/validation.js';

const router = express.Router({ mergeParams: true });

router.post('/:postId/comments', authenticate, CommentControllers.createComment);
router.put('/:postId/comments/:commentId', authenticate, CommentControllers.updateComment);
router.delete('/:postId/comments/:commentId', authenticate, isAdmin, CommentControllers.deleteComment);
router.put('/:postId/comments/:commentId/like', authenticate, CommentControllers.likeComment);
router.get('/:postId/comments', authenticate, CommentControllers.getComments);

export default router;