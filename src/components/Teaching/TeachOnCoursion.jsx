import React from 'react';
import { FaAward, FaDollarSign, FaUser } from 'react-icons/fa';
import TeacherHero from './TeacherHero';
import ReasonsSection from './ReasonsSection';
import StatsSection from './StatsSection';
import HowToBegin from './HowToBegin';


const TeachOnCoursion = () => {

    // Dynamic title
    document.title = "Teach on Coursion - Share Your Knowledge and Earn Money";
    // Reasons data
    const reasons = [
        {
            icon: <FaDollarSign size={24} className="text-green-500" />,
            title: "Earn money",
            description: "Earn money every time a student purchases your course. Get paid monthly through Crypto or Payoneer."
        },
        {
            icon: <FaUser size={24} className="text-green-500" />,
            title: "Reach students",
            description: "Teach what you love and reach millions of students across the globe."
        },
        {
            icon: <FaAward size={24} className="text-green-500" />,
            title: "Build your brand",
            description: "Establish yourself as an expert and build your professional brand with our marketing tools."
        }
    ];

    // Stats data
    const stats = [
        { value: "50", suffix: "M+", label: "Students" },
        { value: "65", suffix: "K+", label: "Instructors" },
        { value: "180", suffix: "+", label: "Countries" },
        { value: "650", suffix: "M+", label: "Earned by instructors" }
    ];

    return (
        <div className="pb-10">
            <TeacherHero></TeacherHero>
            <ReasonsSection reasons={reasons} />
            <StatsSection stats={stats} />
            <HowToBegin></HowToBegin>

        </div>
    );
};

export default TeachOnCoursion;