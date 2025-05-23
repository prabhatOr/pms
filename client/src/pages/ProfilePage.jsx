import React from 'react';
import CommonLayout from '../layout/CommonLayout';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <CommonLayout>
            <h2 className="text-lg font-medium mb-6">My Profile</h2>
            <div className="bg-white max-w-md border rounded-lg p-4 hover:bg-yellow-100 transition">
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
        </CommonLayout>
    );
}
