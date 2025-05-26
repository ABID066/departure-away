"use client";

import { X } from "lucide-react";
import { useTravelOffers } from "./TravelOffersContext";

export default function TravelActiveFilters() {
    const { filters, handleCheckboxChange, handleDateChange } = useTravelOffers();

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

            {/* Budget filter */}
            {Object.entries(filters.budget).map(([key, val]) => {
                if (key === "customValue") return null;
                if (val) {
                    const label =
                        key === "custom"
                            ? `Custom Budget: $${filters.budget.customValue}`
                            : key === "value"
                                ? "Value (Under $100)"
                                : key === "midRange"
                                    ? "Mid-range ($100-$500)"
                                    : key === "highEnd"
                                        ? "High-end ($500+)"
                                        : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs hover:border transition-all hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('budget', key)} className="cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            {/* Duration filter */}
            {Object.entries(filters.duration).map(([key, val]) => {
                if (val) {
                    const label = key === "shortTrip"
                        ? "Short Trip (1-3 days)"
                        : key === "weekTrip"
                            ? "Week Trip (4-7 days)"
                            : key === "longTrip"
                                ? "Long Trip (8+ days)"
                                : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('duration', key)} className="cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            {/* Category filter */}
            {Object.entries(filters.category).map(([key, val]) => {
                if (val) {
                    const label = key === "family"
                        ? "Family"
                        : key === "adventure"
                            ? "Adventure"
                            : key === "cultural"
                                ? "Cultural"
                                : key === "romantic"
                                    ? "Romantic"
                                    : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={key}
                            className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                        >
                            {label}{" "}
                            <button onClick={() => handleCheckboxChange('category', key)} className="cursor-pointer">
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