"use client"

import { useState } from 'react';
import { ChevronDown, ChevronRight, Settings, ChevronLeft, Menu } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, toggleSidebar }) {
    const [expandedItems, setExpandedItems] = useState({
        'Services': false
    });

    // Modified menuItems to keep only Services
    const menuItems = [
        {
            name: 'Services',
            icon: 'services',
            hasDropdown: true,
            dropdownItems: ['All Services', 'Create Service']
        },
    ];

    const toggleExpand = (item) => {
        setExpandedItems({
            ...expandedItems,
            [item]: !expandedItems[item]
        });
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'services':
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500"><Settings size={18} /></div>;
            default:
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500">📄</div>;
        }
    };

    const handleMenuItemClick = (item) => {
        if (item.hasDropdown) {
            toggleExpand(item.name);
        } else {
            setCurrentPage(item);
        }
    };

    const handleDropdownItemClick = (parentItem, item) => {
        if (item === 'All Services') {
            setCurrentPage('Services');
        } else {
            setCurrentPage(item);
        }
    };

    // If sidebar is collapsed, return a minimal sidebar with just icons
    if (isCollapsed) {
        return (
            <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 flex justify-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                        <Menu size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="px-2 py-2">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="flex justify-center py-3 px-2 rounded-lg cursor-pointer mb-1 hover:bg-gray-50"
                                onClick={() => setCurrentPage(item.hasDropdown ? 'Services' : item.name)}
                            >
                                {renderIcon(item.icon)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Regular expanded sidebar
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center">
                        <Image src={logo} alt="DepartureAway" />
                    </Link>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-400 mb-2">MENU</div>
                    {menuItems.map((item) => (
                        <div key={item.name}>
                            <div
                                className={`flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer mb-1 ${
                                    currentPage === item.name ? 'bg-orange-50' : 'hover:bg-gray-50'
                                }`}
                                onClick={() => item.hasDropdown ? toggleExpand(item.name) : setCurrentPage(item.name)}
                            >
                                <div className="flex items-center">
                                    {renderIcon(item.icon)}
                                    <span className={`ml-3 text-sm ${currentPage === item.name ? 'font-medium' : ''}`}>
                                        {item.name}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    {item.notifications && (
                                        <div className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center mr-2">
                                            {item.notifications}
                                        </div>
                                    )}
                                    {item.hasDropdown && (
                                        expandedItems[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                    )}
                                </div>
                            </div>
                            {item.hasDropdown && expandedItems[item.name] && (
                                <div className="ml-7 mb-2">
                                    {item.dropdownItems.map((dropdownItem) => (
                                        <div
                                            key={dropdownItem}
                                            className={`py-2 px-3 text-sm rounded-md cursor-pointer mb-1 ${
                                                currentPage === dropdownItem ? 'bg-orange-50 font-medium' : 'hover:bg-gray-50'
                                            }`}
                                            onClick={() => handleDropdownItemClick(item.name, dropdownItem)}
                                        >
                                            {dropdownItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}