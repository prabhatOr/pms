import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken, generateRefreshToken } from '../services/tokenService.js';

// User Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Exclude password from response
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            token,
            refreshToken,
            user: userData,
        });
    } catch (err) {
        next(err);
    }
};

// Refresh JWT Token
export const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

        const newToken = generateToken(user);
        res.json({ token: newToken });
    } catch (err) {
        next(err);
    }
};
