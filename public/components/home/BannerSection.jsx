// components/BannerSection.jsx
"use client"
import React from "react";
import Image from "next/image";
import banner from "@/public/images/home/slider 1.png";

export default function BannerSection() {
  return (
    <div className="relative">
      {/* Banner Image Background */}
      <div className="relative h-[500px] w-full">
        {/* Using Next.js Image with layout fill for the background */}
        <Image 
          src={banner} 
          alt="Beach with hanging chair" 
          fill
          priority
          quality={100}
          className="object-cover"
        />
        
        {/* Text Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-16">
            <div className="max-w-xl">
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Find Your Dream<br />Trips In One Place
                </h1>
                <p className="text-gray-200 text-base mb-6 max-w-lg">
                  Find services are businesses or organizations that help individuals plan, book, and manage their 
                  excursions. These services encompass a wide range of travel needs and group activities that makes your dream true.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}