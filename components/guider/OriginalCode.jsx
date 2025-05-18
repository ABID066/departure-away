"use client";

import { useState, useEffect } from "react";
import { Filter, ChevronDown, X, Calendar, XCircleIcon } from "lucide-react";
import PaginationButton from "./PaginationButton";
import FilterSection from "./FilterSection";
import FilterCheckbox from "./FilterCheckbox";
import GuiderCard from "./GuiderCard";

export default function Guiders() {
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  const currentGuides = filteredGuides.slice(
    (currentPage - 1) * guidesPerPage,
    currentPage * guidesPerPage
  );

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
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-white pt-24 0 max-w-6xl mx-auto">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:static lg:translate-x-0 z-20 w-64  h-full overflow-y-auto transition-transform duration-300 ease-in-out `}
      >
        <div className="">
          <div className="px-5 py-1 bg-[#F7F6FE] mb-4 rounded">
            <div className="flex justify-between items-center mb-3 mt-5">
              <h3 className="text-lg font-medium">Filtered Data</h3>
              <button className="lg:hidden p-1" onClick={toggleSidebar}>
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center flex-wrap gap-2 mb-4">
              {/* Destination filters */}
              {Object.entries(filters.destination).map(([key, val]) => {
                if (val) {
                  console.log({key});
                  const label = key
                    .replace(/Only$/, "") // remove 'Only' suffix
                    .replace(/([A-Z])/g, " $1") // split camelCase
                    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

                  return (
                    <div
                      key={key}
                      className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                    >
                      {label}{" "}
                      <button onClick={() => handleCheckboxChange('destination', key)} className="cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                  );
                }
                return null;
              })}

              {/* Budget filter */}
              {Object.entries(filters.budget).map(([key, val]) => {
                if (key === "customValue") return null;
                if (val) {
                  const label =
                    key === "custom"
                      ? `Custom Budget: $${filters.budget.customValue}`
                      : key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div
                      key={key}
                      className="text-xs hover:border transition-all hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500  flex p-1 rounded bg-white gap-1 items-center"
                    >
                      {label}{" "}
                      <button onClick={() => handleCheckboxChange('budget', key)} className="cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                  );
                }
                return null;
              })}

              {/* Level filter */}
              {Object.entries(filters.level).map(([key, val]) => {
                if (val) {
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div
                      key={key}
                      className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500  flex p-1 rounded bg-white gap-1 items-center"
                    >
                      {label}{" "}
                      <button onClick={() => handleCheckboxChange('level', key)} className="cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                  );
                }
                return null;
              })}

              {/* Duration */}
              {filters.duration && (
                <div className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500  flex p-1 rounded bg-white gap-1 items-center">
                  {filters.duration}{" "}
                  <button   onClick={() => handleDurationChange("")} size={14}  className="cursor-pointer">
                    <X size={14}/>
                  </button>
                </div>
              )}

              {/* Date Range */}
              {filters.dateRange && (
                <div className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500  flex p-1 rounded bg-white gap-1 items-center">
                  {filters.dateRange}{" "}
                  <button onClick={() => handleDateChange('')} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filter sections */}
          <div className="space-y-4">
            <FilterSection
              title="Destination"
              isOpen={openSections.destination}
              onToggle={() => toggleSection("destination")}
            >
              <FilterCheckbox
                label="Bangladesh Only"
                checked={filters.destination.bangladeshOnly}
                onChange={() =>
                  handleCheckboxChange("destination", "bangladeshOnly")
                }
              />
            </FilterSection>
            
            <FilterSection
              title="Budget"
              isOpen={openSections.budget}
              onToggle={() => toggleSection("budget")}
            >
              <FilterCheckbox
                label="Value"
                checked={filters.budget.value}
                onChange={() => handleCheckboxChange("budget", "value")}
              />
              <FilterCheckbox
                label="Mid-range"
                checked={filters.budget.midRange}
                onChange={() => handleCheckboxChange("budget", "midRange")}
              />
              <FilterCheckbox
                label="High-end"
                checked={filters.budget.highEnd}
                onChange={() => handleCheckboxChange("budget", "highEnd")}
              />
              <FilterCheckbox
                label="Custom"
                checked={filters.budget.custom}
                onChange={() => handleCheckboxChange("budget", "custom")}
              />
              {filters.budget.custom && (
                <div className="mt-2">
                  <div className="flex items-center bg-white px-2 rounded">
                    <span className="mr-1">$</span>
                    <input
                      type="text"
                      value={filters.budget.customValue}
                      onChange={(e) => handleCustomBudgetChange(e.target.value)}
                      className="w-full  rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              )}
            </FilterSection>

            

            <FilterSection
              title="Level"
              isOpen={openSections.level}
              onToggle={() => toggleSection("level")}
            >
              <FilterCheckbox
                label="Top Rated"
                checked={filters.level.topRated}
                onChange={() => handleCheckboxChange("level", "topRated")}
              />
              <FilterCheckbox
                label="Level 1"
                checked={filters.level.level1}
                onChange={() => handleCheckboxChange("level", "level1")}
              />
              <FilterCheckbox
                label="Level 2"
                checked={filters.level.level2}
                onChange={() => handleCheckboxChange("level", "level2")}
              />
              <FilterCheckbox
                label="New"
                checked={filters.level.new}
                onChange={() => handleCheckboxChange("level", "new")}
              />
            </FilterSection>

            <FilterSection
              title="Duration"
              isOpen={openSections.duration}
              onToggle={() => toggleSection("duration")}
            >
              <input
                type="text"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    duration: e.target.value,
                  })
                }
                className="text-sm bg-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500 p-2 w-full"
                value={filters.duration}
              />
              <div className="text-sm text-gray-500 mt-2">
                Suggested Duration
              </div>
              <div className="flex flex-wrap text-xs gap-2 mt-2">
                <button
                  className={`px-2 py-1 border rounded ${
                    filters.duration === "3 Days"
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDurationChange("3 Days")}
                >
                  3 Days
                </button>
                <button
                  className={`px-2 py-1 border rounded ${
                    filters.duration === "7 Days"
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDurationChange("7 Days")}
                >
                  7 Days
                </button>
                <button
                  className={`px-2 py-1 border rounded ${
                    filters.duration === "10 Days"
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDurationChange("10 Days")}
                >
                  10 Days
                </button>
                <button
                  className={`px-2 py-1 border rounded ${
                    filters.duration === "1 Month"
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDurationChange("1 Month")}
                >
                  1 Month
                </button>
              </div>
            </FilterSection>

            <FilterSection
              title="Date Range"
              isOpen={openSections.dateRange}
              onToggle={() => toggleSection("dateRange")}
            >
              <div className="flex items-center rounded mt-2">
                <input
                  type="date"
                  placeholder="Select Date"
                  value={filters.dateRange}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="flex-grow p-2 text-sm rounded  bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {/* <button className="p-2">
                  <Calendar size={16} className="text-gray-400" />
                </button> */}
              </div>
            </FilterSection>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="px-6 pb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button
                className="mr-3 lg:hidden flex items-center justify-center"
                onClick={toggleSidebar}
              >
                <Filter size={20} />
              </button>
              <div>
                <h1 className="text-xl font-medium">Guider</h1>
                <p className=" text-gray-500 text-sm">
                  {filteredGuides.length} Results Found
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                <span className="mr-2 text-sm text-gray-500">
                  {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showSortOptions ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {["recommended", "rating", "reviews"].map((option) => (
                      <li
                        key={option}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          sortOption === option ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          setSortOption(option);
                          setShowSortOptions(false);
                        }}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGuides.map((guide) => (
              <GuiderCard key={guide.id} guide={guide} />
            ))}
          </div>

          {/* Show message when no results */}
          {currentGuides.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No guides found matching your filters.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md"
                onClick={() => {
                  setFilters({
                    destination: { bangladeshOnly: false },
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
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredGuides.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex space-x-1">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </PaginationButton>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show limited page numbers
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationButton
                        key={pageNumber}
                        active={currentPage === pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationButton>
                    );
                  } else if (
                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                    (pageNumber === currentPage + 2 &&
                      currentPage < totalPages - 2)
                  ) {
                    return (
                      <span key={pageNumber} className="flex items-center">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <PaginationButton
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </PaginationButton>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
