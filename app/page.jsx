import Banner from "./components/home/Banner";
import ExclusiveOffers from "./components/home/ExclusiveOffers";
import Experience from "./components/home/experience/Experience";
import Packages from "./components/home/Packages";
import TopCategories from "./components/home/TopCategories";
import TopGuider from "./components/home/TopGuider";
import TravelPackages from "./components/home/travel/TravelPackages";

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