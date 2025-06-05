
import ThreeCards from "@/components/home/ThreeCards";
import Banner from "../components/home/BannerSection";
import ExclusiveOffers from "../components/home/ExclusiveOffers";
import Experience from "../components/home/Experience";
import TopCategories from "../components/home/TopCategories";
import TopGuider from "../components/home/TopGuider";
import TravelPackages from "../components/home/TravelPackages";
import SearchSection from "@/components/home/SearchSection";
import Chatbot from "@/components/home/Chatbot"; // Import the Chatbot component

export default function Home() {
    return (
        <div>
            <div className="text-center space-y-8">
                <Banner />
                <SearchSection />
                <ThreeCards />
                <TopCategories />
                <ExclusiveOffers />
                <Experience />
                <TravelPackages />
            </div>
            <TopGuider />
            <Chatbot /> 
        </div>
    );
}
