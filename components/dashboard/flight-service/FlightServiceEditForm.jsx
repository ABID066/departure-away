import { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function FlightServiceEditForm({ service, userId, onCancel, onUpdate }) {
    const [formData, setFormData] = useState({
        title: "",
        title1: "",
        description: "",
        description1: "",
        location: "",
        economicPrice: "",
        businessPrice: "",
        creatorCategory: "",
        createdBy: "",
        imageUrl: [],
        isPopular: false
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const CLOUDINARY_CLOUD_NAME = "ddb4k8nrn";
    const CLOUDINARY_UPLOAD_PRESET = "departAway";

    useEffect(() => {
        if (service) {
            const initialImages = service.imageUrl && Array.isArray(service.imageUrl)
                ? service.imageUrl.filter(url => url && url.trim() !== '')
                : [];

            setUploadedImages(initialImages);

            setFormData({
                title: service.title || "",
                title1: service.title1 || "",
                description: service.description || "",
                description1: service.description1 || "",
                location: service.location || "",
                economicPrice: service.economicPrice || "",
                businessPrice: service.businessPrice || "",
                creatorCategory: service.creatorCategory || "",
                createdBy: service.createdBy || userId,
                imageUrl: initialImages,
                isPopular: service.isPopular || false
            });
        }
    }, [service, userId]);

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

    const handleFileUpload = async (files) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const uploadPromises = [];

        for (let file of files) {
            if (!file.type.startsWith('image/')) {
                setFormError(`${file.name} is not a valid image file`);
                continue;
            }

            if (file.size > 10 * 1024 * 1024) {
                setFormError(`${file.name} is too large. Maximum size is 10MB`);
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
            setFormError("");
        } catch (error) {
            console.error("Upload error:", error);
            setFormError("Failed to upload images. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        handleFileUpload(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeImage = (indexToRemove) => {
        setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!service?._id) {
            setFormError("Flight service ID is missing. Cannot update.");
            return;
        }

        const flightServiceData = {
            ...formData,
            createdBy: userId,
            economicPrice: Number(formData.economicPrice),
            businessPrice: Number(formData.businessPrice),
            imageUrl: uploadedImages
        };

        setFormLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/flight/update/${service._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
                },
                body: JSON.stringify(flightServiceData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update flight service');
            }

            onUpdate({ ...flightServiceData, _id: service._id });
        } catch (error) {
            console.error("Error updating flight service:", error);
            setFormError(error.message || "Failed to update flight service. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex items-center mb-4 md:mb-6">
                    <button
                        onClick={onCancel}
                        className="mr-3 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-1" />
                        <span>Back to Flight Services</span>
                    </button>
                    <h2 className="text-lg md:text-xl font-semibold">Edit Flight Service</h2>
                </div>

                {formError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-start">
                        <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                        <span>{formError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Title */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Enter flight service title"
                                required
                            />
                        </div>

                        {/* Subtitle */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                name="title1"
                                value={formData.title1}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Enter flight service subtitle"
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Describe the flight service, routes, and what makes it special"
                                required
                            />
                        </div>

                        {/* Additional Description */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Description</label>
                            <textarea
                                name="description1"
                                value={formData.description1}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Additional details about the flight service"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Enter departure location"
                                required
                            />
                        </div>

                        {/* Pricing section */}
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-700 mb-2 mt-2">Pricing</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Economic Class Price ($)</label>
                                    <input
                                        type="number"
                                        name="economicPrice"
                                        value={formData.economicPrice}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter economic class price"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Class Price ($)</label>
                                    <input
                                        type="number"
                                        name="businessPrice"
                                        value={formData.businessPrice}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Enter business class price"
                                        min="0"
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
                                    Mark as Popular Flight
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Popular flights will be featured prominently</p>
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
                            onClick={onCancel}
                            className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={formLoading || isUploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-full sm:w-auto order-1 sm:order-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium transition-all
                            ${(formLoading || isUploading) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                            disabled={formLoading || isUploading}
                        >
                            {formLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </div>
                            ) : isUploading ? 'Uploading Images...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}