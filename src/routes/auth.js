import express from 'express';
import { UsersController } from '../controllers/usersControllers.js'; 
import { validateSignup } from '../utils/validation.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: The confirmation of the password.
 *     responses:
 *       201:
 *         description: User successfully registered.
 */

router.post('/signup', validateSignup, UsersController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 */

router.post('/login', UsersController.login);



router.get('/checkToken', authenticate, UsersController.checkToken);


export default router;
