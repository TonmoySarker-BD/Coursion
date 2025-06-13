import { motion } from "framer-motion";
import { FaGlobeAmericas, FaUserGraduate, FaArrowRight } from "react-icons/fa";
import bgbanner from "../../assets/cb.png";
import { Link } from "react-router";

const CommunityBanner = () => {
    return (
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background image */}
            <img
                src={bgbanner}
                alt="Students collaborating"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* White blur overlay */}
            <div className="absolute inset-0 bg-success/10 backdrop-blur-sm" />

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center bg-success/60 px-4 py-2 rounded-full mb-4">
                            <FaUserGraduate className="mr-2" />
                            <span className="font-medium tracking-wider">
                                TRUSTED BY OVER 400K+ STUDENTS
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Join Our Community Of Students<br />
                            <span className="text-success">Around The World</span> Helping
                            You<br />
                            Succeed.
                        </h2>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Link to={"/register"} className="group flex items-center justify-center px-8 py-4 bg-white text-success rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                            GET STARTED
                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <div className="flex items-center justify-center lg:justify-end mt-6 text-sm">
                            <FaGlobeAmericas className="mr-2 text-success" />
                            <span>Students from 100+ countries</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommunityBanner;
