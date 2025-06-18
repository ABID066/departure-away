const BASE_URL = 'https://royolex.vercel.app/api/v1';

// Fetch exclusive offers
export const fetchExclusiveOffers = async (limit = 8) => {
  try {
    const response = await fetch(`${BASE_URL}/service/-all-service?limit=${limit}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch offers");
    }

    const result = await response.json();
    return result.data.map(service => ({
      id: service._id || service.id,
      title: service.title,
      location: service.location || "Unknown",
      rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
      reviews: Math.floor(Math.random() * 100),
      duration: service.duration_days ? `${service.duration_days} Days` : "Flexible",
      price: `$${service.price_basic}`,
      popular: Math.random() > 0.5,
      imageUrl: service.media_urls || "@/public/images/home/exclusive.jpg"
    }));
  } catch (error) {
    throw error;
  }
};

// Fetch top guides
export const fetchTopGuides = async (limit = 8, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/guider/all-guider?limit=${limit}&page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch guides');
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error(result.message || 'Failed to fetch guides');
    }

    return result.data.map(guider => ({
      id: guider._id,
      name: guider.name,
      bio: guider.bio || "",
      location: guider.location || "Unknown",
      experience: guider.experience || "1 year",
      specialty: guider.specialty || "general",
      hourlyRate: guider.hourlyRate || 0,
      dailyRate: guider.dailyRate || 0,
      rating: guider.rating > 0 ? guider.rating : parseFloat((Math.random() * (5 - 4.5) + 4.5).toFixed(1)),
      reviews: guider.totalReviews > 0 ? guider.totalReviews : Math.floor(Math.random() * 150) + 50,
      imageUrl: (guider.imageUrl && guider.imageUrl[0]) || "/api/placeholder/400/320",
      languages: guider.languages || [],
      isVerified: guider.isVerified || false,
      available: guider.available || false,
      contactInfo: guider.contactInfo || "",
      creatorType: guider.creatorType,
      createdAt: guider.createdAt,
      experienceYears: parseInt(guider.experience) || 1,
      languageList: Array.isArray(guider.languages) ? guider.languages.join(", ") : "",
    }));
  } catch (error) {
    throw error;
  }
};

// Fetch travel packages
export const fetchTravelPackages = async (filterKey = 'forYou', limit = 8, page = 1) => {
  const filterOptions = {
    forYou: `${BASE_URL}/Tour/all-tour?limit=${limit}&page=${page}`,
    hajj: `${BASE_URL}/Tour/all-tour?limit=${limit}&page=${page}&searchTerm=hajj`,
    alpine: `${BASE_URL}/Tour/all-tour?limit=${limit}&page=${page}&searchTerm=alpine`
  };

  try {
    const response = await fetch(filterOptions[filterKey]);

    if (!response.ok) {
      throw new Error('Failed to fetch travel packages');
    }

    const result = await response.json();

    if (!result || !Array.isArray(result.data)) {
      throw new Error('Invalid response format');
    }

    return result.data.map(tour => ({
      id: tour._id,
      title: tour.title,
      location: tour.location || "Unknown",
      rating: tour.rating || parseFloat((Math.random() * (5 - 4.5) + 4.5).toFixed(1)),
      reviews: tour.totalReviews || Math.floor(Math.random() * 150) + 50,
      duration: `${tour.duration} Days`,
      price: `$${tour.price1}`,
      popular: tour.isPopular || Math.random() > 0.7,
      imageUrl: (tour.imageUrl && tour.imageUrl[0]) || "/api/placeholder/400/320",
      category: tour.category || "tour",
      price1: parseInt(tour.price1) || 0,
      price2: parseInt(tour.price2) || 0,
      duration_days: parseInt(tour.duration) || 1,
      description: tour.description || "",
      creatorType: tour.creatorType,
      createdAt: tour.createdAt
    }));
  } catch (error) {
    throw error;
  }
};