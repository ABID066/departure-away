import React from "react";
import ExperienceCard from "./ExperienceCard";
export default function Experience() {
  const experiences = [
    {
      title: "Beach",
      tours: "5 Tours",
      price: "$299",
      image: "/images/beach.jpg", // Replace with your image path
      alt: "Beach Paradise",
    },
    {
      title: "Mountain",
      tours: "8 Tours",
      price: "$399",
      image: "/images/mountain.jpg", // Replace with your image path
      alt: "Mountain Adventure",
    },
    {
      title: "City",
      tours: "10 Tours",
      price: "$199",
      image: "/images/city.jpg", // Replace with your image path
      alt: "City Lights",
    },
    {
      title: "Desert",
      tours: "6 Tours",
      price: "$349",
      image: "/images/desert.jpg", // Replace with your image path
      alt: "Desert Safari",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <h2 className="text-4xl font-bold text-center my-8">Book Our Popular Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.title} experience={experience}></ExperienceCard>
        ))}
      </div>
    </div>
  );
}