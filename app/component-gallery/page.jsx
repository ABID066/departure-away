// app/component-gallery/page.jsx
import React from "react";
import Image from "next/image";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import vacation from "@/public/images/vacation.jpg";
import guideImg from "../../public/images/guide-3.png";
import image from "@/public/images/home/house.jpg";
import photo6 from "@/public/images/Image (1).png";
const ComponentGallery = () => {
  return (
    <div className="p-8 space-y-10 container mx-auto pt-24 lg:px-20">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">
        Component Gallery
      </h1>

      {/* -------------------- BUTTONS ----------------------------------------------------- */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Buttons</h2>
        <div className="flex flex-wrap gap-5">
          <button className="text-black border border-black px-6 py-2 rounded-full hover:bg-pink-700 hover:border-transparent hover:text-amber-50 transition-colors">
            Get Started
          </button>
          <button className="btn btn-outline btn-secondary rounded-full px-4 py-2">
            For You
          </button>
          <button className="bg-pink-700 px-4 py-2 text-white rounded-lg hover:bg-pink-900 transition-colors duration-300">
            View All Packages
          </button>
          <button className="bg-[#FF3366]  text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300">
            Subscribe Now
          </button>
        </div>
      </section>
      <hr className="text-pink-500/50" />

      {/* -------------------- CARDS ----------------- */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Cards</h2>
        <div className="flex flex-wrap gap-5">
          {/* EXPERIENCE CARD */}
          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg">
              <Image
                src={image}
                alt="tour"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white shadow-lg rounded-lg mt-[-60px] w-44 text-center p-4">
              <h3 className="text-lg font-semibold">Beach</h3>
              <div className="flex justify-center items-center text-stone-400">
                <p className="text-gray-600">5 Tours</p>
                <span> - </span>
                <div className="flex items-center">
                  <span>From</span>
                  <p>$ 399</p>
                </div>
              </div>
            </div>
          </div>

          {/* TRAVEL PACKAGE CARD */}
          <div className="card bg-base-100 shadow-sm w-80">
            <figure className="relative">
              <Image
                src={vacation}
                alt="Vacation Spot"
                width={300}
                height={200}
              />
              <div className="absolute top-36 left-4">
                <div className="badge badge-secondary">Popular</div>
              </div>
            </figure>

            <div className="p-4 text-left space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CiLocationOn />
                <p>Ingis, Manitoba, Canada</p>
              </div>

              <h2 className="card-title font-semibold text-lg">
                Royal Pagoda Escape
              </h2>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>
                  <span className="text-yellow-500">★</span> 4.7
                </p>
                <p>2300 Reviews</p>
                <CiCalendarDate />
                <p>5 Days</p>
              </div>

              <p className="text-sm">
                From <span className="text-red-500 font-semibold">$599</span>
              </p>
            </div>
          </div>

          {/* GUIDER CARD */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <a href="#" className="block">
              <Image
                src={guideImg}
                alt="Guide"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-medium">Ashton</h3>
                <div className="flex items-center mt-1">
                  <div className="text-yellow-500">★</div>
                  <span className="text-sm ml-1">4.8</span>
                  <span className="text-sm text-gray-500 ml-1">
                    299 Reviews
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* TESTIMONIAL CARD */}
          <div className="bg-white rounded-2xl my-testimonial-box p-8 w-120  z-20 relative transform transition-all duration-300">
            <div className="w-16 h-16 rounded-full absolute -top-7 -left-7 shadow-lg overflow-hidden">
              <Image
                src={photo6}
                alt="Mike Taylor"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "On the Windows talking painted pasture yet its express parties
                use. Sure last upon he same as knew next. Of believed or
                diverted no."
              </p>
              <h4 className="font-semibold text-gray-900 text-lg">
                Mike Taylor
              </h4>
              <p className="text-gray-500">CEO of Red Button</p>
            </div>
          </div>
        </div>
      </section>
      <hr className="text-pink-500/50" />
      {/* FORMS */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Forms</h2>

        <div className="space-y-5">


        {/* CONTACT PAGE CONTACT FORM */}
          <div className="my-contact-box bg-white rounded-xl shadow-md p-6 md:p-8 md:w-1/2">
            <h2 className="text-lg font-bold text-gray-600 mb-6">
              We would love to hear from you
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-400"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Your Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-400"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400"
                >
                  Message here..
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700 min-h-[150px]"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  className="h-4 w-4 border-2 border-pink-700 text-pink-700 focus:ring-pink-500 rounded"
                  required
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 text-sm text-gray-600"
                >
                  I have read and accept the{" "}
                  <a href="#" className="text-pink-700 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-pink-700 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-50 bg-pink-700 hover:bg-pink-900 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mt-4 disabled:opacity-50"
              >
                Submit Your Query
              </button>
            </form>
          </div>

          <div className="p-10 bg-blue-950">
          <div className="flex flex-col  sm:flex-row gap-4 max-w-md px-3 py-2 bg-white  rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900"
            />
            <button className="bg-[#FF3366]  text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-300">
              Subscribe Now
            </button>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentGallery;
