import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSpinner, FaStar, FaRegStar, FaUsers } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { isCancel } from "axios";
import useAxiosSecure from "../../API/axios";
import CourseCard from "../shared/CourseCard";

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

    // const renderStars = (rating) => {
    //     const stars = [];
    //     const full = Math.floor(rating);
    //     const half = rating % 1 >= 0.5;
    //     for (let i = 1; i <= 5; i++) {
    //         if (i <= full) stars.push(<FaStar key={i} className="text-yellow-400" />);
    //         else if (i === full + 1 && half)
    //             stars.push(<FaStar key={i} className="text-yellow-400" />);
    //         else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    //     }
    //     return stars;
    // };

    // const nFmt = (n) => new Intl.NumberFormat().format(n);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your courses...</p>
            </div>
        );
    }

    if (error)
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                {error}
            </div>
        );

    return (
        <section className="bg-gray-200/30">
            <div className="container py-16 px-4 sm:px-6 lg:px-8  mx-auto">

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
                    <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
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
            </div>
        </section>
    );
};
export default LatestCourses;
