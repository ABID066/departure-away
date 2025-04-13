import React from "react";
import PackagesCard from "./PackagesCard";
import { MdFlightTakeoff } from "react-icons/md";
import {
  FaAddressBook,
  FaAngleDown,
  FaCar,
  FaHotel,
  FaPeopleGroup,
} from "react-icons/fa6";
import { GiLightBackpack } from "react-icons/gi";
import { IoBagRemove, IoCalendarNumberSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

export default function Packages() {
  const packages = [
    {
      id: 1,
      img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
      title: "Beach Paradise",
      details: "View Details",
      discount: "20% Off",
    },
    {
      id: 2,
      img: "https://img.daisyui.com/images/stock/photo-1635805882085-cb31a5e1bb2b.webp",
      title: "Mountain Retreat",
      details: "View Details",
      discount: "15% Off",
    },
    {
      id: 3,
      img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
      title: "City Lights",
      details: "View Details",
      discount: "10% Off",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto mb-20 px-4">
      <div className="relative -top-20 bg-white p-6 rounded-lg shadow-lg w-3/5 mx-auto">
        <div
          id="container"
          className="hidden lg:flex flex-col md:flex-row justify-between items-center mb-4"
        >
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <MdFlightTakeoff />
            </span>
            Flight
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <FaHotel />
            </span>
            Hotel
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <GiLightBackpack />
            </span>
            Tour
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <FaCar />
            </span>
            Car
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <FaAddressBook />
            </span>
            Visa
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <FaPeopleGroup />
            </span>
            Guider
          </p>
          <p className="flex items-center justify-center">
            <span className="mr-2">
              <IoBagRemove />
            </span>
            Lost Bag
          </p>
        </div>
        <div
          className="flex flex-col md:flex-row items-center justify-center"
        >
          <div className="flex items-center mb-4">
            <div className="text-xl rounded-full bg-red-50 p-4 mr-4">
              <CiLocationOn />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Location</p>
                <span>
                  <FaAngleDown />
                </span>
              </div>
              <p className="text-sm">Where are you going?</p>
            </div>
          </div>
          <div className="divider md:divider-horizontal py-2"></div>
          <div className="flex items-center mb-4">
            <div className="text-xl rounded-full bg-red-50 p-4 mr-4">
              <IoCalendarNumberSharp />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Date</p>
                <span>
                  <FaAngleDown />
                </span>
              </div>
              <p className="text-sm">Choose a date</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-8">
        {packages.map((item) => (
          <PackagesCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
