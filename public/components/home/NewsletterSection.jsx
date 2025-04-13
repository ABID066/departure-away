import Image from 'next/image';
import cloud1 from "@/public/images/pngwing.com 2.png";
import cloud2 from "@/public/images/pngwing.com 2.png";
import image from "@/public/images/cropped-ico-site 1.png"


const NewsletterSection = () => {
  return (
    <section className="bg-[#1E0E62] py-20 relative min-h-96">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white mb-8 lg:mb-0 lg:w-1/2">
          <h1 className="text-4xl lg:text-4xl font-bold mb-4 ">
            <span className="block mb-3">Get Special Offers and</span>
            <span className="block">More From Triply</span>
          </h1>
          <p className="text-gray-500 mb-6">
            Subscribe to our newsletter and stay updated with latest travel deals
          </p>
          <div className="flex flex-col mt-13 sm:flex-row gap-4 max-w-md px-3 py-2 bg-white  rounded-lg">
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
        <div className="relative w-full lg:w-1/2 h-[300px] flex items-center justify-center">
          <div className="absolute -top-8 right-100 w-40 h-40">
            <Image src={cloud1} alt="Cloud 1" layout="fill" className="object-contain" />
          </div>
          <div className="relative ">
            <Image
              src={image}
              alt="Travel illustration"
              className='w-96 object-contain'
              quality={100}
            />
          </div>
          <div className="absolute top-40 -right-10 w-40 h-40">
            <Image src={cloud2} alt="Cloud 2" layout="fill" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;