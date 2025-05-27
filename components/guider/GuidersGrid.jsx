"use client";

import { useGuiderOffers } from "./GuidersContext";
import GuiderOfferCard from "./GuiderCard";

export default function GuiderOffersGrid() {
    const { offers, filteredOffers, resetFilters, loading, error } = useGuiderOffers();

    // Show loading state
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="w-full h-48 bg-gray-200"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button
                    className="px-4 py-2 bg-pink-500 text-white rounded-md"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    // Determine which offers to display
    const displayOffers = filteredOffers.length > 0 ? filteredOffers : offers;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayOffers.map((offer) => (
                    <GuiderOfferCard key={offer.id} guide={offer} />
                ))}
            </div>

            {/* Show message when no results after filtering */}
            {filteredOffers.length === 0 && offers.length > 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        No guiders found matching your filters.
                    </p>
                    <button
                        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            )}

            {/* Show message when no data from API */}
            {offers.length === 0 && !loading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        No guiders available at the moment.
                    </p>
                </div>
            )}
        </>
    );
}