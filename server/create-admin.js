import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  await User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    role: 'Admin',
  });
  console.log('Admin created');
} catch (err) {
  console.error('Error creating admin:', err);
} finally {
  process.exit();
}
