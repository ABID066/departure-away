"use client";

import { Star, MapPin, Heart, CalendarDays, Plane } from "lucide-react";
import React from "react";
import Link from "next/link";

const FlightOffersCard = ({ offer }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-sm">
            <Link href={`#`}>
                <div className="relative">
                    <img
                        src={offer.imageUrl || "/api/placeholder/400/320"}
                        alt={offer.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = "/api/placeholder/400/320";
                        }}
                    />
                    {offer.isPopular && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                            Popular
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{offer.location}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-left">{offer.title}</h3>

                    <div className="flex items-center mb-4">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-900">{offer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({offer.reviews} Reviews)</span>
                        <span className="text-sm text-gray-500 ml-2">
                            <Plane className="w-4 h-4" />
                        </span>
                        <span className="text-sm text-gray-500 ml-1">Flight</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">
                            Economy: <span className="text-base font-semibold text-gray-900">${offer.economicPrice}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Business: <span className="text-base font-semibold text-pink-600">${offer.businessPrice}</span>
                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                            <Heart size={20} className="text-gray-400 hover:text-pink-500" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FlightOffersCard;