import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaProjectDiagram, FaTasks, FaUser, FaUsers } from 'react-icons/fa';
import { MdLogout, MdOutlineMenu, MdOutlineSpaceDashboard } from 'react-icons/md';
import { AiFillProject } from "react-icons/ai";

export default function CommonLayout({ children }) {
    const { user, logout } = useAuth();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 pl-4 py-2 rounded-md transition-all duration-200
         ${isActive
            ? 'bg-yellow-100 text-yellow-600 border-l-4 border-yellow-500'
            : 'text-gray-600 hover:text-yellow-500 hover:bg-gray-100'}`;

    return (
        <div className="w-full h-screen flex text-sm relative">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r flex flex-col justify-between transform transition-transform duration-300 ease-in-out
                ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:w-[20%]`}
            >
                <div className="flex flex-col p-4">
                    <h1 className="text-2xl flex items-center gap-1 font-semibold mb-8">
                        <AiFillProject /> PMS
                    </h1>
                    <div className="flex flex-col gap-2">
                        <NavLink to="/dashboard" className={navLinkClass}>
                            <MdOutlineSpaceDashboard /> Dashboard
                        </NavLink>

                        {user?.role !== "Member" && (
                            <>
                                <NavLink to="/users" className={navLinkClass}>
                                    <FaUsers /> Users
                                </NavLink>

                                <NavLink to="/projects" className={navLinkClass}>
                                    <FaProjectDiagram /> Projects
                                </NavLink>
                            </>
                        )}

                        <NavLink to="/tasks" className={navLinkClass}>
                            <FaTasks /> Tasks
                        </NavLink>

                        <NavLink to="/profile" className={navLinkClass}>
                            <FaUser /> Profile
                        </NavLink>
                    </div>
                </div>

                <div className="w-full p-4 border-t">
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{user?.name}</p>
                            <p className="text-xs">({user?.role || 'User'})</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-red-100 rounded-md transition"
                    >
                        <MdLogout /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:w-[80%] h-screen">
                {/* Topbar */}
                <div className="w-full md:h-[10vh] flex items-center justify-between md:justify-end bg-white p-4 border-b">
                    <button className="md:hidden" onClick={() => setShowSidebar(prev => !prev)}>
                        <MdOutlineMenu size={24} />
                    </button>
                    <h1 className="text-gray-700 text-base font-medium">Welcome, {user?.name}</h1>
                </div>

                {/* Page Content */}
                <main className="p-4 h-[90vh] w-full overflow-y-auto animate-fadeIn scrollbar-hide">
                    {children}
                </main>
            </div>
        </div>
    );
}
