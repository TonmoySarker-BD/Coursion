import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
    FaSpinner,
    FaStar,
    FaRegStar,
    FaUsers,
} from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { isCancel } from "axios";
import EnrollButton from "../Enroll/EnrollButton";
import useAxiosSecure from "../../API/axios";


const PopularCourses = () => {
    const api = useAxiosSecure();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        api.get("/popular-courses", { signal: controller.signal })
            .then((res) => {
                setCourses(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                if (isCancel(err)) return;
                console.error("Fetch error:", err);
                setError("Failed to load popular courses");
                setLoading(false);
            });

        return () => controller.abort();
    }, [api]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return stars;
    };

    const formatNumber = (num) => new Intl.NumberFormat().format(num);

     if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500 font-medium">
                {error}
            </div>
        );
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Most Popular <span className="text-success">Courses</span>
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                    Discover our most popular courses taught by industry experts. Join
                    thousands of learners who have transformed their careers with our
                    top-rated courses.
                </p>
            </motion.div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-full">
                                {idx === 0 ? "Top Rated" : `#${idx + 1}`}
                            </div>
                            <div className="absolute bottom-3 left-3 bg-success dark:text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                <FaUsers className="mr-1" />
                                <span>{formatNumber(course.students)}</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${course.difficulty === "Beginner"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : course.difficulty === "Intermediate"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                        : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                    }`}>
                                    {course.difficulty}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center mr-4">
                                    <img src={course.instructorImage} alt="" className="w-10 h-10 rounded-full mr-4" />
                                    <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center">
                                    <IoTimeOutline className="mr-1" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {renderStars(course.rating)}
                                    <span className="ml-1 text-gray-700 dark:text-gray-300">
                                        ({course.rating.toFixed(1)})
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <MdOutlineDateRange className="mr-1" />
                                    <span>
                                        {new Date(course.dateAdded).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={() => navigate(`/courses/${course._id}`)}
                                    className="flex-1 px-4 py-2 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition-colors duration-200"
                                >
                                    View Details
                                </button>
                                <EnrollButton
                                    courseId={course._id}
                                    totalSeats={course.totalSeats}
                                    students={course.students}
                                ></EnrollButton>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/courses")}
                    className="px-6 py-3 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition-colors duration-200 font-medium"
                >
                    View All Courses
                </button>
            </div>
        </section>
    );
};

export default PopularCourses;
