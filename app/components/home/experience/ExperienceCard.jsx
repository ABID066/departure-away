import React from "react";
import Image from "next/image"; // Import the Image component from next/image
import image from "@/public/images/home/house.jpg";

export default function ExperienceCard({ experience }) {
  const { title, tours, price, alt } = experience;

  return (
    <div className="flex flex-col items-center">
      {/* Rounded Image */}
      <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={alt}
          width={250}
          height={250}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small Card */}
      <div className="bg-white shadow-lg rounded-lg mt-[-60px] w-44 text-center p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex justify-center items-center text-stone-400">
          <p className="text-gray-600">{tours}</p><span> - </span>
          <div className="flex items-center">
          <span>From</span>
          <p>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
