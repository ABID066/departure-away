"use client";
import React, { useEffect, useState } from "react";
import TravelCard from "./TravelCard";

export default function TravelPackages() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-4">Travel Package</h2>
      <div className="flex justify-center mb-4 space-x-2">
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          For You
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          Haji
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
          Alpine
        </button>
        <button className="btn btn-outline btn-secondary rounded-full px-4 m-0">
          Wonders
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((item) => (
          <TravelCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
