import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {FaStar,FaRegStar} from "react-icons/fa";
import { isCancel } from "axios";
import useAxiosSecure from "../../API/axios";
import CourseCard from "../shared/CourseCard";


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
        <section className="py-16 px-4 sm:px-6 lg:px-8 container mx-auto">
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

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {courses.map((course , idx) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        index={idx}
                    />
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
