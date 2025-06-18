const BASE_URL = 'https://royolex.vercel.app/api/v1';

// Fetch all travel offers with pagination
export const fetchTravelOffers = async (page = 1, limit = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/Tour/all-tour?limit=${limit}&page=${page}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch travel offers');
    }

    const result = await response.json();

    if (result && Array.isArray(result.data)) {
      // Transform API data to match component's expected format
      const formattedOffers = result.data.map(tour => ({
        id: tour._id,
        title: tour.title,
        location: tour.location || "Unknown",
        rating: tour.rating || parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
        reviews: tour.totalReviews || Math.floor(Math.random() * 100),
        duration: `${tour.duration} Days`,
        price: `$${tour.price1}`,
        popular: tour.isPopular || false,
        imageUrl: (tour.imageUrl && tour.imageUrl[0]) || "/images/home/exclusive.jpg",
        category: tour.category || "family",
        price1: parseInt(tour.price1) || 0,
        price2: parseInt(tour.price2) || 0,
        duration_days: parseInt(tour.duration) || 1,
        description: tour.description || "",
        creatorType: tour.creatorType,
        createdAt: tour.createdAt
      }));

      return {
        offers: formattedOffers,
        total: result.meta?.total || formattedOffers.length,
        totalPages: Math.ceil((result.meta?.total || formattedOffers.length) / limit)
      };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (err) {
    console.error('Error fetching travel offers:', err);
    throw err;
  }
};

// Fetch travel package details by ID
export const fetchTravelPackageById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Tour/ById/${id}`);
    const data = await response.json();

    if (data.success) {
      // Add package features based on pricing tiers
      const updatedData = {
        ...data.data,
        rating: data.data.rating || (Math.random() * 5).toFixed(1),
        totalReviews: data.data.totalReviews || Math.floor(Math.random() * 1000),
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
    console.error('Error fetching package details:', err);
    throw err;
  }
};