"use client"

import { Bell, HelpCircle, Plus, MessageCircle, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header({ toggleSidebar }) {
    const router = useRouter();

    const handleMessageClick = () => {
        router.push('/dashboard/chat');
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
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                    <img src="/api/placeholder/40/40" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}