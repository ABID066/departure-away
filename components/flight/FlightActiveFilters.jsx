"use client";

import { X } from "lucide-react";
import { useFlightOffers } from "./FlightOffersContext";

export default function FlightActiveFilters() {
    const { filters, handleCheckboxChange, handleDateChange } = useFlightOffers();

    return (
        <div className="flex items-center flex-wrap gap-2 mb-4">
            {/* Location filters */}
            {Object.entries(filters.location).map(([key, val]) => {
                if (val) {
                    const label = key === "domestic"
                        ? "Domestic"
                        : key === "international"
                            ? "International"
                            : key === "other"
                                ? "Other Locations"
                                : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('location', key)} className="cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            {/* Price filters */}
            {Object.entries(filters.price).map(([key, val]) => {
                if (key === "customValue") return null;
                if (val) {
                    const label =
                        key === "custom"
                            ? `Custom Price: $${filters.price.customValue}`
                            : key === "economy"
                                ? "Economy (Under $500)"
                                : key === "business"
                                    ? "Business (Under $2000)"
                                    : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs hover:border transition-all hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('price', key)} className="cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            {/* Rating filters */}
            {Object.entries(filters.rating).map(([key, val]) => {
                if (val) {
                    const label = key === "fiveStar"
                        ? "5 Stars"
                        : key === "fourStar"
                            ? "4+ Stars"
                            : key === "threeStar"
                                ? "3+ Stars"
                                : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('rating', key)} className="cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            {/* Date Range */}
            {filters.dateRange && (
                <div className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center">
                    {filters.dateRange}{" "}
                    <button onClick={() => handleDateChange('')} className="cursor-pointer">
                        <X size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}