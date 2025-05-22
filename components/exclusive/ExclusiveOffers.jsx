"use client";

import { useEffect } from "react";
import { Filter } from "lucide-react";
import { ExclusiveOffersProvider, useExclusiveOffers } from "./ExclusiveOffersContext";
import ExclusiveOffersHeader from "./ExclusiveOffersHeader";
import ExclusiveOffersSidebar from "./ExclusiveOffersSidebar";
import ExclusiveOffersGrid from "./ExclusiveOffersGrid";
import ExclusiveOffersPagination from "./ExclusiveOffersPagination";

// Main component wrapped with the context provider
export default function ExclusiveOffers() {
    return (
        <ExclusiveOffersProvider>
            <ExclusiveOffersContent />
        </ExclusiveOffersProvider>
    );
}

// Inner component that uses the context
function ExclusiveOffersContent() {
    const { sidebarOpen, toggleSidebar } = useExclusiveOffers();

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex min-h-screen bg-white pt-24 max-w-6xl mx-auto">
            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-10 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <ExclusiveOffersSidebar />

            {/* Main content */}
            <main className="flex-1">
                <div className="px-6 pb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex lg:hidden items-center">
                            <button
                                className="flex items-center justify-center"
                                onClick={toggleSidebar}
                            >
                                <Filter size={20} />
                            </button>
                        </div>
                        <ExclusiveOffersHeader />
                    </div>

                    {/* Grid of cards */}
                    <ExclusiveOffersGrid />

                    {/* Pagination */}
                    <ExclusiveOffersPagination />
                </div>
            </main>
        </div>
    );
}