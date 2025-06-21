"use client";

import { X } from "lucide-react";
import { useFlightOffers } from "./FlightOffersContext";
import FilterSection from "@/components/shared/FilterSection";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import FlightActiveFilters from "./FlightActiveFilters";

export default function FlightOffersSidebar() {
    const {
        sidebarOpen,
        toggleSidebar,
        openSections,
        toggleSection,
        filters,
        handleCheckboxChange,
        handleCustomPriceChange,
        handleDateChange,
    } = useFlightOffers();

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

                    <FlightActiveFilters />
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
                            label="Other"
                            checked={filters.location.other}
                            onChange={() => handleCheckboxChange("location", "other")}
                        />
                    </FilterSection>

                    <FilterSection
                        title="Price"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <FilterCheckbox
                            label="Economy (Under $500)"
                            checked={filters.price.economy}
                            onChange={() => handleCheckboxChange("price", "economy")}
                        />
                        <FilterCheckbox
                            label="Business (Under $2000)"
                            checked={filters.price.business}
                            onChange={() => handleCheckboxChange("price", "business")}
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
                            label="5 Stars"
                            checked={filters.rating.fiveStar}
                            onChange={() => handleCheckboxChange("rating", "fiveStar")}
                        />
                        <FilterCheckbox
                            label="4+ Stars"
                            checked={filters.rating.fourStar}
                            onChange={() => handleCheckboxChange("rating", "fourStar")}
                        />
                        <FilterCheckbox
                            label="3+ Stars"
                            checked={filters.rating.threeStar}
                            onChange={() => handleCheckboxChange("rating", "threeStar")}
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
}