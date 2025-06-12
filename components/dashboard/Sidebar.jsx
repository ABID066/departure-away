"use client"

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Settings, ChevronLeft, Menu, X, Home, MapPin, Users } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, toggleSidebar }) {
    const getItemHref = (parentItem, item) => {
        if (!item) { // Main menu item
            return parentItem.name === 'dashboard' ? '/dashboard' : `/dashboard/${parentItem.name.toLowerCase().replace(' ', '-')}`;
        }
        
        // Dropdown items
        const base = `/dashboard/${parentItem.toLowerCase().replace(' ', '-')}`;
        if (item.startsWith('All')) {
            return base;
        } else if (item === 'Create Service') {
            return `${base}/create`;
        } else if (item === 'Create Travel Service') {
            return `${base}/create`;
        } else if (item === 'Create Guide Service') {
            return `${base}/create`;
        }
        return base;
    };
    
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
            displayName: 'Exclusive Services',
            dropdownItems: ['All Services', 'Create Service']
        },
        {
            name: 'Travel Service',
            icon: 'travel',
            hasDropdown: true,
            displayName: 'Travel Services',
            dropdownItems: ['All Travel Services', 'Create Travel Service']
        },
        {
            name: 'Guide Service',
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
        const iconClass = "w-5 h-5 text-gray-600";
        switch (iconName) {
            case 'dashboard':
                return <Home className={iconClass} />;
            case 'services':
                return <Settings className={iconClass} />;
            case 'travel':
                return <MapPin className={iconClass} />;
            case 'guide':
                return <Users className={iconClass} />;
            default:
                return <div className="w-5 h-5 flex items-center justify-center text-gray-600">📄</div>;
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
                            <Link
                                key={item.name}
                                href={getItemHref(item)}
                                className={`flex justify-center py-3 px-2 rounded-lg cursor-pointer mb-1 hover:bg-gray-50 ${
                                    currentPage === item.name ? 'bg-orange-50' : ''
                                }`}
                                onClick={() => !item.hasDropdown && setCurrentPage(item.name)}
                            >
                                {renderIcon(item.icon)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Full sidebar for desktop or mobile drawer
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-50">
            {/* Header */}
            <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center">
                        <Image src={logo} alt="DepartureAway" className="max-w-[250px] h-auto" />
                    </Link>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                    {isMobile ? <X size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">MENU</div>
                    {menuItems.map((item) => (
                        <div key={item.name} className="mb-1">
                            <div
                                className={`flex items-center justify-between py-3 px-3 rounded-lg cursor-pointer transition-colors ${
                                    currentPage === item.name 
                                        ? 'bg-orange-50 text-orange-700' 
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => item.hasDropdown ? toggleExpand(item.name) : handleMenuItemClick(item)}
                            >
                                <div className="flex items-center">
                                    <div className={currentPage === item.name ? 'text-orange-700' : 'text-gray-600'}>
                                        {renderIcon(item.icon)}
                                    </div>
                                    <span className={`ml-3 text-sm font-medium ${
                                        currentPage === item.name ? 'text-orange-700' : 'text-gray-700'
                                    }`}>
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
                                        <div className={currentPage === item.name ? 'text-orange-700' : 'text-gray-400'}>
                                            {expandedItems[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Dropdown Items */}
                            {item.hasDropdown && expandedItems[item.name] && (
                                <div className="ml-8 mt-1 mb-2 space-y-1">
                                    {item.dropdownItems.map((dropdownItem) => (
                                        <Link
                                            key={dropdownItem}
                                            href={getItemHref(item.name, dropdownItem)}
                                            className={`block py-2 px-3 text-sm rounded-md cursor-pointer transition-colors ${
                                                currentPage === dropdownItem 
                                                    ? 'bg-orange-50 text-orange-700 font-medium' 
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                                            }`}
                                            onClick={() => handleDropdownItemClick(item.displayName, dropdownItem)}
                                        >
                                            {dropdownItem}
                                        </Link>
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