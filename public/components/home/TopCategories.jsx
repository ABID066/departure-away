"use client";

import React, { useState, useRef } from "react";
import TopCategoryCard from "./TopCategoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import img from "@/public/images/home/ExclusiveDeals.png";

export default function TopCategories() {
  const categories = [
    {
      id: 1,
      name: "Resort Stay",
      image: img
    },
    {
      id: 2,
      name: "Boat Trip",
      image: "/images/boat.jpg",
    },
    {
      id: 3,
      name: "Mountains",
      image: "/images/mountain.jpg",
    },
    {
      id: 4,
      name: "Adventure",
      image: "/images/adventure.jpg",
    },
    {
      id: 5,
      name: "Adventure 2",
      image: "/images/adventure2.jpg",
    },
    {
      id: 6,
      name: "City",
      image: "/images/city.jpg",
    },
    {
      id: 7,
      name: "Beach",
      image: "/images/beach.jpg",
    },
    {
      id: 8,
      name: "Desert",
      image: "/images/desert.jpg",
    },
  ];

  const carouselRef = useRef(null);
  
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' 
        ? -carouselRef.current.offsetWidth * 0.8
        : carouselRef.current.offsetWidth * 0.8;
        
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Top Categories</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <div key={category.id} className="flex-shrink-0 w-64">
            <TopCategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

