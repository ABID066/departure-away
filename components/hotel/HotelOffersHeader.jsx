"use client";

import { ChevronDown } from "lucide-react";
import { useHotelOffers } from "./HotelOffersContext";
import { useEffect, useRef } from "react";

const HotelOffersHeader = () => {
    const {
        totalOffers,
        sortOption,
        setSortOption,
        showSortOptions,
        setShowSortOptions,
        filteredOffers,
        loading,
        offers
    } = useHotelOffers();

    const sortRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowSortOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowSortOptions]);

    // Fixed the logic: show filtered count when filters are applied, otherwise show total
    const displayCount = filteredOffers.length < offers.length ? filteredOffers.length : totalOffers;

    return (
        <>
            <div className="">
                <h1 className="text-sm sm:text-xl font-medium">Hotel Offers</h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                    {loading ? "Loading..." : `${displayCount} Results Found`}
                </p>
            </div>
            <div className="relative" ref={sortRef}>
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
                            {["recommended", "price", "rating"].map((option) => (
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
};

export default HotelOffersHeader;