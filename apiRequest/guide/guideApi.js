const BASE_URL = 'https://royolex.vercel.app/api/v1';

// Fetch all guides with pagination
export const fetchGuides = async (page = 1, limit = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/guider/all-guider?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch guides');
    }

    const result = await response.json();

    if (result.success) {
      // Transform API data to match component's expected format
      const formattedGuides = result.data.map(guide => ({
        id: guide._id || guide.id,
        name: guide.name,
        location: guide.location || "Unknown",
        rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
        reviews: Math.floor(Math.random() * 100),
        experience: guide.experience || "5+ years",
        hourlyRate: guide.hourly_rate || 50,
        languages: guide.languages || ["English"],
        specialty: guide.specialty || ["Cultural Tours"],
        availability: guide.available || "Full-time",
        imageUrl: guide.imageUrl[0] || "/images/home/guide.jpg",
        description: guide.description || "",
        verified: guide.verified || true
      }));

      return {
        guides: formattedGuides,
        total: result.meta.total,
        totalPages: Math.ceil(result.meta.total / limit)
      };
    } else {
      throw new Error(result.message || 'Failed to fetch guides');
    }
  } catch (err) {
    console.error('Error fetching guides:', err);
    throw err;
  }
};

// Fetch guide details by ID
export const fetchGuideById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/guider/ById/${id}`);
    const data = await response.json();

    if (data.success) {
      // Add additional guide details
      const updatedData = {
        ...data.data,
        rating: (Math.random() * 5).toFixed(1),
        totalReviews: Math.floor(Math.random() * 1000),
        services: [
          "Cultural Tours",
          "Historical Sites",
          "Local Experiences",
          "Photography Tours",
          "Food Tours"
        ],
        certifications: [
          "Licensed Tour Guide",
          "First Aid Certified",
          "Language Proficiency"
        ],
        availability: {
          schedule: "Full-time",
          advance_booking: "2 weeks",
          preferred_group_size: "1-10 people"
        }
      };
      return updatedData;
    } else {
      throw new Error('Failed to load guide data.');
    }
  } catch (err) {
    console.error('Error fetching guide details:', err);
    throw err;
  }
};



