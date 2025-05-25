"use client"

import { useState } from 'react';

export default function ServiceDeleteModal({ serviceId, onCancel, onConfirm }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        if (!serviceId) return;

        setIsDeleting(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://royolex.vercel.app/api/v1/service/delete/${serviceId}`, {
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

            onConfirm(serviceId);
        } catch (error) {
            console.error("Error deleting service:", error);
            alert(error.message || "Failed to delete service. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Service</h3>
                <p className="text-gray-500 mb-5">
                    Are you sure you want to delete this service? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600
                        ${isDeleting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}