import Image from 'next/image';
import photo1 from '@/public/images/OBJECTS.png';
import photo2 from '@/public/images/Group 1000004961.png';
import photo3 from '@/public/images/Group.png';
import photo4 from '@/public/images/Group (1).png';
import photo5 from '@/public/images/Element.png';
import photo6 from '@/public/images/Image (1).png';
import photo7 from '@/public/images/Group (2).png';
import logo1 from '@/public/images/image 27.png';
import logo2 from '@/public/images/image 28.png';
import logo3 from '@/public/images/Group 63.png';
import logo4 from '@/public/images/image 30.png';
import logo5 from '@/public/images/image 31.png';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const AboutUs = () => {
    return (
        <>
            {/* Page Header */}
            <div className="bg-[#F0EDFD] py-30 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 pt-20">About Us</h1>
                <p className="text-sm text-gray-600 mt-2">
                    <a href="/" className="text-gray-500 hover:underline">Home</a> &gt; <span className="text-gray-700">About Us</span>
                </p>
            </div>

            {/* Main Content */}
            <section className="bg-white text-neutral-700 px-4 md:px-16 lg:px-32 py-16 space-y-24">
                {/* Who We Are */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
                        <p className="text-base text-gray-700 leading-7">
                            Welcome to Departure Away! We&apos;re a passionate team of globetrotters, travel enthusiasts,
                            and adventurers dedicated to making your dream journeys a reality.
                            Whether you&apos;re seeking exotic getaways, cultural explorations, or hidden gems off the beaten path,
                            we&apos;ve got you covered. With years of experience in the travel industry, we&apos;ve established
                            ourselves as a trusted resource for travelers looking to discover the world in unique and meaningful ways.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center relative h-[200px] sm:h-[250px] md:h-[350px] order-first md:order-last">
                        <Image
                            src={photo1}
                            alt="Who We Are"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </div>

                {/* Our Mission */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center relative h-[200px] sm:h-[250px] md:h-[350px] order-first">
                        <Image
                            src={photo2}
                            alt="Our Mission"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className="md:w-1/2 order-last">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-base text-gray-700 leading-7 mb-4">
                            At Departure Away, our mission is simple: to inspire, guide, and simplify your travel planning.
                            We believe that travel has the power to change lives and broaden perspectives, and we're here to make it
                            easier for you to experience that magic.
                        </p>
                        <p className="font-semibold text-gray-800">We aim to:</p>
                        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                            <li>Provide curated travel guides that help you find unforgettable experiences.</li>
                            <li>Offer personalized travel planning to make each trip seamless.</li>
                            <li>Share insider tips and recommendations from locals and seasoned travelers.</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* What We Offer */}
            <section className="bg-gray-50 px-4 md:px-16 lg:px-32 py-16 space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2 order-last md:order-first">
                        <h2 className="text-3xl font-bold mb-6 text-gray-700">What We Offer</h2>
                        <p className="text-base text-gray-600 leading-7 mb-6">
                            We offer a wide range of services designed to make your travel planning smooth and hassle-free:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-3">
                            <li>
                                <strong>Destination Guides:</strong> Detailed information on top destinations around the world.
                            </li>
                            <li>
                                <strong>Travel Tips & Hacks:</strong> Practical advice to help you travel smarter and save more.
                            </li>
                            <li>
                                <strong>Curated Itineraries: </strong>
                                <span>Handpicked itineraries to suit every type of traveler, from solo adventurers to family vacations.</span>
                            </li>
                            <li>
                                <strong>Hotel & Flight Bookings: </strong>
                                <span>Compare prices and find the best deals on hotels, flights, and transportation.</span>
                            </li>
                            <li>
                                <strong>Local Experiences: </strong>
                                <span>Discover authentic, local activities and experiences that go beyond the tourist traps.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center relative order-first md:order-last">
                        <Image
                            src={photo3}
                            alt="What We Offer"
                            width={500}
                            height={500}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white px-4 md:px-16 lg:px-32 py-16 space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center relative h-[250px] sm:h-[300px] md:h-[400px]">
                        <Image
                            src={photo4}
                            alt="Why Choose Us"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className="md:w-1/2 order-last">
                        <h2 className="text-3xl font-bold mb-6 text-gray-700">Why Choose Us</h2>
                        <p className="text-base text-gray-700 leading-7 mb-4">
                            We’re more than just a travel website. We’re a community of travelers who love sharing our experiences and helping others embark on their own adventures. Here’s what sets us apart:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-3">
                            <li>
                                <strong>Personalized Recommendations:</strong> Every traveler is unique. We tailor our services to fit your preferences and interests.
                            </li>
                            <li>
                                <strong>Expert Knowledge:</strong> Our team has traveled the globe, and we share insights that can only come from real-world experience.
                            </li>
                            <li>
                                <strong>24/7 Support:</strong> Our customer service team is available around the clock to assist you with any travel-related questions or concerns.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="bg-white px-4 md:px-16 lg:px-32 py-16">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text content */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Join Us on Our Journey
                        </h2>
                        <p className="text-base text-gray-700 leading-7">
                            Whether you’re planning your next vacation or just dreaming of future travels,
                            <br />
                            <strong>Departure Away</strong> is here to help. Join our community, follow us on social media,
                            and subscribe to our newsletter for the latest travel tips, deals, and inspiration.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center relative h-[250px] sm:h-[300px] md:h-[400px] order-first md:order-last">
                        <Image
                            src={photo7}
                            alt="Join Us Illustration"
                            
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white px-4 md:px-16 lg:px-32 py-20 pb-40 mt-15 relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 md:w-52 lg:w-60 z-0 opacity-50">
                    <Image
                        src={photo5}
                        alt="Decorative Element"
                        width={240}
                        height={240}
                        className="transform rotate-12"
                    />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-gray-900">
                                What people say <span className="text-rose-600 block pt-3">about us.</span>
                            </h2>
                            <p className="text-gray-600 text-lg max-w-md">
                                Our clients send us bunch of smiles with our services and we love them.
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-6">
                            <button className="w-10 h-10 rounded-full border border-gray-300 bg-white  flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all duration-300 border border-gray-100">
                                <span className="text-xl text-gray-300 "><FaArrowLeftLong /></span>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-rose-600 text-white shadow-lg flex items-center justify-center hover:bg-pink-700 transition-all duration-300">
                                <span className="text-xl"><FaArrowRightLong /></span>
                            </button>
                        </div>
                    </div>

                    {/* Testimonial Cards Stack */}
                    <div className="lg:w-1/2 relative">
                        {/* Active Testimonial */}
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
                                    "On the Windows talking painted pasture yet its express parties use.
                                    Sure last upon he same as knew next. Of believed or diverted no."
                                </p>
                                <h4 className="font-semibold text-gray-900 text-lg">Mike Taylor</h4>
                                <p className="text-gray-500">CEO of Red Button</p>
                            </div>
                        </div>

                        {/* Background Testimonial */}
                        <div className="bg-white rounded-2xl my-testimonial-box p-8  w-120 absolute top-21 left-11 z-10 opacity-75">
                            <div className="w-14 h-14 rounded-full border-4 border-white absolute -top-7 left-8 shadow-lg overflow-hidden">
                                <Image
                                    src={photo6}
                                    alt="Chris Thomas"
                                    fill
                                    className="object-cover "
                                />
                            </div>
                            <div className="mt-8">
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    "Far far away, behind the word mountains, far from the countries
                                    Vokalia and Consonantia, there live the blind texts."
                                </p>
                                <h4 className="font-semibold text-gray-600 text-lg">Chris Thomas</h4>
                                <p className="text-gray-400">CEO of Red Button</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logos Row */}
            <div className="flex justify-between items-center flex-wrap gap-8 px-8 py-17 lg:mt-7 bg-white rounded-xl max-w-7xl mx-auto">
                {[logo1, logo2, logo3, logo4, logo5, logo1].map((logo, index) => (
                    <div key={index} className="flex justify-center items-center" >
                        <Image
                            src={logo}
                            alt={`Partner Logo ${index + 1}`}
                            
                            className="max-h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default AboutUs;
