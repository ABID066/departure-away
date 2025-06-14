"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, StarHalf, MapPin, Calendar, Users } from 'lucide-react'
import Image from 'next/image' 

import { fetchExclusiveOfferById } from '@/apiRequest/exclusive/exclusiveApi';

// Skeleton Components
const HeroImageSkeleton = () => (
  <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
)

const TitleSkeleton = () => (
  <div className="mb-6">
    <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-4 w-3/4"></div>
    
    <div className="flex items-start gap-8">
      {/* Rating Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
      </div>

      {/* Rating Bars Skeleton */}
      <div className="flex-1 max-w-xs">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
            <div className="flex-1 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
            <div className="h-4 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mt-2"></div>
    <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mt-1"></div>
  </div>
)

const DescriptionSkeleton = () => (
  <div className="mb-6">
    <div className="space-y-2">
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-full"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-5/6"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-4/5"></div>
    </div>
  </div>
)

const TourDetailsSkeleton = () => (
  <div className="mb-8">
    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-4 w-32"></div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-2 w-20"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-28"></div>
      </div>
      <div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-2 w-20"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-20"></div>
      </div>
    </div>
  </div>
)

const PackageCardSkeleton = () => (
  <div className="border rounded-lg p-6 animate-pulse">
    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-2 w-20"></div>
    <div className="mb-4">
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-24 inline-block"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-20 inline-block ml-2"></div>
    </div>
    <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-4"></div>
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full mt-0.5"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md flex-1"></div>
        </div>
      ))}
    </div>
  </div>
)

const PackageOptionsSkeleton = () => (
  <div className="mb-8">
    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md mb-6 w-40"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  </div>
)

const FullPageSkeleton = () => (
  <div className="max-w-4xl mt-25 mx-auto bg-white">
    {/* Add custom shimmer animation styles */}
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>

    <HeroImageSkeleton />
    <div className="p-6">
      <TitleSkeleton />
      <DescriptionSkeleton />
      <TourDetailsSkeleton />
      <PackageOptionsSkeleton />
    </div>
  </div>
)

export default function Page() {
  const params = useParams()
  const id = params.id
  
  // State to store the API response
  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState('standard')


  useEffect(() => {
    if (!id) return // If there's no id yet, skip the API call

    // Fetch data from API
    const fetchPackageData = async () => {
      try {
        const updatedData = await fetchExclusiveOfferById(id);
        setPackageData(updatedData);
        console.log(updatedData.media_urls[0]);
      } catch (err) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id])

  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={16} className="fill-yellow-400 text-yellow-400" />)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />)
    }
    
    return stars
  }

  // Render rating bars
  const renderRatingBars = () => {
    const ratings = [
      { stars: 5, percentage: 40 },
      { stars: 4, percentage: 35 },
      { stars: 3, percentage: 15 },
      { stars: 2, percentage: 7 },
      { stars: 1, percentage: 3 }
    ]

    return ratings.map((rating) => (
      <div key={rating.stars} className="flex items-center gap-2 mb-1">
        <span className="text-sm text-gray-600 w-4">{rating.stars}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${rating.percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 w-8">{rating.percentage}%</span>
      </div>
    ))
  }

  // Show skeleton while loading
  if (loading) return <FullPageSkeleton />

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mt-25 mx-auto bg-white p-6">
        <div className="text-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to Load Package</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No data state
  if (!packageData) {
    return (
      <div className="max-w-4xl mt-25 mx-auto bg-white p-6">
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Package Not Found</h3>
            <p className="text-gray-600">The package you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mt-25 mx-auto bg-white">
      {/* Hero Image */}
      <div className="w-full h-64 relative overflow-hidden">
        {packageData.media_urls && packageData.media_urls.length > 0 ? (
          <div className="w-full h-full relative">
            <img 
              src={packageData.media_urls[0]} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-400 to-blue-500 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="w-full h-full bg-cover bg-center" 
                   style={{backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Title and Rating Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{packageData.title}</h1>
          
          <div className="flex items-start gap-8">
            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">{packageData.rating}</span>
                <div className="flex">
                  {renderStars(packageData.rating)}
                </div>
              </div>
              <p className="text-sm text-gray-600">{packageData.totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 max-w-xs">
              {renderRatingBars()}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {packageData.provider_id ? `Sold by ${packageData.provider_id.name}` : 'Sold by Agency'}
          </p>
          <button className="text-sm text-blue-600 hover:underline mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Contact Seller</button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
        </div>

        {/* Tour Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Location</span>
              <p className="font-medium">{packageData.location}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Duration</span>
              <p className="font-medium">{packageData.duration_days} Days</p>
            </div>
          </div>
        </div>

        {/* Package Options */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Package Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Package */}
            <div className="border rounded-lg p-6 transition-all duration-200 hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Basic</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold">${packageData.price_basic}</span>
                <span className="text-gray-500 text-sm ml-1">per person</span>
              </div>
              <button 
                className={`w-full py-2 px-4 rounded mb-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedPackage === 'basic' 
                    ? 'bg-black text-white focus:ring-gray-500' 
                    : 'border border-gray-300 hover:border-gray-400 focus:ring-gray-300'
                }`}
                onClick={() => setSelectedPackage('basic')}
              >
                {selectedPackage === 'basic' ? 'Selected' : 'Select'}
              </button>
              <ul className="space-y-2">
                {packageData.packages.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Standard Package */}
            <div className="border rounded-lg p-6 relative transition-all duration-200 hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Standard</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold">${packageData.price_standard}</span>
                <span className="text-gray-500 text-sm ml-1">per person</span>
              </div>
              <button 
                className={`w-full py-2 px-4 rounded mb-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedPackage === 'standard' 
                    ? 'bg-black text-white focus:ring-gray-500' 
                    : 'border border-gray-300 hover:border-gray-400 focus:ring-gray-300'
                }`}
                onClick={() => setSelectedPackage('standard')}
              >
                {selectedPackage === 'standard' ? 'Selected' : 'Select'}
              </button>
              <ul className="space-y-2">
                {packageData.packages.standard.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Package */}
            <div className="border rounded-lg p-6 transition-all duration-200 hover:shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Premium</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold">${packageData.price_premium}</span>
                <span className="text-gray-500 text-sm ml-1">per person</span>
              </div>
              <button 
                className={`w-full py-2 px-4 rounded mb-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedPackage === 'premium' 
                    ? 'bg-black text-white focus:ring-gray-500' 
                    : 'border border-gray-300 hover:border-gray-400 focus:ring-gray-300'
                }`}
                onClick={() => setSelectedPackage('premium')}
              >
                {selectedPackage === 'premium' ? 'Selected' : 'Select'}
              </button>
              <ul className="space-y-2">
                {packageData.packages.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}