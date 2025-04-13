// components/ExclusiveOffers.jsx
"use client"
import React from "react";
import Image from "next/image";
import card1 from "@/public/images/home/WeeklyFlashDeals.png";
import card2 from "@/public/images/home/HolyDayExclusive.png";
import card3 from "@/public/images/home/ExclusiveDeals.png";

export default function ThreeCards() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Flash Deals Card */}
        <div className="bg-blue-100 rounded-3xl p-6 flex items-center justify-between overflow-hidden relative h-64">
          <div className="text-left">
            <h3 className="font-bold text-gray-800 text-2xl">Weekly<br />Flash Deals</h3>
            <p className="text-md text-gray-600 mt-1">Up to 30% Off</p>
            <a href="#" className="text-xs text-gray-600 block mt-4 hover:underline">View Details</a>
          </div>
          <div className="relative">
            <Image 
              src={card1} 
              alt="Travel essentials" 
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>

        {/* Holy Day Exclusive Offers Card */}
        <div className="bg-yellow-400 rounded-3xl p-6 flex items-center justify-between overflow-hidden relative h-64">
          <div className="text-left">
            <h3 className="font-bold text-gray-950 text-2xl">Holy Day<br />Exclusive Offers</h3>
            <p className="text-md text-gray-600 mt-1">Plan your next trip</p>
            <a href="#" className="text-xs text-gray-600 block mt-4 hover:underline">View Details</a>
          </div>
          <div className="relative">
            <Image 
              src={card2}
              alt="Yellow luggage" 
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>

        {/* Exclusive Deals Card */}
        <div className="rounded-3xl overflow-hidden relative h-64">
          {/* Background Image for the entire card */}
          <div className="absolute inset-0">
            <Image 
              src={card3} 
              alt="Bunny mascot background" 
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content with overlay */}
          <div className="relative z-10 p-6 flex items-center justify-between h-full">
            <div className="text-left">
              <h3 className="font-bold text-white text-2xl">Exclusive<br />Deals</h3>
              <p className="text-md text-gray-200 mt-1">Want to save up<br/>to 50% off</p>
              <a href="#" className="text-xs text-gray-100 block mt-4 hover:underline">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}