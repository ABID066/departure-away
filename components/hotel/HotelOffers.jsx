"use client";

import { Filter } from "lucide-react";
import { useEffect } from "react";
import HotelActiveFilters from "./HotelActiveFilters";
import { HotelOffersProvider, useHotelOffers } from "./HotelOffersContext";
import HotelOffersGrid from "./HotelOffersGrid";
import HotelOffersHeader from "./HotelOffersHeader";
import HotelOffersPagination from "./HotelOffersPagination";
import HotelOffersSidebar from "./HotelOffersSidebar";

// Main component wrapped with the context provider
export default function HotelOffers() {
    return (
        <HotelOffersProvider>
            <HotelOffersContent />
        </HotelOffersProvider>
    );
}

// Inner component that uses the context
function HotelOffersContent() {
    const { sidebarOpen, toggleSidebar } = useHotelOffers();

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
            <HotelOffersSidebar />

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
                        <HotelOffersHeader />
                    </div>

                    {/* Active Filters */}
                    <HotelActiveFilters />

                    {/* Grid of cards */}
                    <HotelOffersGrid />

                    {/* Pagination */}
                    <HotelOffersPagination />
                </div>
            </main>
        </div>
    );
}