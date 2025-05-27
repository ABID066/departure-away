"use client";

import { Star, MapPin, CheckCircle, Clock, Languages, DollarSign } from "lucide-react";
import React from "react";

const GuiderOfferCard = ({ guide }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <a href="#" className="block">
                <div className="relative">
                    <img
                        src={guide.imageUrl || "/api/placeholder/400/320"}
                        alt={`Guide ${guide.name}`}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                            e.target.src = "/api/placeholder/400/320";
                        }}
                    />
                    {/* Verification badge
                    {guide.isVerified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle size={16} />
                        </div>
                    )}*/}
                    {/* Availability badge
                    {guide.available && (
                        <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Available
                        </div>
                    )} */}
                </div>

                <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{guide.name}</h3>

                    {/* Location */}
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>{guide.location}</span>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-2">
                        <div className="text-yellow-500">
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span className="text-sm ml-1 font-medium">{guide.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({guide.reviews} Reviews)</span>
                    </div>

                    {/* Experience and Specialty
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <span>{guide.experience} experience</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{guide.specialty}</span>
                    </div> */}

                    {/* Languages
                    {guide.languages && guide.languages.length > 0 && (
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                            <Languages size={14} className="mr-1" />
                            <span>{guide.languages.slice(0, 2).join(", ")}
                                {guide.languages.length > 2 && ` +${guide.languages.length - 2} more`}
                            </span>
                        </div>
                    )}*/}

                    {/* Pricing */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="text-sm">
                            <div className="flex items-center text-gray-900 font-semibold">

                                From<span className="text-pink-600 ml-1">${guide.hourlyRate}/hr</span>
                            </div>

                        </div>

                        {/* Quick action button
                        <button className="px-3 py-1 bg-pink-500 text-white text-xs rounded-md hover:bg-pink-600 transition-colors">
                            Contact
                        </button>*/}
                    </div>
                </div>
            </a>
        </div>
    );
};

export default GuiderOfferCard;