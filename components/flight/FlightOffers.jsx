"use client";

import { useEffect } from "react";
import { Filter } from "lucide-react";
import { FlightOffersProvider, useFlightOffers } from "./FlightOffersContext";
import FlightOffersHeader from "./FlightOffersHeader";
import FlightOffersSidebar from "./FlightOffersSidebar";
import FlightOffersGrid from "./FlightOffersGrid";
import FlightOffersPagination from "./FlightOffersPagination";

// Main component wrapped with the context provider
export default function FlightOffers() {
    return (
        <FlightOffersProvider>
            <FlightOffersContent />
        </FlightOffersProvider>
    );
}

// Inner component that uses the context
function FlightOffersContent() {
    const { sidebarOpen, toggleSidebar } = useFlightOffers();

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
            <FlightOffersSidebar />

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
                        <FlightOffersHeader />
                    </div>

                    {/* Grid of cards */}
                    <FlightOffersGrid />

                    {/* Pagination */}
                    <FlightOffersPagination />
                </div>
            </main>
        </div>
    );
}