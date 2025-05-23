import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import path from 'path';
import connectDB from './config/db.js';
import rateLimit from './middlewares/rateLimiter.js';
import errorHandler from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://pms-p6lo.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit);


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Serve frontend in production
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
