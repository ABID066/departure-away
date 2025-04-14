
"use client"
import React, { useState } from "react";
import ExclusiveOfferCard from "./ExclusiveOfferCard";

export default function ExclusiveOffer() {
  const offers = [
    {
      id: 1,
      title: "Beach Getaway",
      location: "Maldives",
      rating: 4.9,
      reviews: 120,
      duration: "5 Days",
      price: "$999",
      popular: true,
    },
    {
      id: 2,
      title: "Mountain Retreat",
      location: "Swiss Alps",
      rating: 4.8,
      reviews: 98,
      duration: "7 Days",
      price: "$1,499",
      popular: true,
    },
    {
      id: 3,
      title: "City Escape",
      location: "New York",
      rating: 4.7,
      reviews: 85,
      duration: "3 Days",
      price: "$599",
      popular: false,
    },
    {
      id: 4,
      title: "Desert Adventure",
      location: "Dubai",
      rating: 4.6,
      reviews: 75,
      duration: "4 Days",
      price: "$799",
      popular: true,
    },
    {
      id: 5,
      title: "Tropical Paradise",
      location: "Bali",
      rating: 4.9,
      reviews: 110,
      duration: "6 Days",
      price: "$1,199",
      popular: true,
    },
    {
      id: 6,
      title: "Cultural Tour",
      location: "Kyoto",
      rating: 4.8,
      reviews: 90,
      duration: "5 Days",
      price: "$899",
      popular: false,
    },
    
    {
      id: 7,
      title: "Safari Experience",
      location: "Kenya",
      rating: 4.7,
      reviews: 80,
      duration: "7 Days",
      price: "1299",
      popular: true,
    },
    {
      id: 8,
      title: "Island Hopping",
      location: "Philippines",
      rating: 4.6,
      reviews: 70,
      duration: "5 Days",
      price: "999",
      popular: false,
    },
    {
      id: 9,
      title: "Historical Journey",
      location: "Rome",
      rating: 4.8,
      reviews: 95,
      duration: "4 Days",
      price: "699",
      popular: false,
    },
    {
      id: 10,
      title: "Northern Lights",
      location: "Iceland",
      rating: 4.9,
      reviews: 130,
      duration: "6 Days",
      price: "1599",
      popular: true,
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const displayedOffers = showAll ? offers : offers.slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto  my-20 px-4">
      <h2 className="text-5xl font-bold text-center my-8">Save Big With Exclusive Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedOffers.map((offer) => (
          <ExclusiveOfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-pink-700 mb-4 px-4 py-2 text-white rounded-lg hover:bg-pink-900 transition-colors duration-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All Offers"}
        </button>
      </div>
    </div>
  );
}

