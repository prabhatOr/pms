import express from 'express';
import {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';

import protect from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Admin & Manager access
router.post('/', protect, checkRole(['Admin', 'Manager']), createProject);
router.get('/', protect, getProjects);
router.put('/:id', protect, checkRole(['Admin', 'Manager']), updateProject);
router.delete('/:id', protect, checkRole(['Admin', 'Manager']), deleteProject);

export default router;
