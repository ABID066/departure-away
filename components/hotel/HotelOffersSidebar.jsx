"use client";

import { X } from "lucide-react";
import { useHotelOffers } from "./HotelOffersContext";
import FilterSection from "@/components/shared/FilterSection";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import HotelActiveFilters from "./HotelActiveFilters";

const HotelOffersSidebar = () => {
    const {
        sidebarOpen,
        toggleSidebar,
        filters,
        openSections,
        toggleSection,
        handleCheckboxChange,
        handleDateChange,
        handleCustomPriceChange,
    } = useHotelOffers();

    return (
        <aside
            className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed lg:static lg:translate-x-0 z-20 bg-white w-64 h-full overflow-y-auto transition-transform duration-300 ease-in-out`}
        >
            <div className="">
                <div className="px-5 py-1 bg-[#F7F6FE] mb-4 rounded">
                    <div className="flex justify-between items-center mb-3 mt-5">
                        <h3 className="text-lg font-medium">Filtered Data</h3>
                        <button className="lg:hidden p-1" onClick={toggleSidebar}>
                            <X size={20} />
                        </button>
                    </div>

                    <HotelActiveFilters />
                </div>

                {/* Filter sections */}
                <div className="space-y-4">
                    <FilterSection
                        title="Location"
                        isOpen={openSections.location}
                        onToggle={() => toggleSection("location")}
                    >
                        <FilterCheckbox
                            label="Domestic"
                            checked={filters.location.domestic}
                            onChange={() => handleCheckboxChange("location", "domestic")}
                        />
                        <FilterCheckbox
                            label="International"
                            checked={filters.location.international}
                            onChange={() => handleCheckboxChange("location", "international")}
                        />
                        <FilterCheckbox
                            label="Other Locations"
                            checked={filters.location.other}
                            onChange={() => handleCheckboxChange("location", "other")}
                        />
                    </FilterSection>

                    <FilterSection
                        title="Price Range"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <FilterCheckbox
                            label="Budget (Under $100)"
                            checked={filters.price.budget}
                            onChange={() => handleCheckboxChange("price", "budget")}
                        />
                        <FilterCheckbox
                            label="Mid-range ($100 - $300)"
                            checked={filters.price.midRange}
                            onChange={() => handleCheckboxChange("price", "midRange")}
                        />
                        <FilterCheckbox
                            label="Luxury ($300+)"
                            checked={filters.price.luxury}
                            onChange={() => handleCheckboxChange("price", "luxury")}
                        />
                        <FilterCheckbox
                            label="Custom"
                            checked={filters.price.custom}
                            onChange={() => handleCheckboxChange("price", "custom")}
                        />
                        {filters.price.custom && (
                            <div className="mt-2">
                                <div className="flex items-center bg-white px-2 rounded">
                                    <span className="mr-1">$</span>
                                    <input
                                        type="text"
                                        value={filters.price.customValue}
                                        onChange={(e) => handleCustomPriceChange(e.target.value)}
                                        className="w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Max price"
                                    />
                                </div>
                            </div>
                        )}
                    </FilterSection>

                    <FilterSection
                        title="Rating"
                        isOpen={openSections.rating}
                        onToggle={() => toggleSection("rating")}
                    >
                        <FilterCheckbox
                            label="Excellent (4.5+ Stars)"
                            checked={filters.rating.fiveStar}
                            onChange={() => handleCheckboxChange("rating", "fiveStar")}
                        />
                        <FilterCheckbox
                            label="Very Good (4.0-4.5 Stars)"
                            checked={filters.rating.fourStar}
                            onChange={() => handleCheckboxChange("rating", "fourStar")}
                        />
                        <FilterCheckbox
                            label="Good (3.0-4.0 Stars)"
                            checked={filters.rating.threeStar}
                            onChange={() => handleCheckboxChange("rating", "threeStar")}
                        />
                    </FilterSection>

                    <FilterSection
                        title="Amenities"
                        isOpen={openSections.amenities}
                        onToggle={() => toggleSection("amenities")}
                    >
                        <FilterCheckbox
                            label="Wi-Fi"
                            checked={filters.amenities.wifi}
                            onChange={() => handleCheckboxChange("amenities", "wifi")}
                        />
                        <FilterCheckbox
                            label="Pool"
                            checked={filters.amenities.pool}
                            onChange={() => handleCheckboxChange("amenities", "pool")}
                        />
                        <FilterCheckbox
                            label="Spa"
                            checked={filters.amenities.spa}
                            onChange={() => handleCheckboxChange("amenities", "spa")}
                        />
                        <FilterCheckbox
                            label="Restaurant"
                            checked={filters.amenities.restaurant}
                            onChange={() => handleCheckboxChange("amenities", "restaurant")}
                        />
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
                                className="flex-grow p-2 text-sm rounded bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                    </FilterSection>
                </div>
            </div>
        </aside>
    );
};

export default HotelOffersSidebar;