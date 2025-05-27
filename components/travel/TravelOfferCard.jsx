"use client";

import {Star, MapPin, Heart, CalendarDays, Badge} from "lucide-react";
import React from "react";

const TravelOfferCard = ({ offer }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-sm">
            <a href="#" className="block">
                <div className="relative">
                    <img
                        src={offer.imageUrl || "/api/placeholder/400/320"}
                        alt={offer.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = "/api/placeholder/400/320";
                        }}
                    />

                </div>

                <div className="p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{offer.location}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2  text-left">{offer.title}</h3>

                    <div className="flex items-center mb-4">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-900">{offer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({offer.reviews} Reviews)</span>
                        <span className="text-sm text-gray-500 ml-2">
                            <CalendarDays className="w-4 h-4" />
                        </span>
                        <span className="text-sm text-gray-500 ml-1">{offer.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-gray-900">
                            From <span className="text-pink-600">{offer.price}</span>

                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                            <Heart size={20} className="text-gray-400 hover:text-pink-500" />
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default TravelOfferCard;