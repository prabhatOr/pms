import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, companyId: user.companyId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};
