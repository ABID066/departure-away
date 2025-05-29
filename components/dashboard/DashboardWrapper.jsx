'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from './deshboardContent';
import ServicesContent from './service/ServicesContent';
import CreateServiceForm from './service/CreateServiceForm';
import TravelServicesContent from './travel-service/TravelServicesContent';
import CreateTravelServiceForm from './travel-service/CreateTravelServiceForm';
import GuideServicesContent from './guide-service/GuideServicesContent';
import CreateGuideServiceForm from './guide-service/CreateGuideServiceForm';

export default function DashboardWrapper({ children }) {
    const pathname = usePathname();
    const isChatPage = pathname === '/dashboard/chat';
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const currentPage = pathname === '/dashboard' ? 'dashboard'
        : pathname === '/dashboard/services' ? 'Services'
        : pathname === '/dashboard/services/create' ? 'Create Service'
        : pathname === '/dashboard/travel-service' ? 'Travel Services'
        : pathname === '/dashboard/travel-service/create' ? 'Create Travel Service'
        : pathname === '/dashboard/guide-service' ? 'Guide Services'
        : pathname === '/dashboard/guide-service/create' ? 'Create Guide Service'
        : pathname === '/dashboard/chat' ? 'chat'
        : 'dashboard';

    // If it's the chat page, render without dashboard layout
    if (isChatPage) {
        return children;
    }

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

    // If it's the chat page, render without dashboard layout
    if (isChatPage) {
        return children;
    }

    // Otherwise render with full dashboard layout
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

                    {/* Regular Services */}
                    {currentPage === 'Services' && <ServicesContent />}
                    {currentPage === 'Create Service' && <CreateServiceForm />}

                    {/* Travel Services */}
                    {currentPage === 'Travel Services' && <TravelServicesContent />}
                    {currentPage === 'Create Travel Service' && <CreateTravelServiceForm />}

                    {/* Guide Services */}
                    {currentPage === 'Guide Services' && <GuideServicesContent />}
                    {currentPage === 'Create Guide Service' && <CreateGuideServiceForm />}
                </div>
            </div>
        </div>
    );
}