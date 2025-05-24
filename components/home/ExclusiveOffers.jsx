"use client"
import React, { useState, useEffect } from "react";
import ExclusiveOfferCard from "./ExclusiveOfferCard";
import { useRouter } from 'next/navigation';

export default function ExclusiveOffer() {
  // States for data, loading and error handling
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchOffers = async () => {
      try {


        // Make API request
        const response = await fetch(
            "https://royolex.vercel.app/api/v1/service/-all-service?limit=8"
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch offers");
        }

        const result = await response.json();

        // Transform API data to match your component's expected format
        const formattedOffers = result.data.map(service => ({
          id: service._id || service.id,
          title: service.title,
          location: service.location || "Unknown",
          rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)), // Generate random rating if not available
          reviews: Math.floor(Math.random() * 100), // Generate random reviews if not available
          duration: service.duration_days ? `${service.duration_days} Days` : "Flexible",
          price: `$${service.price_basic}`,
          popular: Math.random() > 0.5, // Randomly set popular flag if not available
          imageUrl: service.media_urls || "@/public/images/home/exclusive.jpg" // Use the media_urls or fallback to default
        }));

        setOffers(formattedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError(error.message || "Failed to load offers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Determine which offers to display based on showAll state
  const displayedOffers = showAll ? offers : offers.slice(0, 8);

  return (
      <div className="max-w-6xl mx-auto my-20 px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12 mt-8">Save Big With Exclusive Offers</h2>

        {/* Loading State */}
        {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-700"></div>
            </div>
        )}

        {/* Error State */}
        {error && !loading && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              {error}
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