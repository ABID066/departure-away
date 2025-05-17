"use client"

import { Plus } from 'lucide-react';

export default function ServicesContent() {
    const services = [
        { id: 1, title: "Economy Flight to Dubai", category: "flight", basic: 300, standard: 450, premium: 650 },
        { id: 2, title: "5-Star Hotel in Paris", category: "hotel", basic: 200, standard: 350, premium: 500 },
        { id: 3, title: "Guided Tour of Rome", category: "tour", basic: 75, standard: 120, premium: 180 },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">All Services</h2>
                <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg">
                    <Plus size={16} className="mr-2" />
                    <span>Create New Service</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
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
        </div>
    );
}