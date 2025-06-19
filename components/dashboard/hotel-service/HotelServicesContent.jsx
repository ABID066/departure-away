"use client"

import { useState, useEffect } from 'react';
import { Plus, Loader2, AlertCircle, Star, Pencil, Trash2 } from 'lucide-react';
import HotelServiceEditForm from './HotelServiceEditForm';
import HotelServicesDeleteModal from './HotelServicesDeleteModal';
import { useRouter } from 'next/navigation';

export default function HotelServicesContent({ setCurrentPage }) {
    const [hotelServices, setHotelServices] = useState([]);
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
                    fetchHotelServices(user._id || user.id);
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

    const fetchHotelServices = async (id) => {
        if (!id) {
            setLoading(false);
            setError("User ID not found. Please log in again.");
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/hotel/user/hotel/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch hotel services');
            }

            setHotelServices(result.data || []);
        } catch (error) {
            console.error("Error fetching hotel services:", error);
            setError(error.message || "Failed to load hotel services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const handleCreateNew = () => {
        router.push('/dashboard/hotel-service/create');
    };

    const handleEditClick = async (serviceId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/hotel/ById/${serviceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch hotel service details');
            }

            setSelectedService(result.data);
            setIsEditing(true);
        } catch (error) {
            console.error("Error fetching hotel service details:", error);
            setError(error.message || "Failed to load hotel service details. Please try again.");
        }
    };

    const handleDeleteClick = (serviceId) => {
        setDeleteId(serviceId);
        setIsDeleting(true);
    };

    const handleServiceUpdated = (updatedService) => {
        setHotelServices(hotelServices.map(service =>
            service._id === updatedService._id ? updatedService : service
        ));
        setIsEditing(false);
    };

    const handleServiceDeleted = (deletedId) => {
        setHotelServices(hotelServices.filter(service => service._id !== deletedId));
        setIsDeleting(false);
    };

    const canCreateService = userRole === 'freelancer' || userRole === 'agency';

    if (isEditing && selectedService) {
        return (
            <HotelServiceEditForm
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
                <h2 className="text-xl font-semibold">My Hotel Services</h2>
                {canCreateService && (
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer hover:bg-orange-600 transition-colors"
                    >
                        <Plus size={16} className="mr-2" />
                        Create New Hotel Service
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-start">
                    <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {isDeleting && (
                <HotelServicesDeleteModal
                    serviceId={deleteId}
                    onCancel={() => setIsDeleting(false)}
                    onConfirm={handleServiceDeleted}
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 size={24} className="animate-spin text-orange-500" />
                </div>
            ) : hotelServices.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {canCreateService ? "No Hotel Services Found" : "Hotel Service Creation Restricted"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {canCreateService
                            ? "You haven't created any hotel services yet."
                            : "Only freelancers and agencies can create and manage hotel services."}
                    </p>
                    {canCreateService && (
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                            <Plus size={16} className="mr-2" />
                            Create Your First Hotel Service
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {hotelServices.map((service) => (
                                    <tr key={service._id || service.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                            <div className="text-sm text-gray-500">{service.title1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {service.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${service.basicPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${service.standardPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                service.isPopular
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {service.isPopular ? 'Popular' : 'Regular'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 mr-3 inline-flex items-center cursor-pointer"
                                                onClick={() => handleEditClick(service._id || service.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700 inline-flex items-center cursor-pointer"
                                                onClick={() => handleDeleteClick(service._id || service.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-4">
                        {hotelServices.map((service) => (
                            <div key={service._id || service.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                                        <p className="text-sm text-gray-500">{service.title1}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        service.isPopular
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {service.isPopular ? 'Popular' : 'Regular'}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Location:</span> {service.location}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Basic Price</div>
                                        <div className="font-semibold">${service.basicPrice}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Standard Price</div>
                                        <div className="font-semibold">${service.standardPrice}</div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                                    <button
                                        className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEditClick(service._id || service.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteClick(service._id || service.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}