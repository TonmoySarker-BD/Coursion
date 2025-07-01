// components/ReasonsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { div } from "framer-motion/client";

const ReasonsSection = ({ reasons }) => {
    // trigger the animation only once when 25% of the section is visible
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

    /** card entrance animation */
    const cardVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.15 },
        }),
    };

    return (
        <div className="mx-4">
            <section
                ref={ref}
                className="relative my-12 max-w-7xl mx-auto rounded-3xl bg-green-200/50 py-20  overflow-hidden lg:py-24"
            >
                {/* radial accent blobs */}
                <div className="pointer-events-none absolute -left-12 -top-12 h-72 w-72 rounded-full bg-green-800/30 blur-2xl dark:bg-green-700/20" />
                <div className="pointer-events-none absolute right-0 bottom-[-80px] h-72 w-72 rounded-full bg-emerald-900/40 blur-[100px]" />

                <div className="mx-auto max-w-6xl px-6">
                    {/* heading */}
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                            So many reasons to start
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Join thousands of instructors who are sharing their knowledge with
                            the world.
                        </p>
                    </div>

                    {/* cards */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {reasons.map((reason, i) => (
                            <motion.div
                                key={reason.title}
                                custom={i}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={cardVariants}
                                whileHover={{ scale: 1.04, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
                                className="group rounded-2xl bg-white p-8 shadow-sm transition-transform dark:bg-gray-800"
                            >
                                <div className="mb-4 text-green-600 group-hover:text-green-700 dark:text-green-400">
                                    {reason.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    {reason.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {reason.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReasonsSection;
