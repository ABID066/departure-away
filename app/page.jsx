import Banner from "../public/components/home/Banner";
import ExclusiveOffers from "../public/components/home/ExclusiveOffers";
import Experience from "../public/components/home/Experience";
import Packages from "../public/components/home/Packages";
import TopCategories from "../public/components/home/TopCategories";
import TopGuider from "../public/components/home/TopGuider";
import TravelPackages from "../public/components/home/TravelPackages";

export default function Home() {
  return (
    <div>
      <div className="absolute bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen"></div>
      <div className="max-w-5xl mx-auto bg-gray-50 text-center space-y-8">
        <Banner />
        <Packages />
        <TopCategories />
        <ExclusiveOffers />
        <Experience />
        <TravelPackages />
      </div>
      <TopGuider />
    </div>
  );
}