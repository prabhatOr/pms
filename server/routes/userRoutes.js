import express from 'express';
import { createUser, getUsers } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Admin can create users
router.post('/', protect, checkRole(['Admin', 'Manager']), createUser);

// Admin or Manager can view users
router.get('/', protect, checkRole(['Admin', 'Manager']), getUsers);

export default router;
