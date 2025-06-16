import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSpinner, FaStar, FaRegStar, FaUsers } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { isCancel } from "axios";
import EnrollButton from "../Enroll/EnrollButton";
import useAxiosSecure from "../../API/axios";

const LatestCourses = () => {
    const api = useAxiosSecure();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        api
            .get("/latest-courses", { signal: controller.signal })
            .then((res) => {
                setCourses(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                if (isCancel(err)) return;
                console.error("Fetch error:", err);
                setError("Failed to load latest courses");
                setLoading(false);
            });

        return () => controller.abort();
    }, [api]);

    const renderStars = (rating) => {
        const stars = [];
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        for (let i = 1; i <= 5; i++) {
            if (i <= full) stars.push(<FaStar key={i} className="text-yellow-400" />);
            else if (i === full + 1 && half)
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };

    const nFmt = (n) => new Intl.NumberFormat().format(n);

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-success text-4xl" />
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                {error}
            </div>
        );

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Latest <span className="text-success">Courses</span>
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                    Explore our newest courses just added to the platform. Stay ahead in
                    your learning journey with fresh content from top instructors.
                </p>
            </motion.div>

            {courses.length ? (
                <>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((c, idx) => (
                            <motion.div
                                key={c._id ?? c.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-xl"
                            >
                                <div className="relative">
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-full">
                                        New
                                    </div>
                                    <div className="absolute bg-success bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                        <FaUsers className="mr-1" />
                                        <span >{nFmt(c.students)}</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl text-black font-bold line-clamp-1">{c.title}</h3>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${c.difficulty === "Beginner"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                : c.difficulty === "Intermediate"
                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                                }`}
                                        >
                                            {c.difficulty}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {c.description}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center mr-4">
                                            <img
                                                src={c.instructorImage}
                                                alt=""
                                                className="w-10 h-10 rounded-full mr-4"
                                            />
                                            <span>{c.instructor}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <IoTimeOutline className="mr-1" />
                                            <span>{c.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {renderStars(c.rating)}
                                            <span className="ml-1">({c.rating.toFixed(1)})</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MdOutlineDateRange className="mr-1" />
                                            <span>
                                                {new Date(c.dateAdded).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            onClick={() => navigate(`/courses/${c._id}`)}
                                            className="flex-1 px-4 py-2 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition"
                                        >
                                            View Details
                                        </button>
                                        <EnrollButton
                                            courseId={c._id}
                                            totalSeats={c.totalSeats}
                                            students={c.students}
                                        ></EnrollButton>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/courses")}
                            className="px-6 py-3 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition font-medium"
                        >
                            View All Courses
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    No courses available at the moment
                </div>
            )}
        </section>
    );
};
export default LatestCourses;
