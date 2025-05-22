"use client";

import { ChevronDown } from "lucide-react";
import { useExclusiveOffers } from "./ExclusiveOffersContext";

export default function ExclusiveOffersHeader() {
    const {
        filteredOffers,
        totalOffers,
        sortOption,
        setSortOption,
        showSortOptions,
        setShowSortOptions,
        loading,
    } = useExclusiveOffers();

    const displayCount = filteredOffers.length > 0 ?  totalOffers : filteredOffers.length ;

    return (
        <>
            <div className="">
                <h1 className="text-sm sm:text-xl font-medium">Exclusive Offers</h1>
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
                            {["recommended", "price", "rating", "duration"].map((option) => (
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