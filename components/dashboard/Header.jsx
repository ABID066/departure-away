import { Bell, HelpCircle, Plus, MessageCircle, Menu, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Header({ toggleSidebar }) {
    const router = useRouter();
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                setUserName(parsedUserData.name || 'User');
            } catch (error) {
                console.error('Error parsing userData from localStorage:', error);
                setUserName('User');
            }
        }
    }, []);

    const handleMessageClick = () => {
        router.push('/dashboard/chat');
    };

    const handleProfileClick = () => {
        router.push('/profile');
    };

    const handleLogoutClick = () => {
        localStorage.clear();
        router.push('/signIn');
    };

    return (
        <div className="flex items-center justify-between p-4 md:p-6 bg-white border-b border-gray-200">
            <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                    onClick={toggleSidebar}
                    className="mr-2 md:hidden p-2 text-gray-500 rounded-full hover:bg-gray-100"
                >
                    <Menu size={20} />
                </button>
                <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <Bell size={20} />
                </button>
                <button
                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                    onClick={handleMessageClick}
                >
                    <MessageCircle size={20} />
                </button>
                <button className="hidden md:flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg">
                    <Plus size={16} className="mr-2" />
                    <span>View Shop</span>
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative group">
                    <img
                        className="w-8 h-8 rounded-full cursor-pointer object-cover"
                        src="https://png.pngtree.com/png-vector/20191119/ourmid/pngtree-beautiful-profile-glyph-vector-icon-png-image_2002807.jpg"
                        alt="User Avatar"
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="mt-4 text-center">
                            <img
                                className="w-12 h-12 rounded-full mx-auto object-cover"
                                src="https://png.pngtree.com/png-vector/20191119/ourmid/pngtree-beautiful-profile-glyph-vector-icon-png-image_2002807.jpg"
                                alt="User Avatar"
                            />
                            <h6 className="mt-2 font-medium text-gray-800">
                                {userName}
                            </h6>
                            <hr className="border-gray-200 mx-4 mt-3 p-0"/>
                        </div>
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <User className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="text-sm font-medium">Profile</span>
                        </button>
                        <button
                            onClick={handleLogoutClick}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}