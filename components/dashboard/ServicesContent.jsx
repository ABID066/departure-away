"use client"

import { Plus } from 'lucide-react';

export default function ServicesContent({ setCurrentPage }) {
    const services = [
        { id: 1, title: "Economy Flight to Dubai", category: "flight", basic: 300, standard: 450, premium: 650 },
        { id: 2, title: "5-Star Hotel in Paris", category: "hotel", basic: 200, standard: 350, premium: 500 },
        { id: 3, title: "Guided Tour of Rome", category: "tour", basic: 75, standard: 120, premium: 180 },
    ];

    const handleCreateNew = () => {
        setCurrentPage('Create Service');
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">All Services</h2>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center justify-center sm:justify-start px-4 py-2 bg-orange-500 text-white rounded-lg w-full sm:w-auto"
                >
                    <Plus size={16} className="mr-2" />
                    <span>Create New Service</span>
                </button>
            </div>

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
                        <tr key={service.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.basic}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.standard}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.premium}</td>
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
                    <div key={service.id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                {service.category}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Basic</div>
                                <div className="font-semibold">${service.basic}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Standard</div>
                                <div className="font-semibold">${service.standard}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Premium</div>
                                <div className="font-semibold">${service.premium}</div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                            <button className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700">Edit</button>
                            <button className="px-3 py-1 text-sm text-red-500 hover:text-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}