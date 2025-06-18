"use client";

import { createContext, useContext, useState, useEffect } from "react";

    // Import fetchTravelOffers from travelApi
import { fetchTravelOffers } from "../../apiRequest/travel/travelApi";

// Create the context
const TravelOffersContext = createContext();

// Provider component
export const TravelOffersProvider = ({ children }) => {
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
    const itemsPerPage = 9;

    // Filter states
    const [filters, setFilters] = useState({
        location: {
            domestic: false,
            international: false,
            other: false
        },
        budget: {
            value: false,      // Under $100
            midRange: false,   // $100-$500
            highEnd: false,    // $500+
            custom: false,
            customValue: "500",
        },
        duration: {
            shortTrip: false, // 1-3 days
            weekTrip: false,  // 4-7 days
            longTrip: false,  // 8+ days
        },
        category: {
            family: false,
            adventure: false,
            cultural: false,
            romantic: false,
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
            const result = await fetchTravelOffers(page, itemsPerPage);
            setOffers(result.offers);
            setTotalOffers(result.total);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching travel offers:', err);
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
                        case 'domestic':
                            return location.includes('usa') || location.includes('america') || location.includes('us');
                        case 'international':
                            return !location.includes('usa') && !location.includes('america') && !location.includes('us');
                        case 'other':
                            return true; // For now, include all
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
                const price = offer.price1;
                return budgetFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'value':
                            return price <= 100;
                        case 'midRange':
                            return price > 100 && price <= 500;
                        case 'highEnd':
                            return price > 500;
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
                        case 'family':
                            return offer.category === 'family';
                        case 'adventure':
                            return offer.category === 'adventure' || offer.title.toLowerCase().includes('adventure');
                        case 'cultural':
                            return offer.category === 'cultural' || offer.title.toLowerCase().includes('cultural');
                        case 'romantic':
                            return offer.category === 'romantic' || offer.title.toLowerCase().includes('romantic');
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply sorting
        if (sortOption === "recommended") {
            result = result.sort((a, b) => {
                // Sort by popularity first, then by rating * reviews
                if (a.popular && !b.popular) return -1;
                if (!a.popular && b.popular) return 1;
                return b.rating * b.reviews - a.rating * a.reviews;
            });
        } else if (sortOption === "price") {
            result = result.sort((a, b) => a.price1 - b.price1);
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
                domestic: false,
                international: false,
                other: false
            },
            budget: {
                value: false,
                midRange: false,
                highEnd: false,
                custom: false,
                customValue: "500",
            },
            duration: {
                shortTrip: false,
                weekTrip: false,
                longTrip: false,
            },
            category: {
                family: false,
                adventure: false,
                cultural: false,
                romantic: false,
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
        <TravelOffersContext.Provider value={value}>
            {children}
        </TravelOffersContext.Provider>
    );
};

// Custom hook for using the context
export const useTravelOffers = () => {
    const context = useContext(TravelOffersContext);
    if (context === undefined) {
        throw new Error("useTravelOffers must be used within a TravelOffersProvider");
    }
    return context;
};