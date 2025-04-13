import Image from "next/image";
import React from "react";
import banner from "@/public/images/home/banner.jpg";

export default function Banner() {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="relative top-0">
        <Image src={banner} className="w-full" alt="cover photo1" />
        <div className="absolute top-0 h-full w-full flex items-center justify-center bg-gradient-to-r from-[#807e7e] to-[rgb(226 232 240)]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-white space-y-4">
              <h2 className="text-7xl font-bold">Find Your Dream</h2>
              <h2 className="text-7xl font-bold">Trips in One Place</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}