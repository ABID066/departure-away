// components/SearchSection.jsx
"use client"
import React, { useState } from "react";

export default function SearchSection() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("flight");

  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to handle select change on mobile
  const handleSelectChange = (e) => {
    setActiveTab(e.target.value);
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
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "flight" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("flight")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Flight</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "hotel" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("hotel")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>Hotel</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "tour" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("tour")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Tour</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "car" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("car")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span>Car</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "visa" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("visa")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span>Visa</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "guider" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("guider")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Guider</span>
              </button>
              <button 
                className={`flex items-center space-x-1 font-medium cursor-pointer transition-colors duration-200 ${activeTab === "lostbag" ? "text-rose-500" : "text-gray-500 hover:text-rose-400"}`}
                onClick={() => handleTabClick("lostbag")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                <span>Lost bag</span>
              </button>
            </div>
          </div>
          
          {/* Search Inputs Section */}
          <div className="bg-white rounded-xl rounded-tl-none shadow-lg overflow-hidden w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 py-6 md:py-8 space-y-4 md:space-y-0">
              {/* Location Input */}
              <div className="flex items-center cursor-pointer">
                <div className="bg-rose-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block text-gray-700 text-sm font-medium">Location</label>
                  <div className="flex items-center">
                    <span className="text-gray-500 text-sm truncate">Where are you going</span>
                    <svg className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Input */}
              <div className="flex items-center cursor-pointer">
                <div className="bg-indigo-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block text-gray-700 text-sm font-medium">Date</label>
                  <div className="flex items-center">
                    <span className="text-gray-500 text-sm truncate">Choose Date</span>
                    <svg className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
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