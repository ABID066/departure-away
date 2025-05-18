import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import React from "react";
import Image from "next/image";
import vacation from "@/public/images/vacation.jpg";
import Link from "next/link";

export default function TravelCard({ item }) {
  console.log(item);
  const { title, price, location, rating, reviews, duration, popular } = item;
  return (
    <div className="card bg-base-100 rounded-lg shadow-lg mx-auto relative">
      <Link href="#">
        {/* Image Section */}
        <figure className="relative">
          <Image src={vacation} alt="Shoes" className="rounded-t-lg" />
        </figure>

        {/* Card Body Section */}
        <div className="card-body relative">
          {/* Badge Section */}
          {popular && (
            <div className="absolute -top-2 left-8 badge badge-secondary">
              Popular
            </div>
          )}
          <div className="p-4 text-left space-y-2">
            {/* Location Section */}
            <div className="flex items-center space-x-2">
              <span>
                <CiLocationOn />
              </span>
              <p>{location}</p>
            </div>
            {/* Title Section */}
            <h2 className="card-title font-semibold">{title}</h2>
            {/* Details Section */}
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <p>{rating}</p>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-sm">{reviews} Reviews</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl">
                  <CiCalendarDate />
                </span>
                <p className="text-sm">{duration} D</p>
              </div>
            </div>
            {/* Price Section */}
            <p>
              From <span className="text-red-500 font-semibold">${price}</span>{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
