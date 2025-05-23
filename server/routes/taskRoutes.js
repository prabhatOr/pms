import express from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);         // Admin/Manager access enforced in controller
router.get('/', protect, getTasks);            // Everyone sees their scope
router.put('/:id', protect, updateTask);       // Conditional access
router.delete('/:id', protect, deleteTask);    // Admin/Manager only

export default router;
