import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});


    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Prevent rendering login page if already logged in
    if (user) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await axios.post('/auth/login', {
                email,
                password,
            });

            const { token, refreshToken, user } = res.data;

            login({ token, refreshToken, user });
            toast.success('Login successful');
            navigate('/dashboard');
        } catch (err) {
            const message =
                err.response?.data?.message || 'Login failed, please try again.';
            toast.error(message);
        }
    };


    return (
        <div className="h-screen flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 text-sm">
                <div className="flex items-center justify-center md:p-8">
                    <div className="text-center">
                        <img src="/assets/images/loginimg.png" alt="Illustration" className="mx-auto max-w-full" />
                    </div>
                </div>
                <div className="flex flex-col justify-center md:p-8">
                    <div className="flex items-center mb-6 space-x-3">
                        <h1 className="text-3xl font-serif font-semibold text-gray-800">
                            Welcome to Project Management System
                        </h1>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-yellow-400'
                                    }`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Password</label>
                            <div className={`w-full px-4 py-2 border flex items-center rounded-md focus:outline-none ${errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-yellow-400'}`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your password"
                                    className="outline-none w-full"
                                />
                                <div className="cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                    {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>

                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold py-2 rounded-md flex items-center justify-center space-x-2"
                        >
                            <span>Continue</span> <FaLongArrowAltRight />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}