import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 100,
    message: 'Too many requests from this IP, please try again after 24 hours.',
});

export default limiter;
