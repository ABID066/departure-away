"use client";

import { X } from "lucide-react";
import { useTravelOffers } from "./TravelOffersContext";
import FilterSection from "@/components/shared/FilterSection";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import TravelActiveFilters from "./TravelActiveFilters";

export default function TravelOffersSidebar() {
    const {
        sidebarOpen,
        toggleSidebar,
        openSections,
        toggleSection,
        filters,
        handleCheckboxChange,
        handleCustomBudgetChange,
        handleDateChange,
    } = useTravelOffers();

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

                    <TravelActiveFilters />
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
                        title="Budget"
                        isOpen={openSections.budget}
                        onToggle={() => toggleSection("budget")}
                    >
                        <FilterCheckbox
                            label="Value (Under $100)"
                            checked={filters.budget.value}
                            onChange={() => handleCheckboxChange("budget", "value")}
                        />
                        <FilterCheckbox
                            label="Mid-range ($100 - $500)"
                            checked={filters.budget.midRange}
                            onChange={() => handleCheckboxChange("budget", "midRange")}
                        />
                        <FilterCheckbox
                            label="High-end ($500+)"
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
                                        className="w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Max budget"
                                    />
                                </div>
                            </div>
                        )}
                    </FilterSection>

                    <FilterSection
                        title="Duration"
                        isOpen={openSections.duration}
                        onToggle={() => toggleSection("duration")}
                    >
                        <FilterCheckbox
                            label="Short Trip (1-3 days)"
                            checked={filters.duration.shortTrip}
                            onChange={() => handleCheckboxChange("duration", "shortTrip")}
                        />
                        <FilterCheckbox
                            label="Week Trip (4-7 days)"
                            checked={filters.duration.weekTrip}
                            onChange={() => handleCheckboxChange("duration", "weekTrip")}
                        />
                        <FilterCheckbox
                            label="Long Trip (8+ days)"
                            checked={filters.duration.longTrip}
                            onChange={() => handleCheckboxChange("duration", "longTrip")}
                        />
                    </FilterSection>

                    <FilterSection
                        title="Category"
                        isOpen={openSections.category}
                        onToggle={() => toggleSection("category")}
                    >
                        <FilterCheckbox
                            label="Family"
                            checked={filters.category.family}
                            onChange={() => handleCheckboxChange("category", "family")}
                        />
                        <FilterCheckbox
                            label="Adventure"
                            checked={filters.category.adventure}
                            onChange={() => handleCheckboxChange("category", "adventure")}
                        />
                        <FilterCheckbox
                            label="Cultural"
                            checked={filters.category.cultural}
                            onChange={() => handleCheckboxChange("category", "cultural")}
                        />
                        <FilterCheckbox
                            label="Romantic"
                            checked={filters.category.romantic}
                            onChange={() => handleCheckboxChange("category", "romantic")}
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