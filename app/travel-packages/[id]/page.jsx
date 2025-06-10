"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, StarHalf, MapPin, Calendar, Users } from 'lucide-react'
import Image from 'next/image' 

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
        const response = await fetch(`https://royolex.vercel.app/api/v1/service/ById/${id}`)
        const data = await response.json()
        
        if (data.success) {
          // Add random rating and totalReviews to the data
          const updatedData = {
            ...data.data,
            rating: (Math.random() * 5).toFixed(1), // Random rating between 0 and 5
            totalReviews: Math.floor(Math.random() * 1000), // Random total reviews
            // Add package features based on pricing tiers
            packages: {
              basic: {
                features: [
                  "Accommodation in comfortable hostels",
                  "Guided tours of major cultural sites",
                  "Daily breakfast"
                ]
              },
              standard: {
                features: [
                  "Accommodation in boutique hotels",
                  "Enhanced guided tours with cultural expert",
                  "Daily breakfast and select meals",
                  "Transportation within location"
                ]
              },
              premium: {
                features: [
                  "Accommodation in luxury hotels",
                  "Private guided tours with renowned experts",
                  "All meals included",
                  "Private transportation throughout the tour",
                  "Exclusive cultural experiences"
                ]
              }
            }
          }
          setPackageData(updatedData)
        console.log(updatedData.media_urls[0])
        } else {
          setError('Failed to load package data.')
        }
      } catch (err) {
        setError('Error fetching data.')
      } finally {
        setLoading(false)
      }
    }

    fetchPackageData()
  }, [id])

  if (loading) return <p className="text-center">Loading...</p>
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

  if (loading) return <p className="text-center">Loading...</p>

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
              <p className="font-medium">{packageData.duration_days} Days</p>
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
                <span className="text-2xl font-bold">${packageData.price_basic}</span>
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
                <span className="text-2xl font-bold">${packageData.price_standard}</span>
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
                <span className="text-2xl font-bold">${packageData.price_premium}</span>
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