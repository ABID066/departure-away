"use client"

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

export default function ServicesContent({ setCurrentPage }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // First get user data from localStorage
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                setUserRole(user.role);
                setUserId(user.id);

                // Only fetch services if the user is a freelancer or agency
                if (user.role === 'freelancer' || user.role === 'agency') {
                    fetchServices(user.id);
                } else {
                    // If user role is not agency or freelancer, don't call API
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

            const response = await fetch(`http://localhost:5000/api/v1/service/user/service/${id}`, {
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

            // Assuming the API returns an array of services in result.data
            setServices(result.data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
            setError(error.message || "Failed to load services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        setCurrentPage('Create Service');
    };

    const canCreateService = userRole === 'freelancer' || userRole === 'agency';

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">My Services</h2>

            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : services.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {canCreateService
                            ? "No Services Found"
                            : "Service Creation Restricted"}
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
                    {/* Table for medium screens and above */}
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
                                        <button className="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
                                        <button className="text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card view for small screens */}
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
                                    <button className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700">Edit</button>
                                    <button className="px-3 py-1 text-sm text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}