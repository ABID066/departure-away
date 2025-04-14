import Image from "next/image";
import React from "react";
import exclusiveImg from "@/public/images/home/exclusive.jpg";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import Link from "next/link";

export default function ExclusiveOfferCard({ offer }) {
  const { title, location, rating, reviews, duration, price, popular } = offer;
  return (
    <div className="card bg-base-100 rounded-lg shadow-lg mx-auto">
      <Link href="#">
        <figure className="relative">
          <Image src={exclusiveImg} alt="Shoes" className="rounded-t-lg" />
        </figure>
        {popular && (
          <div className=" absolute bottom-45 left-4 badge badge-secondary">
            Popular
          </div>
        )}
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
              From <span className="text-red-500 font-semibold">{price}</span>{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
