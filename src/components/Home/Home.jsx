import React from 'react';
import Banner from './Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCourses></LatestCourses>
            <PopularCourses></PopularCourses>
        </div>
    );
};

export default Home;