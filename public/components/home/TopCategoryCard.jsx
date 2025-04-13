import React from "react";
import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/hiking-v1.png"

export default function TopCategoryCard({ category }) {
  const { name, image } = category;
  
  return (
    <div className="card h-44 relative rounded-lg overflow-hidden shadow-sm">
      <Link href="#">
        <div className="relative h-full bg-blue-500 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-4 text-center w-full">
            <h2 className="font-semibold text-white text-xl md:text-2xl">{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}