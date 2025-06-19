"use client";

import { Star, MapPin, Heart, Wifi, Waves, Sparkles, UtensilsCrossed } from "lucide-react";
import React from "react";
import Link from "next/link";

const HotelOfferCard = ({ offer }) => {
    const {
        id,
        name,
        location,
        description,
        price,
        rating,
        reviews,
        image,
        amenities = []
    } = offer;

    const getAmenityIcon = (amenity) => {
        switch (amenity.toLowerCase()) {
            case 'wifi':
                return <Wifi size={14} className="text-gray-500" />;
            case 'pool':
                return <Waves size={14} className="text-blue-500" />;
            case 'spa':
                return <Sparkles size={14} className="text-purple-500" />;
            case 'restaurant':
                return <UtensilsCrossed size={14} className="text-orange-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-sm">
            <Link href={`#`}>
                <div className="relative">
                    <img
                        src={offer.imageUrl || "/api/placeholder/400/320"}
                        alt={name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = "/api/placeholder/400/320";
                        }}
                    />
                </div>

                <div className="p-4">
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{location}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-left">{name}</h3>

                    <div className="flex items-center mb-4">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-900">{rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({reviews} Reviews)</span>
                        <div className="flex items-center ml-auto gap-1">
                            {amenities.slice(0, 3).map((amenity, index) => (
                                <div key={index} className="tooltip" data-tip={amenity}>
                                    {getAmenityIcon(amenity)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-gray-900">
                            From <span className="text-pink-600">${price}</span>
                            <span className="text-sm text-gray-500 ml-1">/night</span>
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

export default HotelOfferCard;