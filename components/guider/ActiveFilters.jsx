"use client";

import { X } from "lucide-react";
import { useGuiders } from "./GuidersContext";

export default function ActiveFilters() {
  const { filters, handleCheckboxChange, handleDurationChange, handleDateChange } = useGuiders();

  return (
    <div className="flex items-center flex-wrap gap-2 mb-4">
      {/* Destination filters */}
      {Object.entries(filters.destination).map(([key, val]) => {
        if (val) {
          const label = key
            .replace(/Only$/, "") // remove 'Only' suffix
            .replace(/([A-Z])/g, " $1") // split camelCase
            .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

          return (
            <div
              key={key}
              className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
            >
              {label}{" "}
              <button onClick={() => handleCheckboxChange('destination', key)} className="cursor-pointer">
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
              : key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
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

      {/* Level filter */}
      {Object.entries(filters.level).map(([key, val]) => {
        if (val) {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          return (
            <div
              key={key}
              className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center"
            >
              {label}{" "}
              <button onClick={() => handleCheckboxChange('level', key)} className="cursor-pointer">
                <X size={14} />
              </button>
            </div>
          );
        }
        return null;
      })}

      {/* Duration */}
      {filters.duration && (
        <div className="text-xs transition-all hover:border hover:text-pink-500 hover:bg-pink-50 hover:border-pink-500 flex p-1 rounded bg-white gap-1 items-center">
          {filters.duration}{" "}
          <button onClick={() => handleDurationChange("")} className="cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

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