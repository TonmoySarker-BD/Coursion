import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUserGraduate, FaCertificate, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

const stats = [
    {
        label: "Students Enrolled",
        value: 5000,
        suffix: "+",
        icon: <FaUserGraduate className="text-4xl" />,
        color: "from-purple-500 to-indigo-500",
        delay: 0.1
    },
    {
        label: "Certified Courses",
        value: 200,
        suffix: "+",
        icon: <FaCertificate className="text-4xl" />,
        color: "from-blue-500 to-cyan-500",
        delay: 0.2
    },
    {
        label: "Expert Instructors",
        value: 100,
        suffix: "+",
        icon: <FaChalkboardTeacher className="text-4xl" />,
        color: "from-orange-500 to-amber-500",
        delay: 0.3
    },
    {
        label: "Learning Hours",
        value: 10000,
        suffix: "+",
        icon: <FaBookOpen className="text-4xl" />,
        color: "from-green-500 to-emerald-500",
        delay: 0.4
    }
];

const PlatformStats = () => {
    return (
        <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  dark:text-white mb-4">
                        Our Learning Community <span className=" bg-clip-text text-success">By Numbers</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Join thousands of learners who have transformed their careers with our courses
                    </p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: stat.delay }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:duration-300 animate-tilt" />
                            <div className={`relative bg-white/30 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center group-hover:scale-105`}>
                                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4`}>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    <CountUp
                                        end={stat.value}
                                        duration={10}
                                        separator=","
                                        enableScrollSpy
                                        scrollSpyOnce
                                    />
                                    {stat.suffix}
                                </div>
                                <p className="text-lg font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <button className="px-8 py-3 bg-success text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        Join Our Community
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default PlatformStats;