import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { AuthContext } from '../../context/Auth/AuthContext';

const TeacherHero = () => {
    const { user } = use(AuthContext)
    return (
        <section className="relative py-16 px-6 min-h-[70vh] md:px-10 lg:px-20 ">
            {/* Background Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50"
                />

            </div>

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto gap-10">
                {/* Text Section */}
                <motion.div
                    className="w-full text-center md:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold  leading-tight mb-6">
                        Share Your Knowledge, Inspire the World
                    </h1>
                    <p className="text-lg md:text-xl  mb-8">
                        Become an instructor and help millions of learners worldwide achieve their goals. Join the world’s largest online learning community.
                    </p>
                    <Link to={user ? "/add-course" : "/register"}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                        >
                            Start Teaching Today
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className="w-full h-96 flex justify-center"
                    animate={{ scale: [0.9, 1, 0.9] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "repeat-reverse", ease: "easeIn" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Instructor teaching"
                        className="w-full rounded-2xl shadow-lg object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default TeacherHero;
