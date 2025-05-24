"use client"

import React, { useState } from "react";
import {
  TicketsPlane,
  Hotel,
  MapPin,
  Car,
  FileText,
  User,
  Luggage,
  Calendar,
  ChevronDown
} from "lucide-react";


export default function SearchSection() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("flight");

  // State for location and date selections
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sample locations data
  const locations = [
    "New York, USA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Dubai, UAE",
    "Sydney, Australia",
    "Rome, Italy",
    "Bangkok, Thailand"
  ];

  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to handle select change on mobile
  const handleSelectChange = (e) => {
    setActiveTab(e.target.value);
  };

  // Function to handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  // Function to handle date selection
  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    setShowDatePicker(false);
  };

  // Get tab icon based on active tab
  const getTabIcon = (tabName) => {
    const iconProps = { className: "h-5 w-5" };
    switch(tabName) {
      case "flight": return <TicketsPlane {...iconProps} />;
      case "hotel": return <Hotel {...iconProps} />;
      case "tour": return <MapPin {...iconProps} />;
      case "car": return <Car {...iconProps} />;
      case "visa": return <FileText {...iconProps} />;
      case "guider": return <User {...iconProps} />;
      case "lostbag": return <Luggage {...iconProps} />;
      default: return <TicketsPlane {...iconProps} />;
    }
  };

  return (
      <div className="container mx-auto px-4 md:px-16 relative -mt-16 md:-mt-25">
        <div className="max-w-3xl text-left mx-auto">
          <div className="flex flex-col">
            {/* Tab Options */}
            <div className="bg-white rounded-t-xl overflow-hidden shadow-lg w-full md:w-4/5">
              {/* Mobile Select Dropdown */}
              <div className="md:hidden p-3">
                <select
                    value={activeTab}
                    onChange={handleSelectChange}
                    className="block w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                >
                  <option value="flight">Flight</option>
                  <option value="hotel">Hotel</option>
                  <option value="tour">Tour</option>
                  <option value="car">Car</option>
                  <option value="visa">Visa</option>
                  <option value="guider">Guider</option>
                  <option value="lostbag">Lost bag</option>
                </select>
              </div>

              {/* Desktop Tabs */}
              <div className="hidden md:flex justify-around py-3 px-2">
                {["flight", "hotel", "tour", "car", "visa", "guider", "lostbag"].map((tab) => (
                    <button
                        key={tab}
                        className={`flex items-center space-x-1 font-medium cursor-pointer text-bold transition-colors duration-200 ${
                            activeTab === tab ? "text-rose-500" : "text-gray-500 hover:text-rose-400"
                        }`}
                        onClick={() => handleTabClick(tab)}
                    >
                      {getTabIcon(tab)}
                      <span className="capitalize">{tab === "lostbag" ? "Lost bag" : tab}</span>
                    </button>
                ))}
              </div>
            </div>

            {/* Search Inputs Section */}
            <div className="bg-white rounded-xl rounded-tl-none shadow-lg w-full relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 py-6 md:py-8 space-y-4 md:space-y-0">
                {/* Location Input */}
                <div className="relative flex items-center cursor-pointer">
                  <div className="bg-rose-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1 relative">
                    <label className="block text-gray-700 text-sm font-medium">Location</label>
                    <div
                        className="flex items-center"
                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    >
                    <span className="text-gray-500 text-sm truncate">
                      {selectedLocation || "Where are you going"}
                    </span>
                      <ChevronDown className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" />
                    </div>

                    {/* Location Dropdown */}
                    {showLocationDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[250px] max-h-48 overflow-y-auto">
                          {locations.map((location, index) => (
                              <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 whitespace-nowrap"
                                  onClick={() => handleLocationSelect(location)}
                              >
                                {location}
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
                </div>

                {/* Date Input */}
                <div className="relative flex items-center cursor-pointer">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="min-w-0 flex-1 relative">
                    <label className="block text-gray-700 text-sm font-medium">Date</label>
                    <div
                        className="flex items-center"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                    <span className="text-gray-500 text-sm truncate">
                      {selectedDate || "Choose Date"}
                    </span>
                      <ChevronDown className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" />
                    </div>

                    {/* Date Picker */}
                    {showDatePicker && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px] p-3">
                          <input
                              type="date"
                              value={selectedDate}
                              onChange={handleDateSelect}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                    )}
                  </div>
                </div>

                {/* Explore Now Button */}
                <button className="bg-white hover:bg-gray-50 text-gray-800 w-full md:w-auto px-6 py-3 md:px-8 md:py-2 rounded-full border border-gray-300 text-sm font-medium cursor-pointer transition-colors duration-200 hover:border-rose-300 flex-shrink-0">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}