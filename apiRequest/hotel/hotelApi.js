const BASE_URL = "https://royolex.vercel.app/api/v1";

export const fetchHotelOffers = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/hotel/all-hotel?limit=${limit}&page=${page}`);
        if (!response.ok) {
            throw new Error("Failed to fetch hotel offers");
        }
        const result = await response.json();
        const formattedOffers = result.data.map((hotel) => ({
            id: hotel._id,
            title: hotel.title,
            location: hotel.location,
            rating: hotel.rating || parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
            reviews: hotel.totalReviews || Math.floor(Math.random() * 100), 
            totalReviews: hotel.totalReviews,
            price: hotel.standardPrice,
            imageUrl: hotel.imageUrl[0],
        }));
        return {
            formattedOffers,
            total: result.meta?.total,
            totalPages: Math.ceil(result.meta?.total / limit),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
