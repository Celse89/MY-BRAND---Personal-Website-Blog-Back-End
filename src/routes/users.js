
import express from 'express';
import { UsersController } from '../controllers/usersControllers.js';
import { validateSignup, validatePost, validatePostId } from '../utils/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, UsersController.signup);
router.post('/createPost', validatePost, UsersController.createPost);
router.get('/getPosts', UsersController.getPosts);
router.put('/updatePost', validatePostId, validatePost, UsersController.updatePost);
router.delete('/deletePost', validatePostId, UsersController.deletePost);
router.post('/login', UsersController.login);

export default router;