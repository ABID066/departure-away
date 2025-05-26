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
                    {/* Popular badge */}
                    {offer.popular && (
                        <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                        </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full capitalize">
                        {offer.category}
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{offer.location}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{offer.title}</h3>

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
                            {offer.price2 && offer.price2 !== offer.price1 && (
                                <div className="text-sm text-gray-500">
                                    Up to <span className="text-pink-500">${offer.price2}</span>
                                </div>
                            )}
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