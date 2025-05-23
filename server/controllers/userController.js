import User from '../models/User.js';

// Create User – Admin only
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (err) {
        next(err);
    }
};

// Get users based on role logic
export const getUsers = async (req, res, next) => {
    try {
        const currentUser = req.user;
        let filter = {};

        if (currentUser.role === 'Admin') {
            // Admin: exclude other Admins
            filter.role = { $ne: 'Admin' };
        } else if (currentUser.role === 'Manager') {
            // Manager: exclude Admins and Managers
            filter.role = { $nin: ['Admin', 'Manager'] };
        } else if (currentUser.role === 'Member') {
            // Member: only get their own data
            filter._id = currentUser._id;
        }

        const users = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        next(err);
    }
};
