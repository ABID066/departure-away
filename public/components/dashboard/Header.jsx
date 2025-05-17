"use client"

import { Bell, HelpCircle, Plus, MessageCircle, Menu } from 'lucide-react';

export default function Header() {
    return (
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
            <div className="flex items-center">

                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <Bell size={20} />
                </button>
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <HelpCircle size={20} />
                </button>
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <MessageCircle size={20} />
                </button>
                <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg">
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