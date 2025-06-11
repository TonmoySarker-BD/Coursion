import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample slides data
const slides = [
    {
        title: "Learn Anytime, Anywhere",
        subtitle: "Access hundreds of online courses from your phone, tablet, or laptop.",
        image: "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740"
    },
    {
        title: "Top Instructors, Real Skills",
        subtitle: "Gain real-world knowledge from industry experts and certified trainers.",
        image: "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740"
    },
    {
        title: "Get Certified",
        subtitle: "Earn certificates to boost your resume and showcase your achievements.",
        image: "https://img.freepik.com/free-vector/online-certification-concept_23-2148564567.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740"
    },
    {
        title: "Interactive & Engaging",
        subtitle: "Quizzes, assignments, and peer support to help you stay on track.",
        image: "https://img.freepik.com/free-vector/gradient-affiliate-marketing-illustration_23-2149381419.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740"
    },
    {
        title: "Flexible Learning Paths",
        subtitle: "Whether you’re a beginner or pro, start at your own level and pace.",
        image: "https://img.freepik.com/free-vector/business-workspace-compositions-set-with-flowchart_1284-54203.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740"
    }
];


const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                {slides.map((slide, idx) => (
                    <div key={idx}>
                        <div
                            className="relative h-[80vh] bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-center px-4 text-white max-w-3xl"
                                >
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-2xl font-medium drop-shadow">
                                        {slide.subtitle}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
