import React from "react";
import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/hiking-v1.png";

export default function TopCategoryCard({ category }) {
  const { name } = category;

  return (
    <div className="card relative rounded-lg shadow-sm">
      <Link href="#">
        <div className="relative overflow-hidden rounded-lg">
          <Image src={img} alt={name} className="w-full h-64 object-cover" />
        </div>
        <div className="relative -top-15 text-white">
          <h2 className="font-semibold  text-xl md:text-2xl">{name}</h2>
        </div>
      </Link>
    </div>
  );
}
