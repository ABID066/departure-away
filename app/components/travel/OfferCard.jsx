'useclient'
import { CalendarDays, Heart, MapPin, Star } from 'lucide-react'
import React from 'react'
// import offers from"../exclusive/DataOffer"

export const OfferCard = ({offer}) => {
  return (
         
         
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Image */}
                <div className="relative">
                  <img
                    src={offer.image} // Replace with your image path
                    alt="Rare Lakefront Shipping"
                    className="h-48 w-full object-cover"
                  />
                <span className="absolute top-44 left-3  bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>  
                </div>

                {/* Content */}
                
                
                
                <div className=" p-4 space-y-2">
                
                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Inglis Manilaba, Canada</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold">
                    Rare Lakefront Shipping
                  </h3>

                  {/* Reviews & Days */}
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>4.7 (200 Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>5 Days</span>
                    </div>
                  </div>

                  {/* Price & Heart */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">
                      From <span className="text-pink-600 font-bold">$599</span>
                    </span>
                    <Heart className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
                  </div>
                </div>
              </div>
           
          
    
  )
}
