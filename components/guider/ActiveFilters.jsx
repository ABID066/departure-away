"use client";

import { X } from "lucide-react";
import { useGuiderOffers } from "./GuidersContext";

export default function GuiderActiveFilters() {
  const { filters, handleCheckboxChange } = useGuiderOffers();

  return (
      <div className="flex items-center flex-wrap gap-2 mb-4">
        {/* Location filters */}
        {Object.entries(filters.location).map(([key, val]) => {
          if (val) {
            const label = key === "dhaka"
                ? "Dhaka"
                : key === "chittagong"
                    ? "Chittagong"
                    : key === "sylhet"
                        ? "Sylhet"
                        : key === "other"
                            ? "Other Cities"
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

        {/* Experience filters */}
        {Object.entries(filters.experience).map(([key, val]) => {
          if (val) {
            const label = key === "beginner"
                ? "Beginner (1-2 years)"
                : key === "intermediate"
                    ? "Intermediate (3-5 years)"
                    : key === "expert"
                        ? "Expert (6+ years)"
                        : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

            return (
                <div
                    key={key}
                    className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                >
                  {label}{" "}
                  <button onClick={() => handleCheckboxChange('experience', key)} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
            );
          }
          return null;
        })}

        {/* Specialty filters */}
        {Object.entries(filters.specialty).map(([key, val]) => {
          if (val) {
            const label = key.charAt(0).toUpperCase() + key.slice(1);

            return (
                <div
                    key={key}
                    className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                >
                  {label}{" "}
                  <button onClick={() => handleCheckboxChange('specialty', key)} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
            );
          }
          return null;
        })}

        {/* Hourly Rate filters */}
        {Object.entries(filters.hourlyRate).map(([key, val]) => {
          if (key === "customValue") return null;
          if (val) {
            const label =
                key === "custom"
                    ? `Custom Rate: $${filters.hourlyRate.customValue}`
                    : key === "budget"
                        ? "Budget (Under $15)"
                        : key === "standard"
                            ? "Standard ($15-$30)"
                            : key === "premium"
                                ? "Premium ($30+)"
                                : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

            return (
                <div
                    key={key}
                    className="text-xs hover:border transition-all hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                >
                  {label}{" "}
                  <button onClick={() => handleCheckboxChange('hourlyRate', key)} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
            );
          }
          return null;
        })}

        {/* Languages filters */}
        {Object.entries(filters.languages).map(([key, val]) => {
          if (val) {
            const label = key === "english"
                ? "English"
                : key === "bengali"
                    ? "Bengali"
                    : key === "arabic"
                        ? "Arabic"
                        : key === "chinese"
                            ? "Chinese"
                            : key === "other"
                                ? "Other Languages"
                                : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

            return (
                <div
                    key={key}
                    className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                >
                  {label}{" "}
                  <button onClick={() => handleCheckboxChange('languages', key)} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
            );
          }
          return null;
        })}

        {/* Availability filters */}
        {Object.entries(filters.availability).map(([key, val]) => {
          if (val) {
            const label = key === "available"
                ? "Available Now"
                : key === "verified"
                    ? "Verified Guiders"
                    : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

            return (
                <div
                    key={key}
                    className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
                >
                  {label}{" "}
                  <button onClick={() => handleCheckboxChange('availability', key)} className="cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
            );
          }
          return null;
        })}
      </div>
  );
}