import Task from '../models/Task.js';

// Create Task – Admin/Manager
export const createTask = async (req, res, next) => {
    try {
        const { title, description, assignedTo, projectId } = req.body;

        const task = await Task.create({
            title,
            description,
            assignedTo,
            projectId
        });

        res.status(201).json({ message: 'Task created', task });
    } catch (err) {
        next(err);
    }
};

// Get All Tasks – All Roles
export const getTasks = async (req, res, next) => {
    try {
        const { status, assignedTo, page = 1 } = req.query;
        const filter = {};

        if (req.user.role === 'Member') {
            filter.assignedTo = req.user.id;
        } else {
            if (status) filter.status = status;
            if (assignedTo) filter.assignedTo = assignedTo;
        }

        const limit = 10;
        const skip = (page - 1) * limit;

        const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .populate('assignedTo', 'name')
            .populate('projectId', 'name');

        res.json({ page, count: tasks.length, tasks });
    } catch (err) {
        next(err);
    }
};

// Update Task – Admin/Manager OR Assigned Member
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        const isAdminOrManager = ['Admin', 'Manager'].includes(req.user.role);
        const isAssignedMember = req.user.id === String(task.assignedTo);

        if (!isAdminOrManager && !isAssignedMember) {
            return res.status(403).json({ message: 'Forbidden: you cannot update this task' });
        }

        // Members can only update status
        if (req.user.role === 'Member') {
            task.status = req.body.status || task.status;
        } else {
            Object.assign(task, req.body);
        }

        await task.save();

        res.json({ message: 'Task updated', task });
    } catch (err) {
        next(err);
    }
};

// Delete Task – Admin/Manager only
export const deleteTask = async (req, res, next) => {
    try {
        if (!['Admin', 'Manager'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: only Admin/Manager can delete tasks' });
        }

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
};
