import React, { useEffect } from 'react';
// import Banner from './Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';
import WhyChooseUs from './WhyChooseUs';
import PlatformStats from './PlatformStats';
import CommunityBanner from './CommunityBanner';
import FAQ from './FAQ';
import HeroSection from './HeroSection';

const Home = () => {
    // Dynamic title setting
    useEffect(() => {
        document.title = "Coursion | Home";
    }, []);
    return (
        <div>
            <HeroSection />
            {/* <Banner></Banner> */}
            <PopularCourses></PopularCourses>
            <LatestCourses></LatestCourses>
            <PlatformStats></PlatformStats>
            <WhyChooseUs></WhyChooseUs>
            <FAQ></FAQ>
            <CommunityBanner></CommunityBanner>
        </div>
    );
};

export default Home;