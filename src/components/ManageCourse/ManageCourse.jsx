import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/Auth/AuthContext";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import api from "../../API/axios";
import { isCancel } from "axios";

const ManageCourse = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        api.get(`/my-courses?email=${user.email}`, { signal: controller.signal })
            .then(res => {
                setCourses(res.data || []);
                setLoading(false);
            })
            .catch(err => {
                if (isCancel(err)) return;
                console.error("Fetch error:", err);
                setError("Failed to load your courses");
                setLoading(false);
            });

        return () => controller.abort();
    }, [user]);

    const handleDelete = async (courseId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/course/${courseId}`);
                setCourses(prev => prev.filter(course => course._id !== courseId));
                Swal.fire("Deleted!", "Course has been deleted.", "success");
            } catch (err) {
                console.error("Delete error:", err);
                Swal.fire("Error!", "Failed to delete course.", "error");
            }
        }
    };

    if (!user) {
        return (
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Please log in to manage your courses</h2>
                <button
                    onClick={() => navigate('/login')}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold ">Manage Your Courses</h2>
                <button
                    onClick={() => navigate('/add-course')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <span>+</span> Add New Course
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg mb-4">You haven't created any courses yet</p>
                    <button
                        onClick={() => navigate('/add-course')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Create Your First Course
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-gray-500 text-sm font-medium">
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Enrolled</th>
                                    <th className="px-6 py-4">Remaining</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {courses.map(course => (
                                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <Link to={`/courses/${course._id}`} className="flex items-center gap-4">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/48';
                                                    }}
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <span>{course.totalSeats}</span>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <span>{course.students}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <span>{course.totalSeats-course.students}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => navigate(`/edit-course/${course._id}`)}
                                                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course._id)}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
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

export default ManageCourse;