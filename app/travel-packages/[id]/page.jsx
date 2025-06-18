"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { Star, StarHalf, MapPin, Calendar, Users } from 'lucide-react'
// Import fetchTravelPackageById from travelApi
import { fetchTravelPackageById } from "../../../apiRequest/travel/travelApi";

// Skeleton Loading Component
const SkeletonLoader = () => {
  return (
      <div className="max-w-4xl mt-25 mx-auto bg-white animate-pulse">
        {/* Hero Image Skeleton */}
        <div className="w-full h-64 bg-gray-300 rounded-t-lg"></div>

        <div className="p-6">
          {/* Title and Rating Section Skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

            <div className="flex items-start gap-8">
              {/* Rating Skeleton */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-12 bg-gray-300 rounded"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>

              {/* Rating Breakdown Skeleton */}
              <div className="flex-1 max-w-xs">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
                      <div className="h-4 w-8 bg-gray-300 rounded"></div>
                    </div>
                ))}
              </div>
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded mt-2"></div>
            <div className="h-4 w-24 bg-gray-300 rounded mt-1"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>

          {/* Tour Details Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-300 rounded w-24"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Package Options Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-40 mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <div className="h-6 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="mb-4">
                      <div className="h-8 bg-gray-300 rounded w-16 inline-block"></div>
                      <div className="h-4 bg-gray-300 rounded w-20 inline-block ml-2"></div>
                    </div>
                    <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="space-y-2">
                      {[...Array(3 + i)].map((_, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <div className="h-4 w-4 bg-gray-300 rounded mt-0.5"></div>
                            <div className="h-4 bg-gray-300 rounded flex-1"></div>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

const TravelPackageDetails = () => {
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
        const data = await fetchTravelPackageById(id);
        setPackageData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPackageData();
  }, [id])

  // Show skeleton loading while data is being fetched
  if (loading) return <SkeletonLoader />
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!packageData) return <p className="text-center">No package data found.</p>

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

  return (
      <div className="max-w-4xl mt-25 mx-auto bg-white">
        {/* Hero Image */}
        <div className="w-full h-64 relative overflow-hidden">
          {packageData.imageUrl && packageData.imageUrl.length > 0 ? (
              <div className="w-full h-full relative">
                <img
                    src={packageData.imageUrl[0]}
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                />

                <div className="w-full h-full bg-gradient-to-r from-teal-400 to-blue-500" style={{display: 'none'}}>
                  <div className="absolute inset-0 bg-black bg-opacity-20">
                    <div className="w-full h-full bg-cover bg-center"
                         style={{backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}></div>
                  </div>
                </div>
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
              {packageData.createdBy ? `Sold by ${packageData.createdBy.name}` : 'Sold by Agency'}
            </p>
            <button className="text-sm text-blue-600 hover:underline mt-1">Contact Seller</button>
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
                <p className="font-medium">{packageData.duration} Days</p>
              </div>
            </div>
          </div>

          {/* Package Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">Package Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Package */}
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold">${packageData.price1}</span>
                  <span className="text-gray-500 text-sm ml-1">per person</span>
                </div>
                <button
                    className={`w-full py-2 px-4 rounded mb-4 ${selectedPackage === 'basic' ? 'bg-black text-white' : 'border border-gray-300'}`}
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
              <div className="border rounded-lg p-6 relative">
                <h3 className="font-semibold text-lg mb-2">Standard</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold">${packageData.price2}</span>
                  <span className="text-gray-500 text-sm ml-1">per person</span>
                </div>
                <button
                    className={`w-full py-2 px-4 rounded mb-4 ${selectedPackage === 'standard' ? 'bg-black text-white' : 'border border-gray-300'}`}
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
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Premium</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold">${parseInt(packageData.price2) + 500}</span>
                  <span className="text-gray-500 text-sm ml-1">per person</span>
                </div>
                <button
                    className={`w-full py-2 px-4 rounded mb-4 ${selectedPackage === 'premium' ? 'bg-black text-white' : 'border border-gray-300'}`}
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

export default TravelPackageDetails