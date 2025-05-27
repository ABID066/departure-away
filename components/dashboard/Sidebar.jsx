"use client"

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Settings, ChevronLeft, Menu, X, Home, MapPin, Users } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, toggleSidebar }) {
    const [expandedItems, setExpandedItems] = useState({
        'Services': false,
        'Travel Services': false,
        'Guide Services': false
    });

    // Updated menuItems to include Guide Services
    const menuItems = [
        {
            name: 'dashboard',
            icon: 'dashboard',
            hasDropdown: false,
            displayName: 'Dashboard'
        },
        {
            name: 'Services',
            icon: 'services',
            hasDropdown: true,
            displayName: 'Services',
            dropdownItems: ['All Services', 'Create Service']
        },
        {
            name: 'Travel Services',
            icon: 'travel',
            hasDropdown: true,
            displayName: 'Travel Services',
            dropdownItems: ['All Travel Services', 'Create Travel Service']
        },
        {
            name: 'Guide Services',
            icon: 'guide',
            hasDropdown: true,
            displayName: 'Guide Services',
            dropdownItems: ['All Guide Services', 'Create Guide Service']
        },
    ];

    // Check for mobile to determine sidebar behavior
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const toggleExpand = (item) => {
        setExpandedItems({
            ...expandedItems,
            [item]: !expandedItems[item]
        });
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'dashboard':
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500"><Home size={18} /></div>;
            case 'services':
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500"><Settings size={18} /></div>;
            case 'travel':
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500"><MapPin size={18} /></div>;
            case 'guide':
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500"><Users size={18} /></div>;
            default:
                return <div className="w-5 h-5 flex items-center justify-center text-gray-500">📄</div>;
        }
    };

    const handleMenuItemClick = (item) => {
        if (item.hasDropdown) {
            toggleExpand(item.name);
        } else {
            setCurrentPage(item.name);
        }
    };

    const handleDropdownItemClick = (parentItem, item) => {
        if (parentItem === 'Services') {
            if (item === 'All Services') {
                setCurrentPage('Services');
            } else {
                setCurrentPage(item);
            }
        } else if (parentItem === 'Travel Services') {
            if (item === 'All Travel Services') {
                setCurrentPage('Travel Services');
            } else {
                setCurrentPage(item);
            }
        } else if (parentItem === 'Guide Services') {
            if (item === 'All Guide Services') {
                setCurrentPage('Guide Services');
            } else {
                setCurrentPage(item);
            }
        }
    };

    // If sidebar is collapsed and not on mobile, return a minimal sidebar with just icons
    if (isCollapsed && !isMobile) {
        return (
            <div className="w-16 bg-white border-r border-gray-200 flex flex-col h-full">
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
                                className={`flex justify-center py-3 px-2 rounded-lg cursor-pointer mb-1 hover:bg-gray-50 ${
                                    currentPage === item.name ? 'bg-orange-50' : ''
                                }`}
                                onClick={() => {
                                    if (item.hasDropdown) {
                                        if (item.name === 'Services') {
                                            setCurrentPage('Services');
                                        } else if (item.name === 'Travel Services') {
                                            setCurrentPage('Travel Services');
                                        } else if (item.name === 'Guide Services') {
                                            setCurrentPage('Guide Services');
                                        }
                                    } else {
                                        setCurrentPage(item.name);
                                    }
                                }}
                            >
                                {renderIcon(item.icon)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Full sidebar for desktop or mobile drawer
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-50">
            <div className="p-4 md:p-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center">
                        <Image src={logo} alt="DepartureAway" className="max-w-[250px]" />
                    </Link>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                    {isMobile ? <X size={20} /> : <ChevronLeft size={20} />}
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
                                onClick={() => item.hasDropdown ? toggleExpand(item.name) : handleMenuItemClick(item)}
                            >
                                <div className="flex items-center">
                                    {renderIcon(item.icon)}
                                    <span className={`ml-3 text-sm ${currentPage === item.name ? 'font-medium' : ''}`}>
                                        {item.displayName || item.name}
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