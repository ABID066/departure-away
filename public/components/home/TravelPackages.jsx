"use client";
import React, { useEffect, useState } from "react";
import TravelCard from "./TravelCard";

export default function TravelPackages() {
  const [packages, setPackages] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.log(err));
  }, []);

  const displayedPackages = showAll ? packages : packages.slice(0, 8);

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <h2 className="text-5xl font-bold text-center mb-4">Travel Package</h2>
      <div className="flex justify-center mb-8 space-x-2">
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          For You
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          Haji
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          Alpine
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 m-0">
          Wonders
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedPackages.map((item) => (
          <TravelCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-pink-700 px-4 py-2 text-white rounded-lg hover:bg-pink-900 transition-colors duration-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All Packages"}
        </button>
      </div>
    </div>
  );
}