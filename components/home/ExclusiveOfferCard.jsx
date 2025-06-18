import React from "react";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import Link from "next/link";

export default function ExclusiveOfferCard({ offer }) {
  // Destructure the offer object to extract necessary properties
  const { title, location, rating, reviews, duration, price, popular, imageUrl, id } = offer;

  return (
      <div className="card bg-base-100 rounded-lg shadow-lg mx-auto">
        {/* Link wrapping the card */}
        <Link href={`/exclusive-offers/${id}`}>
          {/* Image Section - Using regular img tag for external URLs */}
          <figure className="relative h-48 w-full overflow-hidden">
            <img
                src={imageUrl}
                alt={title}
                className="rounded-t-lg object-cover w-full h-full"
            />
          </figure>

          {/* Card Body Section */}
          <div className="card-body relative">
            {/* Badge Section */}
            {popular && (
                <div className="absolute -top-4 left-4 badge bg-pink-500 text-white rounded-full px-3 text-sm py-1 badge-secondary">
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
                <div className="flex items-center mr-1 space-x-1">
                  <span className="text-yellow-500">★</span>
                  <p>{rating}</p>
                </div>
                <div className="flex items-center mr-1 space-x-1">
                  <p className="text-sm">{reviews}</p>
                  <span>Reviews</span>
                </div>
                <div className="flex items-center mr-1 space-x-1">
                <span className="text-xl">
                  <CiCalendarDate />
                </span>
                  <p className="text-sm">{duration}</p>
                </div>
              </div>
              {/* Price Section */}
              <p>
                From <span className="text-red-500 font-semibold">{price}</span>{" "}
              </p>
            </div>
          </div>
        </Link>
      </div>
  );
}