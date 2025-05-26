"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTravelServiceForm({ setCurrentPage }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    // Cloudinary configuration - Replace with your actual values
    const CLOUDINARY_CLOUD_NAME = "ddb4k8nrn";
    const CLOUDINARY_UPLOAD_PRESET = "departAway";

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        duration: "",
        price1: "",
        price2: "",
        category: "",
        creatorType: "",
        createdBy: "",
        imageUrl: [],
        isPopular: false
    });

    // Get user data from localStorage on component mount
    useEffect(() => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);

                // Check if user role is allowed to create travel services
                if (user.role === "user") {
                    setUnauthorized(true);
                    setError("Only freelancers and agencies can create travel services.");
                    return;
                }

                if (user._id || user.id) {
                    setUserId(user._id || user.id);
                    setUserRole(user.role);
                    setFormData(prev => ({
                        ...prev,
                        createdBy: user._id || user.id,
                        creatorType: user.role
                    }));
                }
            } else {
                setUnauthorized(true);
                setError("User information not found. Please log in again.");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            setError("Unable to retrieve user data. Please log in again.");
            setUnauthorized(true);
        }
    }, []);

    // Update imageUrl when uploadedImages changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, imageUrl: uploadedImages }));
    }, [uploadedImages]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle file upload to Cloudinary
    const handleFileUpload = async (files) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const uploadPromises = [];

        for (let file of files) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError(`${file.name} is not a valid image file`);
                continue;
            }

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setError(`${file.name} is too large. Maximum size is 10MB`);
                continue;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const uploadPromise = fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            ).then(response => response.json());

            uploadPromises.push(uploadPromise);
        }

        try {
            const results = await Promise.all(uploadPromises);
            const successfulUploads = results.filter(result => result.secure_url);
            const newUrls = successfulUploads.map(result => result.secure_url);

            setUploadedImages(prev => [...prev, ...newUrls]);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Upload error:", error);
            setError("Failed to upload images. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        handleFileUpload(files);
    };

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Remove uploaded image
    const removeImage = (indexToRemove) => {
        setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.title || !formData.location || !formData.duration || !formData.category || !formData.price1 || !formData.price2) {
            setError("Please fill out all required fields.");
            return;
        }

        // Check if user is authorized
        if (unauthorized) {
            setError("You are not authorized to create travel services.");
            return;
        }

        // Check if user ID is available
        if (!userId) {
            setError("User information not available. Please log in again.");
            return;
        }

        // Prepare the data for API
        const travelServiceData = {
            ...formData,
            createdBy: userId,
            creatorType: userRole,
            // Convert string numbers to actual numbers
            price1: Number(formData.price1),
            price2: Number(formData.price2),
            imageUrl: uploadedImages // Uploaded image URLs
        };

        setIsLoading(true);

        try {
            console.log(travelServiceData);
            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch("https://royolex.vercel.app/api/v1/Tour/create-Tour", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(travelServiceData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create travel service');
            }

            console.log("Travel service created successfully:", result);
            setCurrentPage('Travel Services');

        } catch (error) {
            console.error("Error creating travel service:", error);
            setError(error.message || "Failed to create travel service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Create New Travel Service</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                {unauthorized ? (
                    <div className="text-center py-8">
                        <div className="mb-4 text-red-500 font-medium">
                            You don't have permission to create travel services.
                        </div>
                        <p className="mb-4 text-gray-600">
                            Only freelancers and agencies can create travel services. If you believe this is an error, please contact support.
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
                        >
                            Return to Home
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter travel service title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter destination location"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., 3 days 2 nights, 1 week"
                                    required
                                />
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
                                    <option value="adventure">Adventure Tours</option>
                                    <option value="cultural">Cultural Tours</option>
                                    <option value="beach">Beach & Resort</option>
                                    <option value="city">City Tours</option>
                                    <option value="nature">Nature & Wildlife</option>
                                    <option value="luxury">Luxury Travel</option>
                                    <option value="budget">Budget Travel</option>
                                    <option value="family">Family Tours</option>
                                    <option value="honeymoon">Honeymoon Packages</option>
                                    <option value="pilgrimage">Pilgrimage Tours</option>
                                </select>
                            </div>

                            {/* Pricing section */}
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-sm font-medium text-gray-700 mb-2 mt-2">Pricing</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Basic Price ($)</label>
                                        <input
                                            type="number"
                                            name="price1"
                                            value={formData.price1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter basic price"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Premium Price ($)</label>
                                        <input
                                            type="number"
                                            name="price2"
                                            value={formData.price2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter premium price"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Popular checkbox */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isPopular"
                                        checked={formData.isPopular}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Mark as Popular Tour
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Popular tours will be featured prominently</p>
                            </div>

                            {/* Image Upload Section */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                                <div
                                    className="mt-1 flex justify-center px-4 py-4 md:px-6 md:pt-5 md:pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-400 transition-colors"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <div className="space-y-1 text-center">
                                        <div className="flex flex-col md:flex-row text-sm text-gray-600 items-center justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-400 mb-2 md:mb-0">
                                                <span>{isUploading ? 'Uploading...' : 'Upload files'}</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleFileInputChange}
                                                    disabled={isUploading}
                                                />
                                            </label>
                                            <p className="md:pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                {/* Display uploaded images */}
                                {uploadedImages.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {uploadedImages.map((url, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={url}
                                                        alt={`Upload ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-md border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
                            <button
                                type="button"
                                className="w-full sm:w-auto order-2 sm:order-1 px-4 cursor-pointer py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setCurrentPage('Travel Services')}
                                disabled={isLoading || isUploading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`w-full sm:w-auto order-1 sm:order-2 px-4 py-2 bg-orange-500 cursor-pointer text-white rounded-md text-sm font-medium
                                ${(isLoading || isUploading) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                                disabled={isLoading || isUploading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </div>
                                ) : isUploading ? 'Uploading Images...' : 'Create Travel Service'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}