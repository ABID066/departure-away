"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ExclusiveOffersContext = createContext();

// Provider component
export const ExclusiveOffersProvider = ({ children }) => {
    // Main state variables
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("recommended");
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // API data
    const [offers, setOffers] = useState([]);
    const [totalOffers, setTotalOffers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 6;

    // Filter states
    const [filters, setFilters] = useState({
        location: {
            japan: false,
            kenya: false,
            other: false
        },
        budget: {
            value: false,
            midRange: false,
            highEnd: false,
            custom: false,
            customValue: "1000",
        },
        duration: {
            shortTrip: false, // 1-3 days
            weekTrip: false,  // 4-7 days
            longTrip: false,  // 8+ days
        },
        category: {
            tour: false,
            adventure: false,
            cultural: false,
        },
        dateRange: "",
    });

    // Section open/close states
    const [openSections, setOpenSections] = useState({
        location: true,
        budget: true,
        duration: true,
        category: true,
        dateRange: true,
    });

    // Filtered offers (client-side filtering)
    const [filteredOffers, setFilteredOffers] = useState([]);

    // Fetch data from API
    const fetchOffers = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://royolex.vercel.app/api/v1/service/-all-service?page=${page}&limit=${itemsPerPage}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch offers');
            }

            const result = await response.json();

            if (result.success) {
                // Transform API data to match your component's expected format
                const formattedOffers = result.data.map(service => ({
                    id: service._id || service.id,
                    title: service.title,
                    location: service.location || "Unknown",
                    rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)), // Generate random rating if not available
                    reviews: Math.floor(Math.random() * 100), // Generate random reviews if not available
                    duration: service.duration_days ? `${service.duration_days} Days` : "Flexible",
                    price: `$${service.price_basic}`,
                    popular: Math.random() > 0.5, // Randomly set popular flag if not available
                    imageUrl: service.media_urls || "/images/home/exclusive.jpg", // Use the media_urls or fallback to default
                    category: service.category || "tour",
                    price_basic: service.price_basic,
                    price_standard: service.price_standard,
                    price_premium: service.price_premium,
                    duration_days: service.duration_days,
                    description: service.description
                }));

                setOffers(formattedOffers);
                setTotalOffers(result.meta.total);
                setTotalPages(Math.ceil(result.meta.total / itemsPerPage));
            } else {
                throw new Error(result.message || 'Failed to fetch offers');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching offers:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchOffers(currentPage);
    }, [currentPage]);

    // Apply client-side filters
    useEffect(() => {
        let result = [...offers];

        // Apply location filter
        const locationFilters = Object.entries(filters.location).filter(([key, value]) => value);
        if (locationFilters.length > 0) {
            result = result.filter(offer => {
                const location = offer.location.toLowerCase();
                return locationFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'japan':
                            return location.includes('japan');
                        case 'kenya':
                            return location.includes('kenya');
                        case 'other':
                            return !location.includes('japan') && !location.includes('kenya');
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply budget filter
        const budgetFilters = Object.entries(filters.budget).filter(([key, value]) => value && key !== 'customValue');
        if (budgetFilters.length > 0) {
            result = result.filter(offer => {
                const price = offer.price_basic;
                return budgetFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'value':
                            return price <= 1500;
                        case 'midRange':
                            return price > 1500 && price <= 3000;
                        case 'highEnd':
                            return price > 3000;
                        case 'custom':
                            return price <= parseInt(filters.budget.customValue);
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply duration filter
        const durationFilters = Object.entries(filters.duration).filter(([key, value]) => value);
        if (durationFilters.length > 0) {
            result = result.filter(offer => {
                const days = offer.duration_days;
                return durationFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'shortTrip':
                            return days >= 1 && days <= 3;
                        case 'weekTrip':
                            return days >= 4 && days <= 7;
                        case 'longTrip':
                            return days >= 8;
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply category filter
        const categoryFilters = Object.entries(filters.category).filter(([key, value]) => value);
        if (categoryFilters.length > 0) {
            result = result.filter(offer => {
                return categoryFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'tour':
                            return offer.category === 'tour';
                        case 'adventure':
                            return offer.title.toLowerCase().includes('adventure') || offer.description.toLowerCase().includes('adventure');
                        case 'cultural':
                            return offer.title.toLowerCase().includes('cultural') || offer.description.toLowerCase().includes('cultural');
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply sorting
        if (sortOption === "recommended") {
            result = result.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        } else if (sortOption === "price") {
            result = result.sort((a, b) => a.price_basic - b.price_basic);
        } else if (sortOption === "rating") {
            result = result.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === "duration") {
            result = result.sort((a, b) => a.duration_days - b.duration_days);
        }

        setFilteredOffers(result);
    }, [offers, filters, sortOption]);

    // Event handlers
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleSection = (section) => {
        setOpenSections({
            ...openSections,
            [section]: !openSections[section],
        });
    };

    const handleCheckboxChange = (section, field) => {
        setFilters({
            ...filters,
            [section]: {
                ...filters[section],
                [field]: !filters[section][field],
            },
        });
    };

    const handleCustomBudgetChange = (value) => {
        setFilters({
            ...filters,
            budget: {
                ...filters.budget,
                customValue: value,
            },
        });
    };

    const handleDateChange = (date) => {
        setFilters({
            ...filters,
            dateRange: date,
        });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top when changing pages
            window.scrollTo(0, 0);
        }
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            location: {
                japan: false,
                kenya: false,
                other: false
            },
            budget: {
                value: false,
                midRange: false,
                highEnd: false,
                custom: false,
                customValue: "1000",
            },
            duration: {
                shortTrip: false,
                weekTrip: false,
                longTrip: false,
            },
            category: {
                tour: false,
                adventure: false,
                cultural: false,
            },
            dateRange: "",
        });
    };

    const value = {
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        currentPage,
        setCurrentPage,
        sortOption,
        setSortOption,
        showSortOptions,
        setShowSortOptions,
        filters,
        setFilters,
        openSections,
        setOpenSections,
        toggleSection,
        handleCheckboxChange,
        handleCustomBudgetChange,
        handleDateChange,
        handlePageChange,
        offers,
        filteredOffers,
        totalOffers,
        totalPages,
        itemsPerPage,
        loading,
        error,
        resetFilters,
        fetchOffers,
    };

    return (
        <ExclusiveOffersContext.Provider value={value}>
            {children}
        </ExclusiveOffersContext.Provider>
    );
};

// Custom hook for using the context
export const useExclusiveOffers = () => {
    const context = useContext(ExclusiveOffersContext);
    if (context === undefined) {
        throw new Error("useExclusiveOffers must be used within an ExclusiveOffersProvider");
    }
    return context;
};