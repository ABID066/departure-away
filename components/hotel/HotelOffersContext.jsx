"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchHotelOffers } from "../../apiRequest/hotel/hotelApi";

// Create the context
const HotelOffersContext = createContext();

// Provider component
export const HotelOffersProvider = ({ children }) => {
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
            budget: false,      // Under $100
            midRange: false,   // $100-$300
            luxury: false,    // $300+
            custom: false,
            customValue: "300",
        },
        rating: {
            fiveStar: false,
            fourStar: false,
            threeStar: false,
        },
        amenities: {
            wifi: false,
            pool: false,
            spa: false,
            restaurant: false,
        },
        dateRange: "",
    });

    // Section open/close states
    const [openSections, setOpenSections] = useState({
        location: true,
        price: true,
        rating: true,
        amenities: true,
        dateRange: true,
    });

    // Filtered offers (client-side filtering)
    const [filteredOffers, setFilteredOffers] = useState([]);

    // Fetch data from API
    const fetchOffers = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchHotelOffers(page, itemsPerPage);
            setOffers(result.formattedOffers);
            setTotalOffers(result.total);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching hotel offers:', err);
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
                const price = parseInt(offer.price);
                return priceFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'budget':
                            return price <= 100;
                        case 'midRange':
                            return price > 100 && price <= 300;
                        case 'luxury':
                            return price > 300;
                        case 'custom':
                            return price <= parseInt(filters.price.customValue);
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
                const rating = parseFloat(offer.rating);
                return ratingFilters.some(([filterKey]) => {
                    switch (filterKey) {
                        case 'fiveStar':
                            return rating >= 4.5;
                        case 'fourStar':
                            return rating >= 4.0 && rating < 4.5;
                        case 'threeStar':
                            return rating >= 3.0 && rating < 4.0;
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
            result = result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        } else if (sortOption === "rating") {
            result = result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        }

        setFilteredOffers(result);
    }, [offers, filters, sortOption]);

    // Event handlers
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCheckboxChange = (filterType, key) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: {
                ...prev[filterType],
                [key]: !prev[filterType][key]
            }
        }));
    };

    const handleDateChange = (date) => {
        setFilters(prev => ({
            ...prev,
            dateRange: date
        }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const resetFilters = () => {
        setFilters({
            location: {
                domestic: false,
                international: false,
                other: false
            },
            price: {
                budget: false,
                midRange: false,
                luxury: false,
                custom: false,
                customValue: "300",
            },
            rating: {
                fiveStar: false,
                fourStar: false,
                threeStar: false,
            },
            amenities: {
                wifi: false,
                pool: false,
                spa: false,
                restaurant: false,
            },
            dateRange: "",
        });
    };

    return (
        <HotelOffersContext.Provider
            value={{
                sidebarOpen,
                toggleSidebar,
                currentPage,
                totalPages,
                handlePageChange,
                sortOption,
                setSortOption,
                showSortOptions,
                setShowSortOptions,
                loading,
                error,
                offers,
                totalOffers,
                filters,
                openSections,
                toggleSection,
                handleCheckboxChange,
                handleDateChange,
                resetFilters,
                filteredOffers,
            }}
        >
            {children}
        </HotelOffersContext.Provider>
    );
};

// Custom hook to use the context
export const useHotelOffers = () => {
    const context = useContext(HotelOffersContext);
    if (!context) {
        throw new Error('useHotelOffers must be used within a HotelOffersProvider');
    }
    return context;
};