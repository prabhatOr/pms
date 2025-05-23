import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';
import { toast } from 'sonner';
import CommonLayout from '../layout/CommonLayout';

export default function UsersPage() {
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Member',
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingUsers, setFetchingUsers] = useState(true);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error('All fields are required');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/users', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('User created successfully');
            setFormData({ name: '', email: '', password: '', role: 'Member' });
            fetchUsers(); // Refresh list after creation
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to create user';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setFetchingUsers(true);
        try {
            const res = await axios.get('/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setFetchingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    return (
        <CommonLayout>
            <div className="w-full flex flex-col gap-6">
                {/* Form Section */}
                <div className="w-full">
                    <h2 className="text-xl font-medium mb-4">Create New User</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="border rounded px-4 py-2"
                            required
                        />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            className="border rounded px-4 py-2"
                            required
                        />
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="border rounded px-4 py-2"
                            required
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border rounded px-4 py-2"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Member">Member</option>
                        </select>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-yellow-100 w-fit  px-4 py-2 rounded hover:bg-gray-100 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                    </form>
                </div>

                {/* Users List */}
                <div className="w-full">
                    <h2 className="text-xl font-medium mb-4">All Users</h2>

                    {fetchingUsers ? (
                        <p>Loading users...</p>
                    ) : users.length === 0 ? (
                        <p className="text-gray-500">No users found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {users.map(user => (
                                <div key={user._id} className="bg-white border rounded-lg p-4 hover:bg-yellow-100 transition">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-semibold text-lg">
                                            {user.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            Role: {user.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </CommonLayout>
    );
}
