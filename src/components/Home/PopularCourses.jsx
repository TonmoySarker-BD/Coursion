import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSpinner, FaStar, FaRegStar, FaUserAlt, FaUsers } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";


const dummyCourses = [
    {
        id: "1",
        title: "Mastering React",
        dateAdded: "2025-06-09",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Frontend",
        difficulty: "Intermediate",
        description: "Build scalable UIs with React & Hooks. Learn modern React patterns and best practices.",
        rating: 4.8,
        students: 5420,
        duration: "24 hours",
        instructor: "Sarah Johnson"
    },
    {
        id: "2",
        title: "Python for Data Science",
        dateAdded: "2025-06-08",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Data Science",
        difficulty: "Beginner",
        description: "Start your journey with data using Python. From basics to data visualization.",
        rating: 4.6,
        students: 3870,
        duration: "18 hours",
        instructor: "Michael Chen"
    },
    {
        id: "3",
        title: "Advanced Node.js",
        dateAdded: "2025-06-07",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
        category: "Backend",
        difficulty: "Advanced",
        description: "Deep dive into scalable Node.js applications with microservices architecture.",
        rating: 4.9,
        students: 2150,
        duration: "30 hours",
        instructor: "David Wilson"
    },
    {
        id: "4",
        title: "UI/UX Design Basics",
        dateAdded: "2025-06-06",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Design",
        difficulty: "Beginner",
        description: "Learn UI/UX fundamentals with real projects and case studies.",
        rating: 4.7,
        students: 6890,
        duration: "15 hours",
        instructor: "Emma Rodriguez"
    },
    {
        id: "5",
        title: "Machine Learning with TensorFlow",
        dateAdded: "2025-06-05",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
        category: "AI",
        difficulty: "Intermediate",
        description: "Build ML models using TensorFlow and deploy them in production.",
        rating: 4.5,
        students: 4980,
        duration: "28 hours",
        instructor: "James Lee"
    },
    {
        id: "6",
        title: "Fullstack Web Development",
        dateAdded: "2025-06-04",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
        category: "Fullstack",
        difficulty: "Advanced",
        description: "Master frontend and backend development in one comprehensive course.",
        rating: 4.9,
        students: 7560,
        duration: "40 hours",
        instructor: "Sophia Martinez"
    },
];

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const sortedCourses = [...dummyCourses].sort(
                (a, b) => b.students - a.students
            );
            setCourses(sortedCourses);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-success text-4xl" />
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
                     Discover our most popular courses taught by industry experts. Join thousands of learners who have transformed their careers with our top-rated courses.
                </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-full">
                                {idx + 1 === 1 ? "Top Rated" : `#${idx + 1}`}
                            </div>
                            <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                <FaUsers className="mr-1" />
                                <span>{formatNumber(course.students)}</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                    course.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                    }`}>
                                    {course.difficulty}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center mr-4">
                                    <FaUserAlt className="mr-1" />
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
                                    <span>{new Date(course.dateAdded).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={() => navigate(`/courses/${course.id}`)}
                                    className="flex-1 px-4 py-2 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition-colors duration-200"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => navigate(`/enroll/${course.id}`)}
                                    className="flex-1 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/80 transition-colors duration-200"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate('/courses')}
                    className="px-6 py-3 bg-transparent border border-success text-success rounded-lg hover:bg-success/10 dark:hover:bg-success/20 transition-colors duration-200 font-medium"
                >
                    View All Courses
                </button>
            </div>
        </section>
    );
};

export default PopularCourses;