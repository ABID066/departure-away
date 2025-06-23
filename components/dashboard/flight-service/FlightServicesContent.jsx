import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import FlightServiceEditForm from './FlightServiceEditForm';
import FlightServiceDeleteModal from './FlightServiceDeleteModal';
import { useRouter } from 'next/navigation';

export default function FlightServicesContent({ setCurrentPage }) {
    const [flightServices, setFlightServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                setUserRole(user.role);
                setUserId(user._id || user.id);

                if (user.role === 'freelancer' || user.role === 'agency') {
                    fetchFlightServices(user._id || user.id);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError("User data not found. Please log in again.");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            setError("Unable to retrieve user data. Please log in again.");
            setLoading(false);
        }
    }, []);

    const fetchFlightServices = async (id) => {
        if (!id) {
            setLoading(false);
            setError("User ID not found. Please log in again.");
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/flight/user/flight/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch flight services');
            }

            setFlightServices(result.data || []);
        } catch (error) {
            console.error("Error fetching flight services:", error);
            setError(error.message || "Failed to load flight services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const handleCreateNew = () => {
        router.push('/dashboard/flight-service/create');
    };

    const handleEditClick = async (serviceId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/flight/ById/${serviceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch flight service details');
            }

            setSelectedService(result.data);
            setIsEditing(true);
        } catch (error) {
            console.error("Error fetching flight service details:", error);
            setError(error.message || "Failed to load flight service details. Please try again.");
        }
    };

    const handleDeleteClick = (serviceId) => {
        setDeleteId(serviceId);
        setIsDeleting(true);
    };

    const handleServiceUpdated = (updatedService) => {
        setFlightServices(flightServices.map(service =>
            service._id === updatedService._id ? updatedService : service
        ));
        setIsEditing(false);
    };

    const handleServiceDeleted = (deletedId) => {
        setFlightServices(flightServices.filter(service => service._id !== deletedId));
        setIsDeleting(false);
    };

    const canCreateService = userRole === 'freelancer' || userRole === 'agency';

    if (isEditing && selectedService) {
        return (
            <FlightServiceEditForm
                service={selectedService}
                userId={userId}
                onCancel={() => setIsEditing(false)}
                onUpdate={handleServiceUpdated}
            />
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">My Flight Services</h2>
                {canCreateService && (
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
                    >
                        <Plus size={16} className="mr-2" />
                        Create New Flight Service
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {isDeleting && (
                <FlightServiceDeleteModal
                    serviceId={deleteId}
                    onCancel={() => setIsDeleting(false)}
                    onConfirm={handleServiceDeleted}
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : flightServices.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {canCreateService ? "No Flight Services Found" : "Flight Service Creation Restricted"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {canCreateService
                            ? "You haven't created any flight services yet."
                            : "Only freelancers and agencies can create and manage flight services."}
                    </p>
                    {canCreateService && (
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md"
                        >
                            <Plus size={16} className="mr-2" />
                            Create Your First Flight Service
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Economic Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {flightServices.map((service) => (
                                <tr key={service._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${service.economicPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${service.businessPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.isPopular ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {service.isPopular ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(service._id)}
                                            className="text-orange-600 hover:text-orange-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(service._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}