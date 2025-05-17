"use client"

import { useState } from 'react';

import DashboardContent from "@/public/components/dashboard/deshboardContent";
import ServicesContent from "@/public/components/dashboard/ServicesContent";
import CreateServiceForm from "@/public/components/dashboard/CreateServiceForm";

import Sidebar from "@/public/components/dashboard/Sidebar";
import Header from "@/public/components/dashboard/Header";


export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 overflow-auto">
                <Header />
                {currentPage === 'dashboard' && <DashboardContent />}
                {currentPage === 'Services' && <ServicesContent />}
                {currentPage === 'Create Service' && <CreateServiceForm />}

            </div>
        </div>
    );
}
