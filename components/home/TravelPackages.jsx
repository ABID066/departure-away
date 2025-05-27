"use client";
import React, { useEffect, useState } from "react";
import TravelOfferCard from "../travel/TravelOfferCard";
import {useRouter} from "next/navigation";

export default function TravelPackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [activeFilter, setActiveFilter] = useState("forYou");
    const router = useRouter();

    // Filter options with their corresponding API endpoints
    const filterOptions = {
        forYou: {
            label: "For You",
            apiUrl: "https://royolex.vercel.app/api/v1/Tour/all-tour?limit=8&page=1"
        },
        hajj: {
            label: "Hajj",
            apiUrl: "https://royolex.vercel.app/api/v1/Tour/all-tour?limit=8&page=1&searchTerm=hajj"
        },
        alpine: {
            label: "Alpine Wonders",
            apiUrl: "https://royolex.vercel.app/api/v1/Tour/all-tour?limit=8&page=1&searchTerm=alpine"
        }
    };

    // Fetch travel packages based on selected filter
    const fetchPackages = async (filterKey) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(filterOptions[filterKey].apiUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch travel packages');
            }

            const result = await response.json();

            if (result && Array.isArray(result.data)) {
                // Transform API data to match TravelOfferCard component format
                const formattedPackages = result.data.map(tour => ({
                    id: tour._id,
                    title: tour.title,
                    location: tour.location || "Unknown",
                    rating: tour.rating || parseFloat((Math.random() * (5 - 4.5) + 4.5).toFixed(1)),
                    reviews: tour.totalReviews || Math.floor(Math.random() * 150) + 50,
                    duration: `${tour.duration} Days`,
                    price: `$${tour.price1}`,
                    popular: tour.isPopular || Math.random() > 0.7, // 30% chance of being popular
                    imageUrl: (tour.imageUrl && tour.imageUrl[0]) || "/api/placeholder/400/320",
                    category: tour.category || "tour",
                    price1: parseInt(tour.price1) || 0,
                    price2: parseInt(tour.price2) || 0,
                    duration_days: parseInt(tour.duration) || 1,
                    description: tour.description || "",
                    creatorType: tour.creatorType,
                    createdAt: tour.createdAt
                }));

                setPackages(formattedPackages);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching travel packages:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter button click
    const handleFilterChange = (filterKey) => {
        setActiveFilter(filterKey);
        setShowAll(false); // Reset show all when changing filters
        fetchPackages(filterKey);
    };

    // Initial load
    useEffect(() => {
        fetchPackages(activeFilter);
    }, []);

    // Determine which packages to display based on the `showAll` state
    const displayedPackages = showAll ? packages : packages.slice(0, 8);

    return (
        <div className="max-w-6xl mx-auto mb-20 px-4 lg:px-8">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-center mb-8">Travel Package</h2>

            {/* Filter Buttons Section */}
            <div className="flex justify-center mb-8 space-x-2 flex-wrap">
                {Object.entries(filterOptions).map(([key, option]) => (
                    <button
                        key={key}
                        className={`rounded-full px-4 py-2 text-md transition-all duration-300 ${
                            activeFilter === key
                                ? "bg-pink-700 text-white"
                                : "border border-pink-400 text-pink-600 hover:bg-pink-50"
                        }`}
                        onClick={() => handleFilterChange(key)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                            <div className="w-full h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-10">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <button
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                        onClick={() => fetchPackages(activeFilter)}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Travel Packages Grid Section */}
            {!loading && !error && packages.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedPackages.map((item) => (
                            <TravelOfferCard key={item.id} offer={item} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            className="bg-pink-700 mb-4 px-4 py-2 text-white rounded-lg hover:bg-pink-900 cursor-pointer transition-colors duration-300"
                            onClick={() => router.push('/travel-packages')}
                        >
                            View All Guider
                        </button>
                    </div>

                </>
            )}

            {/* No Data State */}
            {!loading && !error && packages.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        No travel packages available for "{filterOptions[activeFilter].label}" at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}