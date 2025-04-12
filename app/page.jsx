import Banner from "./components/home/Banner";
import ExclusiveOffers from "./components/home/ExclusiveOffers";
import Packages from "./components/home/Packages";
import PopularExperience from "./components/home/PopularExperience";
import TopCategories from "./components/home/TopCategories";
import TopGuider from "./components/home/TopGuider";
import TravelPackages from "./components/home/TravelPackages";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen"></div>
      <div className="max-w-5xl mx-auto bg-gray-100 text-center">
        <Banner />
        <Packages />
        <TopCategories />
        <ExclusiveOffers />
        <PopularExperience />
        <TravelPackages />
        <TopGuider />
      </div>
    </div>
  );
}
