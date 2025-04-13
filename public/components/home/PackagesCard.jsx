import Image from "next/image";
import React from "react";
import whiteBag from "@/public/images/packages/whiteBag.png";
export default function PackagesCard({ item }) {
  const { title, details, discount } = item;
  return (
    <div className="card bg-gray-200 shadow-sm rounded-lg p-4 mx-auto text-center">
      <div className="flex justify-center items-center space-x-4">
      <div className="flex-1 text-left space-y-1">
        <h2 className="card-title text-xl">{title}</h2>
        <p className="text-shadow-amber-50">Up to {discount}</p>
        <button className="text-sm">{details}</button>
      </div>
      <div className="flex-1">
        <Image src={whiteBag} alt="Album" className="h-48 object-cover" />
      </div>
      </div>
    </div>
  );
}
