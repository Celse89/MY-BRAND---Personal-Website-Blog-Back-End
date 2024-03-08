import express from 'express';

import { MessageControllers } from '../controllers/messageControllers.js'; 
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', authenticate, isAdmin, MessageControllers.getMessages);
router.get('/:id', authenticate, isAdmin, MessageControllers.getMessage);
router.post('/', MessageControllers.createMessage);
router.post('/:id/reply', authenticate, isAdmin, MessageControllers.replyMessage);
router.delete('/:id', authenticate, isAdmin, MessageControllers.deleteMessage);

export default router;