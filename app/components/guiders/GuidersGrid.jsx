"use client";

import { useGuiders } from "./GuidersContext";
import GuiderCard from "./GuiderCard";

export default function GuidersGrid() {
  const { currentGuides, filteredGuides, resetFilters } = useGuiders();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGuides.map((guide) => (
          <GuiderCard key={guide.id} guide={guide} />
        ))}
      </div>

      {/* Show message when no results */}
      {currentGuides.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No guides found matching your filters.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}