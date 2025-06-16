import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../context/Auth/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../API/axios";

const EditCourse = () => {
    const { user } = useContext(AuthContext);
    const api = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [courseData, setCourseData] = useState({
        title: "",
        category: "",
        difficulty: "",
        description: "",
        duration: "",
        students: 0,
        image: "",
        curriculum: [""],
        reviews: [],
        instructor: "",
        instructorImage: ""
    });

    // Fetch course data to edit
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/courses/${id}`);
                const data = response.data;

                setCourseData({
                    title: data.title || "",
                    category: data.category || "Design",
                    difficulty: data.difficulty || "Beginner",
                    description: data.description || "",
                    duration: data.duration || "",
                    students: data.students || 0,
                    image: data.image || "",
                    curriculum: data.curriculum?.length ? data.curriculum : [""],
                    reviews: data.reviews || [],
                    instructor: data.instructor || user?.displayName || "",
                    instructorImage: data.instructorImage || user?.photoURL || ""
                });
            } catch (error) {
                console.error("Error fetching course:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load course data",
                }).then(() => navigate("/my-courses"));
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, navigate, user, api]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCurriculumChange = (index, value) => {
        const newCurriculum = [...courseData.curriculum];
        newCurriculum[index] = value;
        setCourseData(prev => ({
            ...prev,
            curriculum: newCurriculum
        }));
    };

    const addCurriculumItem = () => {
        setCourseData(prev => ({
            ...prev,
            curriculum: [...prev.curriculum, ""]
        }));
    };

    const removeCurriculumItem = (index) => {
        if (courseData.curriculum.length <= 1) return;

        const newCurriculum = courseData.curriculum.filter((_, i) => i !== index);
        setCourseData(prev => ({
            ...prev,
            curriculum: newCurriculum
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Filter out empty curriculum items
            const filteredCurriculum = courseData.curriculum.filter(section => section.trim() !== "");

            const updatedCourse = {
                ...courseData,
                curriculum: filteredCurriculum.length ? filteredCurriculum : [""],
                lastUpdated: new Date().toISOString()
            };

            await api.put(`/courses/${id}`, updatedCourse);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Course updated successfully",
            }).then(() => navigate(`/courses/${id}`));
        } catch (error) {
            console.error("Error updating course:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update course",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="py-10 px-4">
            <div className="max-w-5xl mx-auto border p-6 rounded-md shadow-lg font-sans">
                <h2 className="text-2xl font-bold mb-2 text-center">Edit Course</h2>
                <p className="mb-6 text-center">
                    Update the course information below
                </p>

                {/* Instructor Info */}
                <div className="flex items-center bg-success rounded-md p-3 mb-6 space-x-4">
                    <img
                        src={courseData.instructorImage}
                        alt={courseData.instructor}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64';
                        }}
                    />
                    <div>
                        <p className="font-bold text-xl md:text-2xl">{courseData.instructor}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <h2 className='font-bold text-2xl'>Course Information</h2>
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="title">
                            Course Title *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={courseData.title}
                            onChange={handleChange}
                            placeholder="Course Title"
                            required
                            className="w-full border p-2 rounded-md"
                        />
                    </div>

                    {/* Category & Difficulty */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="category">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={courseData.category}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="difficulty">
                                Difficulty Level *
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={courseData.difficulty}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="description">
                            Course Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            placeholder="Course Description"
                            rows={4}
                            required
                            className="w-full border p-2 rounded-md"
                        />
                    </div>

                    {/* Duration and Students */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="duration">
                                Duration
                            </label>
                            <input
                                id="duration"
                                name="duration"
                                type="text"
                                value={courseData.duration}
                                onChange={handleChange}
                                placeholder="e.g., 15 hours"
                                className="w-full border p-2 rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="totalSeats">
                                Total Seats
                            </label>
                            <input
                                id="totalSeats"
                                name="totalSeats"
                                type="number"
                                value={Number(courseData.totalSeats)}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                                min={courseData.students} 
                            />
                            {courseData.totalSeats < courseData.students && (
                                <p className="text-red-500 text-sm mt-1">
                                    Total seats cannot be less than enrolled students ({courseData.students})
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="image">
                            Course Image URL
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="url"
                            value={courseData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border p-2 rounded-md"
                        />
                        {courseData.image && (
                            <div className="mt-2">
                                <img
                                    src={courseData.image}
                                    alt="Course preview"
                                    className="h-40 object-contain border rounded"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x150';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Curriculum */}
                    <div>
                        <label className="block mb-2 font-semibold">🎓 Curriculum</label>
                        {courseData.curriculum.map((section, idx) => (
                            <div key={idx} className="flex items-center mb-2 space-x-2">
                                <input
                                    type="text"
                                    className="flex-grow border p-2 rounded-md"
                                    value={section}
                                    onChange={(e) => handleCurriculumChange(idx, e.target.value)}
                                    placeholder={`Section ${idx + 1}`}
                                    required
                                />
                                {courseData.curriculum.length > 1 && (
                                    <button
                                        type="button"
                                        className="text-red-500 font-semibold px-2 py-1 rounded-md hover:bg-red-100 hover:text-red-700 transition"
                                        onClick={() => removeCurriculumItem(idx)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addCurriculumItem}
                            className="flex items-center space-x-1 text-green-600 hover:text-green-800 font-semibold mb-4"
                        >
                            <FaPlus /> <span>Add Section</span>
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/courses/${id}`)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 transition rounded-md py-3 font-semibold text-black flex justify-center items-center space-x-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-green-500 hover:bg-green-600 transition rounded-md py-3 font-semibold text-white flex justify-center items-center space-x-2"
                        >
                            {submitting ? <FaSpinner className="animate-spin" /> : 'Update Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourse;