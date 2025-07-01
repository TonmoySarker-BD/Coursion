import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSpinner, FaStar, FaRegStar, FaUsers } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { isCancel } from "axios";
import EnrollButton from "../Enroll/EnrollButton";
import useAxiosSecure from "../../API/axios";
import CourseCard from "../shared/CourseCard";

const Courses = () => {
    const api = useAxiosSecure();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* filters */
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");

    const navigate = useNavigate();
    useEffect(() => {
        document.title = "All Courses - Coursion";
        const controller = new AbortController();
        setLoading(true);
        api
            .get("/courses", { signal: controller.signal })
            .then((res) => {
                setCourses(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                if (isCancel(err)) return; // silent abort
                console.error("Fetch error:", err);
                setError("Failed to load courses");
                setLoading(false);
            });

        return () => controller.abort();
    }, [api]);

    const filtered = useMemo(() => {
        let list = [...courses];

        // search
        if (search.trim()) {
            const term = search.toLowerCase();
            list = list.filter(
                (c) =>
                    c.title.toLowerCase().includes(term) ||
                    c.instructor.toLowerCase().includes(term)
            );
        }

        // difficulty
        if (difficulty !== "All") list = list.filter((c) => c.difficulty === difficulty);

        // sort
        switch (sortBy) {
            case "Enrollment":
                list.sort((a, b) => b.students - a.students);
                break;
            case "Rating":
                list.sort((a, b) => b.rating - a.rating);
                break;
            default: // Newest
                list.sort((a, b) => new Date(b.createdBy.timestamp) - new Date(a.createdBy.timestamp));
        }

        return list;
    }, [courses, search, difficulty, sortBy]);

    const bannerLabel = sortBy === "Rating"
        ? "Top Rated"
        : sortBy === "Enrollment"
            ? "Most Enrolled"
            : "Newest";


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
            <div className="text-center py-12 text-red-500 font-medium">
                {error}
                <button
                    className="block mt-4 mx-auto px-4 py-2 bg-success text-white rounded-lg"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );

    return (
        <main className="pb-20">

            <section className="relative bg-success/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Explore All <span className="text-success">Courses</span>
                    </h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        Sharpen your skills with hundreds of expert‑led lessons. Filter,
                        sort, and find the perfect match for your learning journey.
                    </p>

                    {/* Stats */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <div className="px-6 py-3 bg-white/10 rounded-lg shadow">
                            <span className="text-2xl font-bold text-success">
                                {nFmt(courses.length)}
                            </span>{" "}
                            courses
                        </div>
                        <div className="px-6 py-3 bg-white/10 rounded-lg shadow">
                            <span className="text-2xl font-bold text-success">
                                {nFmt(courses.reduce((sum, c) => sum + (c.students || 0), 0))}
                            </span>{" "}
                            learners
                        </div>
                    </div>

                    {/* Filters */}
                    <section className="max-w-7xl my-6 mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white/50 text-black rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center gap-4">
                            {/* Search */}
                            <input
                                type="search"
                                placeholder="Search by course or instructor"
                                className="flex-1 h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-success transition"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* Difficulty */}
                            <select
                                className="h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-success transition"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}

                            >
                                <option value="All">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            {/* Sort */}
                            <select
                                className="h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-success transition"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="Newest">Newest</option>
                                <option value="Enrollment">Most Enrolled</option>
                                <option value="Rating">Top Rated</option>
                            </select>
                        </div>
                    </section>
                </div>
            </section>

            <section className="pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filtered.length === 0 ? (
                    <p className="text-center">No courses match your criteria.</p>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((course, idx) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                index={idx}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Courses;
