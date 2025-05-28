"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const GuiderOffersContext = createContext();

// Provider component
export const GuiderOffersProvider = ({ children }) => {
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
      dhaka: false,
      chittagong: false,
      sylhet: false,
      other: false
    },
    experience: {
      beginner: false,    // 1-2 years
      intermediate: false, // 3-5 years
      expert: false,      // 6+ years
    },
    specialty: {
      architecture: false,
      history: false,
      culture: false,
      food: false,
      nature: false,
    },
    hourlyRate: {
      budget: false,      // Under $15
      standard: false,    // $15-$30
      premium: false,     // $30+
      custom: false,
      customValue: "25",
    },
    languages: {
      english: false,
      bengali: false,
      arabic: false,
      chinese: false,
      other: false,
    },
    availability: {
      available: false,
      verified: false,
    },
  });

  // Section open/close states
  const [openSections, setOpenSections] = useState({
    location: true,
    experience: true,
    specialty: true,
    hourlyRate: true,
    languages: true,
    availability: true,
  });

  // Filtered offers (client-side filtering)
  const [filteredOffers, setFilteredOffers] = useState([]);

  // Fetch data from API
  const fetchOffers = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
          `https://royolex.vercel.app/api/v1/guider/all-guider?limit=${itemsPerPage}&page=${page}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch guiders');
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        // Transform API data to match component's expected format
        const formattedOffers = result.data.map(guider => ({
          id: guider._id,
          name: guider.name,
          bio: guider.bio || "",
          location: guider.location || "Unknown",
          experience: guider.experience || "1 year",
          specialty: guider.specialty || "general",
          hourlyRate: guider.hourlyRate || 0,
          dailyRate: guider.dailyRate || 0,
          rating: guider.rating || parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
          reviews: guider.totalReviews || Math.floor(Math.random() * 200),
          imageUrl: (guider.imageUrl && guider.imageUrl[0]) || "/api/placeholder/400/320",
          languages: guider.languages || [],
          isVerified: guider.isVerified || false,
          available: guider.available || false,
          contactInfo: guider.contactInfo || "",
          creatorType: guider.creatorType,
          createdAt: guider.createdAt,
          // Additional computed fields
          experienceYears: parseInt(guider.experience) || 1,
          languageList: Array.isArray(guider.languages) ? guider.languages.join(", ") : "",
        }));

        setOffers(formattedOffers);

        // Use actual total from API response
        const actualTotal = result.meta?.total || formattedOffers.length;
        setTotalOffers(actualTotal);
        setTotalPages(Math.ceil(actualTotal / itemsPerPage));
      } else {
        throw new Error(result.message || 'Failed to fetch guiders');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching guiders:', err);
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
            case 'dhaka':
              return location.includes('dhaka');
            case 'chittagong':
              return location.includes('chittagong') || location.includes('chattogram');
            case 'sylhet':
              return location.includes('sylhet');
            case 'other':
              return !location.includes('dhaka') && !location.includes('chittagong') && !location.includes('chattogram') && !location.includes('sylhet');
            default:
              return false;
          }
        });
      });
    }

    // Apply experience filter
    const experienceFilters = Object.entries(filters.experience).filter(([key, value]) => value);
    if (experienceFilters.length > 0) {
      result = result.filter(offer => {
        const years = offer.experienceYears;
        return experienceFilters.some(([filterKey]) => {
          switch (filterKey) {
            case 'beginner':
              return years >= 1 && years <= 2;
            case 'intermediate':
              return years >= 3 && years <= 5;
            case 'expert':
              return years >= 6;
            default:
              return false;
          }
        });
      });
    }

    // Apply specialty filter
    const specialtyFilters = Object.entries(filters.specialty).filter(([key, value]) => value);
    if (specialtyFilters.length > 0) {
      result = result.filter(offer => {
        return specialtyFilters.some(([filterKey]) => {
          switch (filterKey) {
            case 'architecture':
              return offer.specialty === 'architecture' || offer.bio.toLowerCase().includes('architecture');
            case 'history':
              return offer.specialty === 'history' || offer.bio.toLowerCase().includes('history');
            case 'culture':
              return offer.specialty === 'culture' || offer.bio.toLowerCase().includes('culture');
            case 'food':
              return offer.specialty === 'food' || offer.bio.toLowerCase().includes('food');
            case 'nature':
              return offer.specialty === 'nature' || offer.bio.toLowerCase().includes('nature');
            default:
              return false;
          }
        });
      });
    }

    // Apply hourly rate filter
    const rateFilters = Object.entries(filters.hourlyRate).filter(([key, value]) => value && key !== 'customValue');
    if (rateFilters.length > 0) {
      result = result.filter(offer => {
        const rate = offer.hourlyRate;
        return rateFilters.some(([filterKey]) => {
          switch (filterKey) {
            case 'budget':
              return rate < 15;
            case 'standard':
              return rate >= 15 && rate <= 30;
            case 'premium':
              return rate > 30;
            case 'custom':
              return rate <= parseInt(filters.hourlyRate.customValue);
            default:
              return false;
          }
        });
      });
    }

    // Apply languages filter
    const languageFilters = Object.entries(filters.languages).filter(([key, value]) => value);
    if (languageFilters.length > 0) {
      result = result.filter(offer => {
        const languages = offer.languages.map(lang => lang.toLowerCase());
        return languageFilters.some(([filterKey]) => {
          switch (filterKey) {
            case 'english':
              return languages.includes('english');
            case 'bengali':
              return languages.includes('bengali');
            case 'arabic':
              return languages.includes('arabic');
            case 'chinese':
              return languages.includes('chinese');
            case 'other':
              return languages.some(lang =>
                  !['english', 'bengali', 'arabic', 'chinese'].includes(lang)
              );
            default:
              return false;
          }
        });
      });
    }

    // Apply availability filter
    const availabilityFilters = Object.entries(filters.availability).filter(([key, value]) => value);
    if (availabilityFilters.length > 0) {
      result = result.filter(offer => {
        return availabilityFilters.some(([filterKey]) => {
          switch (filterKey) {
            case 'available':
              return offer.available === true;
            case 'verified':
              return offer.isVerified === true;
            default:
              return false;
          }
        });
      });
    }

    // Apply sorting
    if (sortOption === "recommended") {
      result = result.sort((a, b) => {
        // Sort by verification first, then rating * reviews
        if (a.isVerified && !b.isVerified) return -1;
        if (!a.isVerified && b.isVerified) return 1;
        return b.rating * b.reviews - a.rating * a.reviews;
      });
    } else if (sortOption === "price") {
      result = result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortOption === "rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "experience") {
      result = result.sort((a, b) => b.experienceYears - a.experienceYears);
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

  const handleCustomRateChange = (value) => {
    setFilters({
      ...filters,
      hourlyRate: {
        ...filters.hourlyRate,
        customValue: value,
      },
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
        dhaka: false,
        chittagong: false,
        sylhet: false,
        other: false
      },
      experience: {
        beginner: false,
        intermediate: false,
        expert: false,
      },
      specialty: {
        architecture: false,
        history: false,
        culture: false,
        food: false,
        nature: false,
      },
      hourlyRate: {
        budget: false,
        standard: false,
        premium: false,
        custom: false,
        customValue: "25",
      },
      languages: {
        english: false,
        bengali: false,
        arabic: false,
        chinese: false,
        other: false,
      },
      availability: {
        available: false,
        verified: false,
      },
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
    handleCustomRateChange,
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
      <GuiderOffersContext.Provider value={value}>
        {children}
      </GuiderOffersContext.Provider>
  );
};

// Custom hook for using the context
export const useGuiderOffers = () => {
  const context = useContext(GuiderOffersContext);
  if (context === undefined) {
    throw new Error("useGuiderOffers must be used within a GuiderOffersProvider");
  }
  return context;
};