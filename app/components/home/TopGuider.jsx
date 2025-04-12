"use client"
import GuiderCard from "../guiders/GuiderCard";
import NewsletterSection from "./NewsletterSection";
import { useState } from "react";

export default function Home() {
  const guides = [
    { name: "John Smith", rating: "4.9", reviews: 120 },
    { name: "Sarah Johnson", rating: "4.8", reviews: 98 },
    { name: "Michael Brown", rating: "4.7", reviews: 85 },
    { name: "Emily Davis", rating: "4.9", reviews: 110 },
    { name: "John Smith", rating: "4.9", reviews: 120 },
    { name: "Sarah Johnson", rating: "4.8", reviews: 98 },
    { name: "Michael Brown", rating: "4.7", reviews: 85 },
    { name: "Emily Davis", rating: "4.9", reviews: 110 },
    { name: "Chris Wilson", rating: "4.6", reviews: 75 },
    { name: "Anna Taylor", rating: "4.8", reviews: 90 },
  ];

  const [showAll, setShowAll] = useState(false);

  const displayedGuides = showAll ? guides : guides.slice(0, 8);

  return (
    <main className="w-full">
      {/* Top Rated Guides Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Top Rated Guider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedGuides.map((guide, index) => (
              <GuiderCard key={index} guide={guide} className="w-72" />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-pink-700 px-4 py-2 text-white rounded-lg hover:bg-pink-900 transition-colors duration-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Guider"}
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
