"use client"
import GuiderOfferCard from "../guider/GuiderCard";
import NewsletterSection from "./NewsletterSection";
import React, { useState, useEffect } from "react";
import {useRouter} from "next/navigation";

export default function TopGuider() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  // Fetch guides from API
  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
            'https://royolex.vercel.app/api/v1/guider/all-guider?limit=8&page=1'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Transform API data to match component's expected format
          const formattedGuides = result.data.map(guider => ({
            id: guider._id,
            name: guider.name,
            bio: guider.bio || "",
            location: guider.location || "Unknown",
            experience: guider.experience || "1 year",
            specialty: guider.specialty || "general",
            hourlyRate: guider.hourlyRate || 0,
            dailyRate: guider.dailyRate || 0,
            // Generate random ratings and reviews as requested
            rating: guider.rating > 0 ? guider.rating : parseFloat((Math.random() * (5 - 4.5) + 4.5).toFixed(1)),
            reviews: guider.totalReviews > 0 ? guider.totalReviews : Math.floor(Math.random() * 150) + 50,
            imageUrl: (guider.imageUrl && guider.imageUrl[0]) || "/api/placeholder/400/320",
            languages: guider.languages || [],
            isVerified: guider.isVerified || false,
            available: guider.available || false,
            contactInfo: guider.contactInfo || "",
            creatorType: guider.creatorType,
            createdAt: guider.createdAt,
            // Additional computed fields
            experienceYears: parseInt(guider.experience) || 1,
            languageList: Array.isArray(guider.languages) ? guider.languages.join(", ") : "",
          }));

          setGuides(formattedGuides);
        } else {
          throw new Error(result.message || 'Failed to fetch guides');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching guides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const displayedGuides = showAll ? guides : guides.slice(0, 8);

  return (
      <main className="w-full overflow-hidden">
        {/* Top Rated Guides Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Top Rated Guider</h2>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="w-full h-48 bg-gray-200"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                  ))}
                </div>
            )}

            {/* Error State */}
            {error && (
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

            {/* Guides Grid */}
            {!loading && !error && guides.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedGuides.map((guide) => (
                        <GuiderOfferCard key={guide.id} guide={guide}/>
                    ))}
                  </div>

                  {/* Show Button */}
                  <div className="flex justify-center mt-8">
                    <button
                        className="bg-pink-700 mb-4 px-4 py-2 text-white rounded-lg hover:bg-pink-900 cursor-pointer transition-colors duration-300"
                        onClick={() => router.push('/guiders')}
                    >
                      View All Guider
                    </button>
                  </div>
                </>
            )}

            {/* No Data State */}
            {!loading && !error && guides.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No guides available at the moment.</p>
                </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection/>
      </main>
  );
}