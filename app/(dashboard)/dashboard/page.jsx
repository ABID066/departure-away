"use client"

import { useState, useEffect } from 'react';

import DashboardContent from "@/components/dashboard/deshboardContent";
import ServicesContent from "@/components/dashboard/ServicesContent";
import CreateServiceForm from "@/components/dashboard/CreateServiceForm";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";


export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);

            // Auto-collapse sidebar on mobile
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true);
                setIsSidebarOpen(false);
            } else {
                setIsSidebarCollapsed(false);
                setIsSidebarOpen(true);
            }
        };

        // Call on initial load
        checkIfMobile();

        // Set up event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar - conditionally shown based on mobile state */}
            {(isSidebarOpen || !isMobile) && (
                <div className={`${isMobile ? 'fixed inset-0 z-40' : ''}`}>
                    {/* Overlay for mobile sidebar */}
                    {isMobile && (
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-40"
                            onClick={toggleSidebar}
                        ></div>
                    )}

                    <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : ''} h-full`}>
                        <Sidebar
                            currentPage={currentPage}
                            setCurrentPage={(page) => {
                                setCurrentPage(page);
                                if (isMobile) setIsSidebarOpen(false);
                            }}
                            isCollapsed={isSidebarCollapsed}
                            toggleSidebar={toggleSidebar}
                        />
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <div className="flex-1 overflow-auto">
                    {currentPage === 'dashboard' && <DashboardContent />}
                    {currentPage === 'Services' && <ServicesContent setCurrentPage={setCurrentPage} />}
                    {currentPage === 'Create Service' && <CreateServiceForm />}
                </div>
            </div>
        </div>
    );
}