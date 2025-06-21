"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFlightOffers } from "../../apiRequest/flight/flightApi";

// Create the context
const FlightOffersContext = createContext();

// Provider component
export const FlightOffersProvider = ({ children }) => {
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
        price: {
            economy: false,      // Economy class
            business: false,     // Business class
            custom: false,
            customValue: "1000",
        },
        rating: {
            fiveStar: false,    // 5 stars
            fourStar: false,     // 4+ stars
            threeStar: false,    // 3+ stars
        },
        dateRange: "",
    });

    // Section open/close states
    const [openSections, setOpenSections] = useState({
        location: true,
        price: true,
        rating: true,
        dateRange: true,
    });

    // Filtered offers (client-side filtering)
    const [filteredOffers, setFilteredOffers] = useState([]);

    // Fetch data from API
    const fetchOffers = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchFlightOffers(page, itemsPerPage);
            setOffers(result.offers);
            setTotalOffers(result.total);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching flight offers:', err);
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
                            return true;
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply price filter
        const priceFilters = Object.entries(filters.price).filter(([key, value]) => value && key !== 'customValue');
        if (priceFilters.length > 0) {
            result = result.filter(offer => {
                const economicPrice = offer.economicPrice;
                const businessPrice = offer.businessPrice;
                return priceFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'economy':
                            return economicPrice <= 500;
                        case 'business':
                            return businessPrice <= 2000;
                        case 'custom':
                            return economicPrice <= parseInt(filters.price.customValue) ||
                                   businessPrice <= parseInt(filters.price.customValue);
                        default:
                            return false;
                    }
                });
            });
        }

        // Apply rating filter
        const ratingFilters = Object.entries(filters.rating).filter(([key, value]) => value);
        if (ratingFilters.length > 0) {
            result = result.filter(offer => {
                const rating = offer.rating;
                return ratingFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'fiveStar':
                            return rating === 5;
                        case 'fourStar':
                            return rating >= 4;
                        case 'threeStar':
                            return rating >= 3;
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
                if (a.isPopular && !b.isPopular) return -1;
                if (!a.isPopular && b.isPopular) return 1;
                return b.rating * b.reviews - a.rating * a.reviews;
            });
        } else if (sortOption === "price") {
            result = result.sort((a, b) => a.economicPrice - b.economicPrice);
        } else if (sortOption === "rating") {
            result = result.sort((a, b) => b.rating - a.rating);
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

    const handleCustomPriceChange = (value) => {
        setFilters({
            ...filters,
            price: {
                ...filters.price,
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
            price: {
                economy: false,
                business: false,
                custom: false,
                customValue: "1000",
            },
            rating: {
                fiveStar: false,
                fourStar: false,
                threeStar: false,
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
        handleCustomPriceChange,
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
        <FlightOffersContext.Provider value={value}>
            {children}
        </FlightOffersContext.Provider>
    );
};

// Custom hook to use the context
export const useFlightOffers = () => {
    const context = useContext(FlightOffersContext);
    if (context === undefined) {
        throw new Error('useFlightOffers must be used within a FlightOffersProvider');
    }
    return context;
};