import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const StatsSection = ({ stats }) => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="mx-4">
            <section className="max-w-7xl mx-auto py-20 my-12 rounded-3xl bg-green-200/50">
                <div className="px-6">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Global Community
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Join a community that's helping millions of learners around the world.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow hover:shadow-md transition duration-300"
                            >
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                    <CountUp
                                        end={parseFloat(stat.value)}
                                        duration={5}
                                        separator=","
                                        suffix={stat.suffix || ""}
                                    />
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default StatsSection;
