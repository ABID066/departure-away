"use client"
import React, { useState, useEffect } from "react";
import ExclusiveOfferCard from "./ExclusiveOfferCard";
import { useRouter } from 'next/navigation';
import { fetchExclusiveOffers } from "../../apiRequest/home/homeApi";

export default function ExclusiveOffer() {
  // States for data, loading and error handling
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedOffers = await fetchExclusiveOffers(8);
        setOffers(formattedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError(error.message || "Failed to load offers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine which offers to display based on showAll state
  const displayedOffers = showAll ? offers : offers.slice(0, 8);

  return (
      <div className="max-w-6xl mx-auto my-20 px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12 mt-8">Save Big With Exclusive Offers</h2>

        {/* Loading State with Skeleton Cards */}
        {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Error State */}
        {error && !loading && (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                  className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
        )}

        {/* Empty State */}
        {!loading && !error && offers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">No exclusive offers available at the moment.</p>
            </div>
        )}

        {/* Grid Layout for Displaying Offers */}
        {!loading && !error && offers.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedOffers.map((offer) => (
                    <ExclusiveOfferCard key={offer.id} offer={offer} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                    className="bg-pink-700 mb-4 px-4 py-2 text-white rounded-lg hover:bg-pink-900 cursor-pointer transition-colors duration-300"
                    onClick={() => router.push('/exclusive-offers')}
                >
                  View All Offers
                </button>
              </div>
            </>
        )}
      </div>
  );
}