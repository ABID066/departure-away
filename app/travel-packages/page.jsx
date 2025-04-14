'use client'
import { Filter } from 'lucide-react'

import FilterSideber from '../../public/components/travel/FilterSideber'
import { OfferCard } from '../../public/components/travel/OfferCard'
import Pagination from '../../public/components/travel/Pagination'
import offers from '../../public/components/exclusive/DataOffer'
import { useState } from 'react'

const TravelPackagePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
 return (
     <div className="min-h-screen bg-white pt-32">
       <div className="max-w-6xl mx-auto">
         <div className="grid grid-cols-12 sm:gap-2 md:gap-6">
           <FilterSideber mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
           <main className={`md:col-span-9 col-span-12 transition-all duration-300 ${mobileOpen ? "hidden md:block" : "block px-4"}`}>
             <div className="flex justify-between mb-4">
               <div>
                 
                 <h1 className="sm:text-sm md:text-xl lg:text-2xl font-bold">Travel Package</h1>
                 <p className="text-sm text-gray-500">
                   {offers.length} Results Found
                 </p>
               </div>
 
               <select className="border-[1px] border-[#1E1E1E1A] rounded-lg px-6 h-10 text-sm text-[#8D8D8D]">
                 <option>Price low to high</option>
                 <option>Price high to low</option>
               </select>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
               {offers.map((offer) => (
                 <OfferCard key={offer.id} offer={offer} />
               ))}
             </div>
             <Pagination />
           </main>
         </div>
       </div>
     </div>
   );
}

export default TravelPackagePage