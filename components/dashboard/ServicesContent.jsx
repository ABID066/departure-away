"use client"

import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Trash2, Edit, AlertCircle } from 'lucide-react';

export default function ServicesContent({ setCurrentPage }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    // New state variables for edit/delete functionality
    const [isEditing, setIsEditing] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");

    // Form state for editing
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price_basic: "",
        price_standard: "",
        price_premium: "",
        location: "",
        duration_days: "",
        media_urls: "",
        provider_id: ""
    });

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

    // New function to handle edit button click
    const handleEditClick = async (serviceId) => {
        setFormError("");
        setFormLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/v1/service/ById/${serviceId}`, {
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

            const serviceData = result.data;
            setSelectedService(serviceData);

            // Pre-fill the form with service data
            setFormData({
                title: serviceData.title || "",
                description: serviceData.description || "",
                category: serviceData.category || "",
                price_basic: serviceData.price_basic || "",
                price_standard: serviceData.price_standard || "",
                price_premium: serviceData.price_premium || "",
                location: serviceData.location || "",
                duration_days: serviceData.duration_days || "",
                media_urls: serviceData.media_urls || "",
                provider_id: serviceData.provider_id || userId
            });

            // Switch to editing mode
            setIsEditing(true);
        } catch (error) {
            console.error("Error fetching service details:", error);
            setFormError(error.message || "Failed to load service details. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    // New function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // New function to handle form submission for update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!selectedService || !selectedService._id) {
            setFormError("Service ID is missing. Cannot update.");
            return;
        }

        // Prepare the data for API
        const serviceData = {
            ...formData,
            provider_id: userId,
            // Convert string numbers to actual numbers
            price_basic: Number(formData.price_basic),
            price_standard: Number(formData.price_standard),
            price_premium: Number(formData.price_premium),
            duration_days: formData.duration_days ? Number(formData.duration_days) : undefined,
            // Keep media_urls as a string
            media_urls: formData.media_urls ? formData.media_urls.trim() : ""
        };

        setFormLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/v1/service/update/${selectedService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                },
                body: JSON.stringify(serviceData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update service');
            }

            // Update service in the local state
            setServices(services.map(service =>
                service._id === selectedService._id ? { ...service, ...serviceData } : service
            ));

            // Exit edit mode
            handleCancelEdit();

        } catch (error) {
            console.error("Error updating service:", error);
            setFormError(error.message || "Failed to update service. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    // New function to cancel edit mode
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedService(null);
        setFormData({
            title: "",
            description: "",
            category: "",
            price_basic: "",
            price_standard: "",
            price_premium: "",
            location: "",
            duration_days: "",
            media_urls: "",
            provider_id: ""
        });
        setFormError("");
    };

    // New function to show delete confirmation
    const handleDeleteClick = (serviceId) => {
        setDeleteId(serviceId);
        setIsDeleting(true);
    };

    // New function to cancel delete
    const handleCancelDelete = () => {
        setDeleteId(null);
        setIsDeleting(false);
    };

    // New function to confirm delete
    const handleConfirmDelete = async () => {
        if (!deleteId) return;

        setFormLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/v1/service/delete/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete service');
            }

            // Remove the deleted service from the local state
            setServices(services.filter(service => service._id !== deleteId));

            // Close the delete dialog
            handleCancelDelete();

        } catch (error) {
            console.error("Error deleting service:", error);
            setError(error.message || "Failed to delete service. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    const canCreateService = userRole === 'freelancer' || userRole === 'agency';

    // Render edit form when in edit mode
    if (isEditing) {
        return (
            <div className="p-4 md:p-6">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleCancelEdit}
                        className="mr-3 flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft size={18} className="mr-1" />
                        <span>Back to Services</span>
                    </button>
                    <h2 className="text-xl font-semibold">Edit Service</h2>
                </div>

                {formError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-start">
                        <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                        <span>{formError}</span>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter service title"
                                    required
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter service description"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="flight">Flight</option>
                                    <option value="hotel">Hotel</option>
                                    <option value="tour">Tour</option>
                                    <option value="guide">Guide</option>
                                    <option value="visa">Visa</option>
                                    <option value="lost_bag">Lost Bag</option>
                                    <option value="car">Car</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter service location"
                                />
                            </div>

                            {/* Pricing section */}
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-sm font-medium text-gray-700 mb-2 mt-2">Pricing</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Basic Price ($)</label>
                                        <input
                                            type="number"
                                            name="price_basic"
                                            value={formData.price_basic}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter basic price"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Standard Price ($)</label>
                                        <input
                                            type="number"
                                            name="price_standard"
                                            value={formData.price_standard}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter standard price"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Premium Price ($)</label>
                                        <input
                                            type="number"
                                            name="price_premium"
                                            value={formData.price_premium}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter premium price"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                <input
                                    type="number"
                                    name="duration_days"
                                    value={formData.duration_days}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter duration in days"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Media URLs</label>
                                <input
                                    type="text"
                                    name="media_urls"
                                    value={formData.media_urls}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter comma-separated media URLs"
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter URLs separated by commas</p>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                                <div className="mt-1 flex justify-center px-4 py-4 md:px-6 md:pt-5 md:pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex flex-col md:flex-row text-sm text-gray-600 items-center justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-400 mb-2 md:mb-0">
                                                <span>Upload files</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                            </label>
                                            <p className="md:pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
                            <button
                                type="button"
                                className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={handleCancelEdit}
                                disabled={formLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`w-full sm:w-auto order-1 sm:order-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium
                                ${formLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                                disabled={formLoading}
                            >
                                {formLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </div>
                                ) : 'Update Service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">My Services</h2>
                {canCreateService && (
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md"
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

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Service</h3>
                        <p className="text-gray-500 mb-5">
                            Are you sure you want to delete this service? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                                disabled={formLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className={`px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600
                                ${formLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={formLoading}
                            >
                                {formLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
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
                                        <button
                                            className="text-blue-500 hover:text-blue-700 mr-3 inline-flex items-center"
                                            onClick={() => handleEditClick(service._id || service.id)}
                                        >
                                            <Edit size={14} className="mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 inline-flex items-center"
                                            onClick={() => handleDeleteClick(service._id || service.id)}
                                        >
                                            <Trash2 size={14} className="mr-1" />
                                            Delete
                                        </button>
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
                                    <button
                                        className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700 inline-flex items-center"
                                        onClick={() => handleEditClick(service._id || service.id)}
                                    >
                                        <Edit size={14} className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm text-red-500 hover:text-red-700 inline-flex items-center"
                                        onClick={() => handleDeleteClick(service._id || service.id)}
                                    >
                                        <Trash2 size={14} className="mr-1" />
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