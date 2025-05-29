"use client"

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ServiceEditForm from './ServiceEditForm';
import ServiceDeleteModal from './ServiceDeleteModal';
import { useRouter } from 'next/navigation';

export default function ServicesView({ setCurrentPage }) {
    const [services, setServices] = useState([]);
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
                setUserId(user.id);

                if (user.role === 'freelancer' || user.role === 'agency') {
                    fetchServices(user.id);
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

    const fetchServices = async (id) => {
        if (!id) {
            setLoading(false);
            setError("User ID not found. Please log in again.");
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/service/user/service/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch services');
            }

            setServices(result.data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
            setError(error.message || "Failed to load services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const handleCreateNew = () => {
    router.push('/dashboard/services/create');
    };

    const handleEditClick = async (serviceId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/service/ById/${serviceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch service details');
            }

            setSelectedService(result.data);
            setIsEditing(true);
        } catch (error) {
            console.error("Error fetching service details:", error);
            setError(error.message || "Failed to load service details. Please try again.");
        }
    };

    const handleDeleteClick = (serviceId) => {
        setDeleteId(serviceId);
        setIsDeleting(true);
    };

    const handleServiceUpdated = (updatedService) => {
        setServices(services.map(service =>
            service._id === updatedService._id ? updatedService : service
        ));
        setIsEditing(false);
    };

    const handleServiceDeleted = (deletedId) => {
        setServices(services.filter(service => service._id !== deletedId));
        setIsDeleting(false);
    };

    const canCreateService = userRole === 'freelancer' || userRole === 'agency';

    if (isEditing && selectedService) {
        return (
            <ServiceEditForm
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
                <h2 className="text-xl font-semibold">My Services</h2>
                {canCreateService && (
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
                    >
                        <Plus size={16} className="mr-2" />
                        Create New Service
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {isDeleting && (
                <ServiceDeleteModal
                    serviceId={deleteId}
                    onCancel={() => setIsDeleting(false)}
                    onConfirm={handleServiceDeleted}
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : services.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {canCreateService ? "No Services Found" : "Service Creation Restricted"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {canCreateService
                            ? "You haven't created any services yet."
                            : "Only freelancers and agencies can create and manage services."}
                    </p>
                    {canCreateService && (
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md"
                        >
                            <Plus size={16} className="mr-2" />
                            Create Your First Service
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service._id || service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.price_basic}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.price_standard}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.price_premium}</td>
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
                        {services.map((service) => (
                            <div key={service._id || service.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {service.category}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Basic</div>
                                        <div className="font-semibold">${service.price_basic}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Standard</div>
                                        <div className="font-semibold">${service.price_standard}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Premium</div>
                                        <div className="font-semibold">${service.price_premium}</div>
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