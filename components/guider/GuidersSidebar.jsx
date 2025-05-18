"use client";

import { X } from "lucide-react";
import { useGuiders } from "./GuidersContext";
import FilterSection from "./FilterSection";
import FilterCheckbox from "./FilterCheckbox";
import ActiveFilters from "./ActiveFilters";

export default function GuidersSidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    openSections,
    toggleSection,
    filters,
    handleCheckboxChange,
    handleCustomBudgetChange,
    handleDurationChange,
    handleDateChange,
  } = useGuiders();

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

          <ActiveFilters />
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
                    className="w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              onChange={(e) => handleDurationChange(e.target.value)}
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
                className="flex-grow p-2 text-sm rounded bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  );
}