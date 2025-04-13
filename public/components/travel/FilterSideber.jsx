"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Filter } from "lucide-react";

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    destination: ["Bangladesh Only"],
    tourStyle: ["Budget"],
    tourType: ["Adventure"],
    duration: "10 Days",
    price: "20k",
    date: "2025-04-13",
    tourGroup: [],
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionToggle = ({ label, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex justify-between w-full text-sm font-semibold mb-2 cursor-pointer"
    >
      {label} <ChevronDown  className={`w-4 h-4 transform transition-transform duration-300 cursor-pointer ${
        openSections[section] ? "rotate-180" : ""
      }`} />
    </button>
  );

  const Checkbox = ({ label, category }) => {
    const isChecked = selectedFilters[category]?.includes(label);

    const handleChange = () => {
      setSelectedFilters((prev) => {
        const updated = new Set(prev[category] || []);
        if (updated.has(label)) {
          updated.delete(label);
        } else {
          updated.add(label);
        }
        return { ...prev, [category]: [...updated] };
      });
    };

    return (
      <label className="flex items-center space-x-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="accent-pink-500 cursor-pointer"
        />
        <span>{label}</span>
      </label>
    );
  };

  return (
    <>
      {/* Toggle Button on Mobile */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-pink-500 text-white rounded"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:block bg-white shadow-md md:shadow-none md:col-span-3 rounded-xl md:rounded-none md:p-0 ${
          mobileOpen
            ? "fixed top-0 left-0 h-full w-full overflow-y-auto z-50 bg-white"
            : ""
        }`}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-sm text-gray-500"
          >
            Close ✕
          </button>
        </div>

        <div className="space-y-6 p-4 md:sticky md:top-20">
          {/* Filter Tags */}
          {Object.entries(selectedFilters).some(([_, values]) => values?.length) && (
            <div className="mb-4 bg-gray-50 rounded-2xl p-2">
              <h2 className="text-sm font-semibold mb-2">Filtered Data</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([category, values]) => {
                  if (!values || values.length === 0) return null;

                  return Array.isArray(values)
                    ? values.map((val) => (
                        <span
                          key={val}
                          onClick={() =>
                            setSelectedFilters((prev) => ({
                              ...prev,
                              [category]: prev[category].filter((v) => v !== val),
                            }))
                          }
                          className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded cursor-pointer"
                        >
                          {val} ✕
                        </span>
                      ))
                    : (
                        <span
                          key={values}
                          onClick={() =>
                            setSelectedFilters((prev) => ({
                              ...prev,
                              [category]: "",
                            }))
                          }
                          className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded cursor-pointer"
                        >
                          {values} ✕
                        </span>
                      );
                })}
              </div>
            </div>
          )}

          {/* Destination */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Destination" section="destination" />
            {openSections.destination && (
              <div className="space-y-2">
                <Checkbox label="Bangladesh Only" category="destination" />
              </div>
            )}
          </div>

          {/* Tour Style */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Style" section="tourStyle" />
            {openSections.tourStyle && (
              <div className="space-y-2">
                <Checkbox label="Budget" category="tourStyle" />
                <Checkbox label="Luxury" category="tourStyle" />
                <Checkbox label="Deluxe" category="tourStyle" />
              </div>
            )}
          </div>

          {/* Tour Type */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Type" section="tourType" />
            {openSections.tourType && (
              <div className="space-y-2">
                <Checkbox label="Adventure" category="tourType" />
                <Checkbox label="Mountain" category="tourType" />
                <Checkbox label="Sea" category="tourType" />
                <Checkbox label="Hill" category="tourType" />
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Duration" section="duration" />
            {openSections.duration && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={selectedFilters.duration}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="10 Days"
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
                <p className="text-sm text-gray-500">Suggestion Duration</p>
                <div className="flex gap-2 flex-wrap">
                  {["2 Days", "7 Days", "10 Days", "1 month"].map((d) => (
                    <button
                      key={d}
                      onClick={() =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          duration: d,
                        }))
                      }
                      className={`${
                        selectedFilters.duration === d
                          ? "text-pink-600 border border-pink-600 cursor-pointer"
                          : "bg-white text-gray-800 border border-gray-300 cursor-pointer"
                      } rounded-md px-1 text-sm`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Date Range" section="dateRange" />
            {openSections.dateRange && (
              <div className="relative bg-white mt-2">
                <input
                  type="date"
                  value={selectedFilters.date || ""}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 "
                />
                <CalendarDays className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none cursor-pointer" />
              </div>
            )}
          </div>

       {/* Price Range */}
<div className="mb-4 bg-gray-50 rounded-2xl p-4">
  <SectionToggle label="Price Range" section="priceRange" />
  {openSections.priceRange && (
    <div className="space-y-4">
      {/* Range Slider */}
      <div className="pt-2">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>$0k</span>
          <span>$70k</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          {/* Track */}
          <div className="absolute h-full bg-pink-500 rounded-full" 
               style={{ 
                 width: `${(parseInt(selectedFilters.price.replace('k', '')) / 70) * 100}%` 
               }}>
                
          </div>
          {/* Thumb */}
          <div className="absolute w-4 h-4 bg-white border-2 border-pink-500 rounded-full -mt-1" 
               style={{ 
                 left: `calc(${(parseInt(selectedFilters.price.replace('k', '')) / 70) * 100}% - 8px)` 
               }}>
          </div>
        </div>
      </div>
      
      {/* Suggestion Buttons */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Suggestion Range</p>
        <div className="flex flex-wrap gap-2">
          {["10k", "20k", "30k", "40k"].map((p) => (
            <button
              key={p}
              onClick={() =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  price: p,
                }))
              }
              className={`${
                selectedFilters.price === p
                  ? "text-pink-600 border border-pink-600"
                  : "bg-white text-gray-800 border border-gray-300"
              } rounded-md px-3 py-1 text-sm cursor-pointer hover:bg-gray-50`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

          {/* Tour Group */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Group" section="tourGroup" />
            {openSections.tourGroup && (
              <div className="space-y-2">
                <Checkbox label="All" category="tourGroup" />
                <Checkbox label="Female" category="tourGroup" />
                <Checkbox label="Male" category="tourGroup" />
                <Checkbox label="Family" category="tourGroup" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
