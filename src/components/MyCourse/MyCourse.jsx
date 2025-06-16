import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaTrash, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../context/Auth/AuthContext";
import useAxiosSecure from "../../API/axios";

const MyCourse = () => {
    const { user } = use(AuthContext);
    const api = useAxiosSecure();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "My Enrolled Courses - Coursion";
        if (!user) return;

        const controller = new AbortController();
        setLoading(true);

        api
            .get(`/my-enrollments?email=${user.email}`, { signal: controller.signal })
            .then((res) => {
                setEnrollments(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return;
                console.error("Fetch error:", err);
                setError("Failed to load your enrolled courses");
                setLoading(false);
            });

        return () => controller.abort();
    }, [user, api]);

    const handleRemove = async (enrollmentId) => {
        const res = await Swal.fire({
            title: "Remove this enrollment?",
            text: "You will lose access to the course materials.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            reverseButtons: true,
        });

        if (!res.isConfirmed) return;

        try {
            await api.delete(`/enroll/${enrollmentId}`);
            setEnrollments((prev) => prev.filter((e) => e._id !== enrollmentId));
            Swal.fire("Removed!", "Your enrollment has been deleted.", "success");
        } catch (err) {
            console.error("Remove enrollment error:", err);
            Swal.fire("Error!", "Failed to remove enrollment.", "error");
        }
    };

    if (!user) {
        return (
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Please log in to view your enrolled courses
                </h2>
                <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

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
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">My Enrolled Courses</h2>

            {enrollments.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg mb-4">
                        You haven’t enrolled in any courses yet
                    </p>
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-gray-500 text-sm font-medium">
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Enrolled On</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {enrollments.map(({ _id, course, enrolledAt }) => (
                                    <tr key={_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/courses/${course._id}`}
                                                className="flex items-center gap-4"
                                            >
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/48";
                                                    }}
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {course.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </td>

                                        <td className="px-6 py-4 text-gray-700">
                                            {new Date(enrolledAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleRemove(_id)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remove Enrollment"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCourse;