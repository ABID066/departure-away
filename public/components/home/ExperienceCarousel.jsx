// 'use client'

// import React, { useState } from 'react';

// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const experiences = [
//   {
//     title: "Under Sea",
//     tours: "24 Tours",
//     price: "From $359",
//     image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Hiking",
//     tours: "15 Tours",
//     price: "From $299",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
//   },
//   {
//     title: "Kayaking",
//     tours: "12 Tours",
//     price: "From $199",
//     image: "https://images.unsplash.com/photo-1526889576057-8de45c12a9fb"
//   },
//   {
//     title: "Surfing",
//     tours: "10 Tours",
//     price: "From $199",
//     image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f"
//   }
// ];

// export default function ExperienceCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slideLeft = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
//     );
//   };

//   const slideRight = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold text-center mb-12">Book Our Popular Experience</h2>

//       <div className="relative">
//         <div className="flex justify-center items-center gap-6 overflow-hidden">
//           <>
//             {[0, 1, 2, 3].map((offset) => {
//               const index = (currentIndex + offset) % experiences.length;
//               const experience = experiences[index];

//               return (
//                 <div
//                   key={index}

//                   className="relative rounded-full w-64 h-64 shrink-0"
//                 >
//                   <img
//                     src={experience.image}
//                     alt={experience.title}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-2xl mx-4 -mb-6 text-center shadow-lg">
//                     <h3 className="font-semibold text-lg">{experience.title}</h3>
//                     <p className="text-sm text-gray-600">{experience.tours}</p>
//                     <p className="text-sm font-medium text-blue-600">{experience.price}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </>
//         </div>

//         <button
//           onClick={slideLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>

//         <button
//           onClick={slideRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>

//         <div className="flex justify-center gap-2 mt-12">
//           {experiences.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-2 h-2 rounded-full ${
//                 index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// claude

"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const experiences = [
  {
    title: "Under Sea",
    tours: "24 Tours",
    price: "From $359",
    image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Hiking",
    tours: "15 Tours",
    price: "From $299",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  {
    title: "Kayaking",
    tours: "12 Tours",
    price: "From $199",
    image: "https://images.unsplash.com/photo-1526889576057-8de45c12a9fb",
  },
  {
    title: "Surfing",
    tours: "10 Tours",
    price: "From $199",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
  },
];

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Determine number of visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl  mx-auto px-4 py-8 md:py-12">
      

      <div className="relative">
        <div className="flex justify-center items-center gap-3 md:gap-6 overflow-hidden">
          {Array.from({ length: visibleCards }).map((_, offset) => {
            const index = (currentIndex + offset) % experiences.length;
            const experience = experiences[index];

            return (
              <div
                key={index}
                className="relative  rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 shrink-0"
              >
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute w-3/4 z-50  -bottom-4 left-1/2 -translate-x-1/2 bg-white    p-2 md:p-4 rounded   text-center shadow-3xl shadow-lg">
                  <h3 className="font-semibold text-sm md:text-lg">{experience.title}</h3>
                 <div className='flex items-center justify-center'>
                 <p className="text-xs md:text-sm text-gray-600">{experience.tours} -</p>
                 <p className="text-xs md:text-sm  ml-1">{experience.price}</p>
                 </div>
                </div>
             
                
              </div>
            );
          })}
        </div>

        <button
          onClick={slideLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg hover:bg-gray-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <button
          onClick={slideRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg hover:bg-gray-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-8 md:mt-12 overflow-x-auto pb-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-pink-500 w-6" : "bg-pink-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
