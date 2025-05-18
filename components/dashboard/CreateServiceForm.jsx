"use client"

import { useState } from 'react';

export default function CreateServiceForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price_basic: "",
        price_standard: "",
        price_premium: "",
        location: "",
        duration_days: "",
        media_urls: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        // You might want to add API call for creating service
    };

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Create New Service</h2>

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

                        {/* Pricing section - Responsive layout */}
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
                        <button type="button" className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
                            Create Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}