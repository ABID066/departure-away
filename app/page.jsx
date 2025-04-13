import ThreeCards from "@/public/components/home/ThreeCards";
import Banner from "../public/components/home/BannerSection";
import ExclusiveOffers from "../public/components/home/ExclusiveOffers";
import Experience from "../public/components/home/Experience";
import TopCategories from "../public/components/home/TopCategories";
import TopGuider from "../public/components/home/TopGuider";
import TravelPackages from "../public/components/home/TravelPackages";
import SearchSection from "@/public/components/home/SearchSection";

export default function Home() {
    return (
        <div>
            <div className="text-center space-y-8">

                <Banner/>
                <SearchSection/>
                <ThreeCards />
                <TopCategories />
                <ExclusiveOffers />
                <Experience />
                <TravelPackages />
            </div>
           <TopGuider />
        </div>
    );
}