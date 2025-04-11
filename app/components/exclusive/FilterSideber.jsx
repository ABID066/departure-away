"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Filter } from "lucide-react";

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionToggle = ({ label, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex justify-between w-full text-sm font-semibold mb-2"
    >
      {label} <ChevronDown className="w-4 h-4" />
    </button>
  );

  const Checkbox = ({ label, defaultChecked }) => (
    <label className="flex items-center space-x-2 text-sm">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="accent-pink-500"
      />
      <span>{label}</span>
    </label>
  );

  const Input = ({ placeholder }) => (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full p-2 text-sm border border-gray-300 rounded"
    />
  );

  const Button = ({ children, active }) => (
    <button
      className={`px-2 py-1 border text-xs rounded ${
        active
          ? "bg-pink-100 text-pink-600 border-pink-300"
          : "border-gray-300 text-gray-600"
      }`}
    >
      {children}
    </button>
  );

  const RangeSlider = () => (
    <input
      type="range"
      min="5"
      max="110"
      step="5"
      className="w-full accent-pink-500"
    />
  );

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

      {/* Sidebar for large + mobile view */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:block bg-white shadow-md md:shadow-none md:col-span-3  rounded-xl md:rounded-none md:p-0 ${
          mobileOpen
            ? "fixed top-0 left-0 h-full w-full overflow-y-auto z-50 bg-white"
            : ""
        }`}
      >
        {/* Close button (mobile only) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-sm text-gray-500"
          >
            Close ✕
          </button>
        </div>

        <div className="space-y-6 p-4">
          {/* Filter Tags */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-2">
            <h2 className="text-sm font-semibold mb-2">Filtered Data</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white text-xs px-2 py-1 rounded">
                Budget ✕
              </span>
              <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">
                Adventure ✕
              </span>
              <span className="bg-white text-xs px-2 py-1 rounded">
                Mode ✕
              </span>
            </div>
          </div>

          {/* Destination */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Destination" section="destination" />
            {openSections.destination && (
              <div className="space-y-2">
                <Checkbox label="Bangladesh Only" defaultChecked />
              </div>
            )}
          </div>

          {/* Tour Style */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Style" section="tourStyle" />
            {openSections.tourStyle && (
              <div className="space-y-2">
                <Checkbox label="Budget" defaultChecked />
                <Checkbox label="Luxury" />
                <Checkbox label="Deluxe" />
              </div>
            )}
          </div>

          {/* Tour Type */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Type" section="tourType" />
            {openSections.tourType && (
              <div className="space-y-2">
                <Checkbox label="Adventure" defaultChecked />
                <Checkbox label="Mountain" />
                <Checkbox label="Sea" />
                <Checkbox label="Hill" />
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle
              className="text-sm font-semibold"
              label="Duration"
              section="duration"
            />
            {openSections.duration && (
              <div className="space-y-2">
                <div className="bg-white">
                  <Input
                    type="text"
                    placeholder="10 Days"
                    className="w-full outline-none text-gray-900  "
                  />
                </div>
                <p className="text-sm text-gray-500">Suggetion Duration</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    2 Days
                  </button>
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    7 Days
                  </button>
                  <button
                    className="text-pink-600 border border-pink-600 rounded-md px-1 text-sm "
                    type="button"
                  >
                    10 Days
                  </button>
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    1 month
                  </button>
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
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <CalendarDays className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Price Range" section="priceRange" />
            {openSections.priceRange && (
              <div className="space-y-2">
                <RangeSlider />
                <div className="flex justify-between text-xs">
                  <span>$5K</span>
                  <span>$110K</span>
                </div>
                <p className="text-sm text-gray-500">Suggetion Duration</p>
                <div className="flex flex-wrap  gap-2">
                <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    10k
                  </button>
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    20k
                  </button>
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    30k
                  </button>
                  <button
                    className="bg-white text-gray-800 border border-gray-300 rounded-md px-1 text-sm "
                    type="button"
                  >
                    40k
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tour Group */}
          <div className="mb-4 bg-gray-50 rounded-2xl p-4">
            <SectionToggle label="Tour Group" section="tourGroup" />
            {openSections.tourGroup && (
              <div className="space-y-2">
                <Checkbox label="All" />
                <Checkbox label="Female" />
                <Checkbox label="Male" />
                <Checkbox label="Family" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
