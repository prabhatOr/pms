import Project from '../models/Project.js';

// Create Project
export const createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            createdBy: req.user.id
        });

        res.status(201).json({ message: 'Project created', project });
    } catch (err) {
        next(err);
    }
};

// Get All Projects
export const getProjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const projects = await Project.find()
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name email');

        res.json({ page, count: projects.length, projects });
    } catch (err) {
        next(err);
    }
};

// Update Project
export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndUpdate(id, req.body, { new: true });

        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.json({ message: 'Project updated', project });
    } catch (err) {
        next(err);
    }
};

// Delete Project
export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.json({ message: 'Project deleted' });
    } catch (err) {
        next(err);
    }
};
