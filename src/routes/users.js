import express from 'express';

import { UsersController } from '../controllers/usersControllers.js'; 
import authenticate from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { profileUpload } from '../middleware/upload.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authenticate, isAdmin, UsersController.getAllUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     operationId: getUserById
 *     summary: Get a user by ID
 *     description: Retrieves the details of a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */
router.get('/:id', UsersController.getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/:id', authenticate, UsersController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticate, isAdmin, UsersController.deleteUser);

/**
 * @swagger
 * /api/users/{id}/subscription:
 *   put:
 *     summary: Update user subscription status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update subscription status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription status updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id/subscription', authenticate, UsersController.updateSubscription);

/**
 * @swagger
 * /api/users/{id}/profilePicture:
 *   put:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update profile picture
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or missing file
 *       404:
 *         description: User not found
 */
router.put('/:id/profilePicture', authenticate, profileUpload.single('profilePicture'), UsersController.updateProfilePicture);



/**
 * @swagger
 * /api/users/email:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */
router.get('/email', authenticate, UsersController.getUserByEmail);

/**
 * @swagger
 * /api/users/{userId}/password:
 *   put:
 *     summary: Update a user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update password
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Current password is incorrect
 *       404:
 *         description: User not found
 */
router.put('/:userId/password', authenticate, UsersController.updatePassword);

export default router;




