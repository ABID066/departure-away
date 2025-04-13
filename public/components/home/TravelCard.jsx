import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import React from "react";
import Image from "next/image";
import vacation from "@/public/images/vacation.jpg";

export default function TravelCard({ item }) {
  console.log(item);
  const { title, price, location, rating, reviews, duration, popular } = item;
  return (
    <div className="card bg-base-100 rounded-lg shadow-lg mx-auto">
      <figure className="relative">
        <Image src={vacation} alt="Shoes" className="rounded-t-lg" />
      </figure>
      {popular && <div className=" absolute bottom-45 left-4 badge badge-secondary">Popular</div>}
      <div className="card-body">
        <div className="p-4 text-left space-y-2">
          <div className="flex items-center space-x-2">
            <span>
              <CiLocationOn />
            </span>
            <p>{location}</p>
          </div>
          <h2 className="card-title font-semibold">{title}</h2>
          <div className="flex space-x-2 text-sm">
            <p>
              <span className="text-yellow-500">★</span> {rating}
            </p>
            <p className="text-sm">{reviews} Reviews</p>
            <span className="text-xl">
              <CiCalendarDate />
            </span>
            <p className="text-sm">{duration}</p>
          </div>
          <p>
            From <span className="text-red-500 font-semibold">${price}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
