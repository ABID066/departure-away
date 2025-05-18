"use client"

export default function DashboardContent() {
    return (
        <div className="p-4 md:p-6">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Welcome to the Dashboard</h2>
                <p className="text-sm md:text-base text-gray-600">
                    Monitor your business statistics and manage your services from here.
                </p>

                {/* Responsive stats grid - visible on all devices */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800">Total Services</h3>
                        <p className="text-2xl font-bold mt-2">3</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-green-800">Active Services</h3>
                        <p className="text-2xl font-bold mt-2">2</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-yellow-800">Pending Orders</h3>
                        <p className="text-2xl font-bold mt-2">5</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-purple-800">Total Revenue</h3>
                        <p className="text-2xl font-bold mt-2">$1,240</p>
                    </div>
                </div>

                {/* Quick actions - responsive layout */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <button className="bg-white border border-gray-200 p-3 rounded-lg text-center hover:bg-gray-50 transition-colors">
                            <span className="block text-xs sm:text-sm text-gray-800">Add Service</span>
                        </button>
                        <button className="bg-white border border-gray-200 p-3 rounded-lg text-center hover:bg-gray-50 transition-colors">
                            <span className="block text-xs sm:text-sm text-gray-800">View Orders</span>
                        </button>
                        <button className="bg-white border border-gray-200 p-3 rounded-lg text-center hover:bg-gray-50 transition-colors">
                            <span className="block text-xs sm:text-sm text-gray-800">Support</span>
                        </button>
                        <button className="bg-white border border-gray-200 p-3 rounded-lg text-center hover:bg-gray-50 transition-colors">
                            <span className="block text-xs sm:text-sm text-gray-800">Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}