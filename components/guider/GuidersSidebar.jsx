"use client";

import { X } from "lucide-react";
import { useGuiderOffers } from "./GuidersContext";
import FilterSection from "@/components/shared/FilterSection";
import FilterCheckbox from "@/components/shared/FilterCheckbox";
import GuiderActiveFilters from "./ActiveFilters";

export default function GuiderOffersSidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    openSections,
    toggleSection,
    filters,
    handleCheckboxChange,
    handleCustomRateChange,
  } = useGuiderOffers();

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

            <GuiderActiveFilters />
          </div>

          {/* Filter sections */}
          <div className="space-y-4">
            <FilterSection
                title="Location"
                isOpen={openSections.location}
                onToggle={() => toggleSection("location")}
            >
              <FilterCheckbox
                  label="Dhaka"
                  checked={filters.location.dhaka}
                  onChange={() => handleCheckboxChange("location", "dhaka")}
              />
              <FilterCheckbox
                  label="Chittagong"
                  checked={filters.location.chittagong}
                  onChange={() => handleCheckboxChange("location", "chittagong")}
              />
              <FilterCheckbox
                  label="Sylhet"
                  checked={filters.location.sylhet}
                  onChange={() => handleCheckboxChange("location", "sylhet")}
              />
              <FilterCheckbox
                  label="Other Cities"
                  checked={filters.location.other}
                  onChange={() => handleCheckboxChange("location", "other")}
              />
            </FilterSection>

            <FilterSection
                title="Experience"
                isOpen={openSections.experience}
                onToggle={() => toggleSection("experience")}
            >
              <FilterCheckbox
                  label="Beginner (1-2 years)"
                  checked={filters.experience.beginner}
                  onChange={() => handleCheckboxChange("experience", "beginner")}
              />
              <FilterCheckbox
                  label="Intermediate (3-5 years)"
                  checked={filters.experience.intermediate}
                  onChange={() => handleCheckboxChange("experience", "intermediate")}
              />
              <FilterCheckbox
                  label="Expert (6+ years)"
                  checked={filters.experience.expert}
                  onChange={() => handleCheckboxChange("experience", "expert")}
              />
            </FilterSection>

            <FilterSection
                title="Specialty"
                isOpen={openSections.specialty}
                onToggle={() => toggleSection("specialty")}
            >
              <FilterCheckbox
                  label="Architecture"
                  checked={filters.specialty.architecture}
                  onChange={() => handleCheckboxChange("specialty", "architecture")}
              />
              <FilterCheckbox
                  label="History"
                  checked={filters.specialty.history}
                  onChange={() => handleCheckboxChange("specialty", "history")}
              />
              <FilterCheckbox
                  label="Culture"
                  checked={filters.specialty.culture}
                  onChange={() => handleCheckboxChange("specialty", "culture")}
              />
              <FilterCheckbox
                  label="Food"
                  checked={filters.specialty.food}
                  onChange={() => handleCheckboxChange("specialty", "food")}
              />
              <FilterCheckbox
                  label="Nature"
                  checked={filters.specialty.nature}
                  onChange={() => handleCheckboxChange("specialty", "nature")}
              />
            </FilterSection>

            <FilterSection
                title="Hourly Rate"
                isOpen={openSections.hourlyRate}
                onToggle={() => toggleSection("hourlyRate")}
            >
              <FilterCheckbox
                  label="Budget (Under $15)"
                  checked={filters.hourlyRate.budget}
                  onChange={() => handleCheckboxChange("hourlyRate", "budget")}
              />
              <FilterCheckbox
                  label="Standard ($15 - $30)"
                  checked={filters.hourlyRate.standard}
                  onChange={() => handleCheckboxChange("hourlyRate", "standard")}
              />
              <FilterCheckbox
                  label="Premium ($30+)"
                  checked={filters.hourlyRate.premium}
                  onChange={() => handleCheckboxChange("hourlyRate", "premium")}
              />
              <FilterCheckbox
                  label="Custom"
                  checked={filters.hourlyRate.custom}
                  onChange={() => handleCheckboxChange("hourlyRate", "custom")}
              />
              {filters.hourlyRate.custom && (
                  <div className="mt-2">
                    <div className="flex items-center bg-white px-2 rounded">
                      <span className="mr-1">$</span>
                      <input
                          type="text"
                          value={filters.hourlyRate.customValue}
                          onChange={(e) => handleCustomRateChange(e.target.value)}
                          className="w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Max hourly rate"
                      />
                    </div>
                  </div>
              )}
            </FilterSection>

            <FilterSection
                title="Languages"
                isOpen={openSections.languages}
                onToggle={() => toggleSection("languages")}
            >
              <FilterCheckbox
                  label="English"
                  checked={filters.languages.english}
                  onChange={() => handleCheckboxChange("languages", "english")}
              />
              <FilterCheckbox
                  label="Bengali"
                  checked={filters.languages.bengali}
                  onChange={() => handleCheckboxChange("languages", "bengali")}
              />
              <FilterCheckbox
                  label="Arabic"
                  checked={filters.languages.arabic}
                  onChange={() => handleCheckboxChange("languages", "arabic")}
              />
              <FilterCheckbox
                  label="Chinese"
                  checked={filters.languages.chinese}
                  onChange={() => handleCheckboxChange("languages", "chinese")}
              />
              <FilterCheckbox
                  label="Other Languages"
                  checked={filters.languages.other}
                  onChange={() => handleCheckboxChange("languages", "other")}
              />
            </FilterSection>

            <FilterSection
                title="Availability"
                isOpen={openSections.availability}
                onToggle={() => toggleSection("availability")}
            >
              <FilterCheckbox
                  label="Available Now"
                  checked={filters.availability.available}
                  onChange={() => handleCheckboxChange("availability", "available")}
              />
              <FilterCheckbox
                  label="Verified Guiders"
                  checked={filters.availability.verified}
                  onChange={() => handleCheckboxChange("availability", "verified")}
              />
            </FilterSection>
          </div>
        </div>
      </aside>
  );
}