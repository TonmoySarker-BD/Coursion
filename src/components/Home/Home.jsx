import React from 'react';
import Banner from './Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';
import WhyChooseUs from './WhyChooseUs';
import PlatformStats from './PlatformStats';
import CommunityBanner from './CommunityBanner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCourses></LatestCourses>
            <PopularCourses></PopularCourses>
            <PlatformStats></PlatformStats>
            <WhyChooseUs></WhyChooseUs>
            <CommunityBanner></CommunityBanner>
        </div>
    );
};

export default Home;