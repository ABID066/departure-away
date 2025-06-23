const BASE_URL = "https://royolex.vercel.app/api/v1";
export const fetchFlightOffers = async (page = 1, limit = 9) => {
    try {
        const response = await fetch(`${BASE_URL}/flight/all-flight?page=${page}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch flight offers');
        }

        const data = await response.json();

        // Format the response to match our frontend needs
        const formattedOffers = data.data.map(flight => ({
            id: flight._id,
            title: flight.title,
            title1: flight.title1,
            description: flight.description,
            description1: flight.description1,
            location: flight.location,
            economicPrice: flight.economicPrice,
            businessPrice: flight.businessPrice,
            isPopular: flight.isPopular,
            rating: flight.rating || parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
            reviews: flight.totalReviews || Math.floor(Math.random() * 100), 
            imageUrl: flight.imageUrl || ['/images/packages/flight-placeholder.svg'],
            createdBy: flight.createdBy || {
                name: 'Flight Admin',
                image: '/images/packages/admin-placeholder.svg'
            },
            createdAt: flight.createdAt || new Date().toISOString(),
        }));

        return {
            offers: formattedOffers,
            total: data.meta.total,
            totalPages: Math.ceil(data.meta.total / limit)
        };
    } catch (error) {
        console.error('Error fetching flight offers:', error);
        throw new Error('Failed to fetch flight offers');
    }
};