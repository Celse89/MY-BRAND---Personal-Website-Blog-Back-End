import express from 'express';

import { MessageControllers } from '../controllers/messageControllers.js'; 
import authenticate from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Messages'
 */
router.get('/', authenticate, isAdmin, MessageControllers.getMessages);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Messages'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 */
router.post('/', MessageControllers.createMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 */
router.get('/:id', authenticate, isAdmin, MessageControllers.getMessage);

/**
 * @swagger
 * /api/messages/{id}/reply:
 *   post:
 *     summary: Reply to a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to reply to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Messages'
 *     responses:
 *       200:
 *         description: Message replied successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 */
router.post('/:id/reply', authenticate, isAdmin, MessageControllers.replyMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
router.delete('/:id', authenticate, isAdmin, MessageControllers.deleteMessage);

export default router;