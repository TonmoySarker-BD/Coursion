import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa";

// Dummy course data
const dummyCourses = [
    {
        id: "1",
        title: "Mastering React",
        dateAdded: "2025-06-09",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "Frontend",
        difficulty: "Intermediate",
        description: "Build scalable UIs with React & Hooks."
    },
    {
        id: "2",
        title: "Python for Data Science",
        dateAdded: "2025-06-08",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "Data Science",
        difficulty: "Beginner",
        description: "Start your journey with data using Python."
    },
    {
        id: "3",
        title: "Advanced Node.js",
        dateAdded: "2025-06-07",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "Backend",
        difficulty: "Advanced",
        description: "Deep dive into scalable Node.js apps."
    },
    {
        id: "4",
        title: "UI/UX Design Basics",
        dateAdded: "2025-06-06",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "Design",
        difficulty: "Beginner",
        description: "Learn UI/UX fundamentals with real projects."
    },
    {
        id: "5",
        title: "Machine Learning with TensorFlow",
        dateAdded: "2025-06-05",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "AI",
        difficulty: "Intermediate",
        description: "Build ML models using TensorFlow."
    },
    {
        id: "6",
        title: "Fullstack Web Development",
        dateAdded: "2025-06-04",
        image: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877753.jpg?ga=GA1.1.1463847427.1747769307&semt=ais_hybrid&w=740",
        category: "Fullstack",
        difficulty: "Advanced",
        description: "Master frontend and backend in one course."
    },
];

const LatestCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Simulate fetch with timeout
    useEffect(() => {
        setTimeout(() => {
            // Sort by latest
            const sortedCourses = [...dummyCourses].sort(
                (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
            );
            setCourses(sortedCourses);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-success text-4xl" />
            </div>
        );
    }

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        className=" dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-2000 hover:scale-105 hover:shadow-lg"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 94, 170, 0.3), rgba(104, 68, 217, 0.3))'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                        <div className="p-5 space-y-3 ">
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="text-sm">Added: {course.dateAdded}</p>
                            <p className="">{course.description}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <span className="badge badge-outline badge-success">{course.category}</span>
                                <span className="badge badge-outline badge-info">{course.difficulty}</span>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <button
                                    onClick={() => navigate(`/courses/${course.id}`)}
                                    className="btn btn-outline btn-success w-full"
                                >
                                    Details
                                </button>

                                <button className="btn btn-sm btn-success w-full">
                                    Enroll Now
                                </button>

                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LatestCourses;
