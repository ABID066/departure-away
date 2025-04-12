"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const GuidersContext = createContext();

// Provider component
export const GuidersProvider = ({ children }) => {
  // Main state variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("recommended");
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    destination: { bangladeshOnly: false, singaPoreOnly: false },
    budget: {
      value: false,
      midRange: false,
      highEnd: false,
      custom: true,
      customValue: "20",
    },
    level: {
      topRated: true,
      level1: false,
      level2: false,
      new: false,
    },
    duration: "10 Days",
    dateRange: "",
  });

  // Section open/close states
  const [openSections, setOpenSections] = useState({
    destination: true,
    budget: true,
    level: true,
    duration: true,
    dateRange: true,
  });

  // Sample data
  const allGuides = [
    {
      id: 1,
      name: "Derick T. Mendez",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 1,
      destination: "Bangladesh",
    },
    {
      id: 2,
      name: "Glenn V. Powell",
      rating: 4.7,
      reviews: 300,
      topRated: true,
      level: 2,
      destination: "Thailand",
    },
    {
      id: 3,
      name: "James S. Woods",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 1,
      destination: "India",
    },
    {
      id: 4,
      name: "Javier B. Murphy",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 1,
      destination: "Bangladesh",
    },
    {
      id: 5,
      name: "Walter D. Dixon",
      rating: 4.7,
      reviews: 300,
      topRated: false,
      level: 2,
      destination: "Vietnam",
    },
    {
      id: 6,
      name: "Harold I. Hendon",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 3,
      destination: "Bangladesh",
    },
    {
      id: 7,
      name: "Javier B. Murphy",
      rating: 4.7,
      reviews: 200,
      topRated: false,
      level: 1,
      destination: "Nepal",
    },
    {
      id: 8,
      name: "Walter D. Dixon",
      rating: 4.7,
      reviews: 300,
      topRated: true,
      level: 1,
      destination: "Bangladesh",
    },
    {
      id: 9,
      name: "Harold I. Hendon",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 2,
      destination: "Thailand",
    },
    {
      id: 10,
      name: "Javier B. Murphy",
      rating: 4.7,
      reviews: 200,
      topRated: false,
      level: 3,
      destination: "Bangladesh",
    },
    {
      id: 11,
      name: "Walter D. Dixon",
      rating: 4.7,
      reviews: 300,
      topRated: true,
      level: 1,
      destination: "Nepal",
    },
    {
      id: 12,
      name: "Harold I. Hendon",
      rating: 4.7,
      reviews: 200,
      topRated: true,
      level: 2,
      destination: "Bangladesh",
    },
    {
      id: 13,
      name: "Sarah Johnson",
      rating: 4.8,
      reviews: 250,
      topRated: true,
      level: 1,
      destination: "Thailand",
    },
    {
      id: 14,
      name: "Michael Chen",
      rating: 4.6,
      reviews: 180,
      topRated: false,
      level: 1,
      destination: "Bangladesh",
    },
    {
      id: 15,
      name: "Lisa Rodriguez",
      rating: 4.9,
      reviews: 320,
      topRated: true,
      level: 2,
      destination: "India",
    },
    {
      id: 16,
      name: "David Kim",
      rating: 4.5,
      reviews: 150,
      topRated: false,
      level: 1,
      destination: "Nepal",
    },
    {
      id: 17,
      name: "Emily Wilson",
      rating: 4.8,
      reviews: 270,
      topRated: true,
      level: 3,
      destination: "Bangladesh",
    },
    {
      id: 18,
      name: "Omar Hassan",
      rating: 4.7,
      reviews: 220,
      topRated: true,
      level: 2,
      destination: "Vietnam",
    },
  ];

  // Filtered guides
  const [filteredGuides, setFilteredGuides] = useState(allGuides);
  const guidesPerPage = 9;

  // Apply filters
  useEffect(() => {
    let result = [...allGuides];

    // Apply destination filter
    if (filters.destination.bangladeshOnly) {
      result = result.filter((guide) => guide.destination === "Bangladesh");
    }

    // Apply level filter
    if (
      filters.level.topRated ||
      filters.level.level1 ||
      filters.level.level2 ||
      filters.level.new
    ) {
      result = result.filter(
        (guide) =>
          (filters.level.topRated && guide.topRated) ||
          (filters.level.level1 && guide.level === 1) ||
          (filters.level.level2 && guide.level === 2) ||
          (filters.level.new && guide.level === 0)
      );
    }

    // Apply sorting
    if (sortOption === "recommended") {
      // Recommended sorting (default)
      result = result.sort(
        (a, b) => b.rating * b.reviews - a.rating * a.reviews
      );
    } else if (sortOption === "rating") {
      // Sort by rating
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "reviews") {
      // Sort by number of reviews
      result = result.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredGuides(result);
  }, [filters, sortOption]);

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

  const handleDurationChange = (duration) => {
    setFilters({
      ...filters,
      duration: duration,
    });
  };

  const handleDateChange = (date) => {
    setFilters({
      ...filters,
      dateRange: date,
    });
  };

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  const currentGuides = filteredGuides.slice(
    (currentPage - 1) * guidesPerPage,
    currentPage * guidesPerPage
  );

  // Reset filters
  const resetFilters = () => {
    setFilters({
      destination: { bangladeshOnly: false, singaPoreOnly: false },
      budget: {
        value: false,
        midRange: false,
        highEnd: false,
        custom: true,
        customValue: "20",
      },
      level: {
        topRated: true,
        level1: false,
        level2: false,
        new: false,
      },
      duration: "10 Days",
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
    handleDurationChange,
    handleDateChange,
    handlePageChange,
    filteredGuides,
    currentGuides,
    totalPages,
    guidesPerPage,
    resetFilters,
  };

  return (
    <GuidersContext.Provider value={value}>
      {children}
    </GuidersContext.Provider>
  );
};

// Custom hook for using the context
export const useGuiders = () => {
  const context = useContext(GuidersContext);
  if (context === undefined) {
    throw new Error("useGuiders must be used within a GuidersProvider");
  }
  return context;
};