import React from "react";
import travel from "@/public/images/home/travel.jpg"
import Image from "next/image";
export default function TopCategoryCard({category}) {
    const { name } = category;
  return (
    <div key={category.id} className="card shadow-sm text-center">
      <figure className="relative">
        <Image
          src={travel}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </figure>
      <div className="absolute bottom-4 text-center w-full">
        <h2 className="font-semibold text-white text-2xl">{name}</h2>
      </div>
    </div>
  );
}
