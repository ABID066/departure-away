"use client";

import { ChevronDown } from "lucide-react";
import { useGuiderOffers } from "./GuidersContext";

export default function GuiderOffersHeader() {
  const {
    filteredOffers,
    totalOffers,
    sortOption,
    setSortOption,
    showSortOptions,
    setShowSortOptions,
    loading,
    offers,
  } = useGuiderOffers();

  // Show filtered count when filters are applied, otherwise show total
  const displayCount = filteredOffers.length < offers.length ? filteredOffers.length : totalOffers;

  return (
      <>
        <div className="">
          <h1 className="text-sm sm:text-xl font-medium">Guider</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            {loading ? "Loading..." : `${displayCount} Results Found`}
          </p>
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
                  {["recommended", "price", "rating", "experience"].map((option) => (
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
      </>
  );
}