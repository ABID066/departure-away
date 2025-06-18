const BASE_URL = 'https://royolex.vercel.app/api/v1';

// Fetch all exclusive offers with pagination
export const fetchExclusiveOffers = async (page = 1, limit = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/service/-all-service?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch offers');
    }

    const result = await response.json();

    if (result.success) {
      // Transform API data to match component's expected format
      const formattedOffers = result.data.map(service => ({
        id: service._id || service.id,
        title: service.title,
        location: service.location || "Unknown",
        rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
        reviews: Math.floor(Math.random() * 100),
        duration: service.duration_days ? `${service.duration_days} Days` : "Flexible",
        price: `$${service.price_basic}`,
        popular: Math.random() > 0.5,
        imageUrl: service.media_urls || "/images/home/exclusive.jpg",
        category: service.category || "tour",
        price_basic: service.price_basic,
        price_standard: service.price_standard,
        price_premium: service.price_premium,
        duration_days: service.duration_days,
        description: service.description
      }));

      return {
        offers: formattedOffers,
        total: result.meta.total,
        totalPages: Math.ceil(result.meta.total / limit)
      };
    } else {
      throw new Error(result.message || 'Failed to fetch offers');
    }
  } catch (err) {
    console.error('Error fetching offers:', err);
    throw err;
  }
};

// Fetch exclusive offer details by ID
export const fetchExclusiveOfferById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/service/ById/${id}`);
    const data = await response.json();

    if (data.success) {
      // Add package features based on pricing tiers
      const updatedData = {
        ...data.data,
        rating: (Math.random() * 5).toFixed(1),
        totalReviews: Math.floor(Math.random() * 1000),
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
      };
      return updatedData;
    } else {
      throw new Error('Failed to load package data.');
    }
  } catch (err) {
    console.error('Error fetching offer details:', err);
    throw err;
  }
};