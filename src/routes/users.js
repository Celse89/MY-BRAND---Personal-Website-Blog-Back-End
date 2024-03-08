
import express from 'express';

import { UsersController } from '../controllers/usersControllers.js'; 
import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { profileUpload } from '../middleware/upload.js';




const router = express.Router();

router.get('/', authenticate, UsersController.getAllUsers);
router.get('/:id', authenticate, UsersController.getUser);
router.put('/:id', authenticate, UsersController.updateUser);
router.delete('/:id', authenticate, isAdmin, UsersController.deleteUser);
router.put('/:id/subscription', authenticate, UsersController.updateSubscription);
router.put('/:id/profilePicture', authenticate, profileUpload.single('profilePicture'), UsersController.updateProfilePicture);
export default router;