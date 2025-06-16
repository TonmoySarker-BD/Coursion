import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../API/axios';

const AddCourse = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const api = useAxiosSecure();
    const [courseData, setCourseData] = useState({
        title: '',
        category: 'Design',
        difficulty: 'Beginner',
        description: '',
        duration: '',
        totalSeats: '',
        image: '',
        curriculum: ['Section 1'],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCurriculumChange = (index, value) => {
        const newCurriculum = [...courseData.curriculum];
        newCurriculum[index] = value;
        setCourseData((prev) => ({
            ...prev,
            curriculum: newCurriculum,
        }));
    };

    const addCurriculumItem = () => {
        setCourseData((prev) => ({
            ...prev,
            curriculum: [...prev.curriculum, `Section ${prev.curriculum.length + 1}`],
        }));
    };

    const removeCurriculumItem = (index) => {
        if (courseData.curriculum.length > 1) {
            const newCurriculum = [...courseData.curriculum];
            newCurriculum.splice(index, 1);
            setCourseData((prev) => ({
                ...prev,
                curriculum: newCurriculum,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!courseData.title.trim() || !courseData.description.trim()) {
                throw new Error('Course Title and Description are required.');
            }

            const finalCourseData = {
                ...courseData,
                dateAdded: new Date().toISOString().split('T')[0],
                rating: 0,
                students: 0,
                reviews: [],
                instructor: user?.displayName || 'Unknown',
                instructorImage: user?.photoURL || '',
                createdBy: {
                    email: user?.email || '',
                    name: user?.displayName || '',
                    image: user?.photoURL || '',
                    timestamp: new Date().toISOString(),
                },
                curriculum: courseData.curriculum.filter((item) => item.trim() !== ''),
            };

            const response = await api.post('/add-course', finalCourseData);

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Course added successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setCourseData({
                    title: '',
                    category: 'Design',
                    difficulty: 'Beginner',
                    description: '',
                    duration: '',
                    totalSeats: '',
                    image: '',
                    curriculum: ['Section 1'],
                });

                setTimeout(() => {
                    navigate('/manage-courses');
                }, 1500);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error submitting course.';
            setError(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });


        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-10 px-4">
            <div className="max-w-7xl mx-auto border p-6 rounded-md shadow-lg font-sans">
                <h2 className="text-2xl font-bold mb-2 text-center">Create New Course</h2>
                <p className="mb-6 text-center">
                    Fill out the form below to add a new course to our platform
                </p>

                {/* Instructor Info */}
                <div className="flex items-center bg-success rounded-md p-3 mb-6 space-x-4">
                    <img
                        src={user?.photoURL}
                        alt={user?.displayName || 'Instructor'}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-bold text-xl md:text-2xl">{user?.displayName || 'Instructor Name'}</p>
                        <p className="">{user?.email}</p>
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
                            className="w-full border p-2 text-black placeholder:text-black rounded-md"
                        />
                    </div>

                    {/* Category & Difficulty */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="category">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={courseData.category}
                                onChange={handleChange}
                                className="w-full border p-2 text-black placeholder:text-black rounded-md"
                            >
                                <option>Design</option>
                                <option>Development</option>
                                <option>Marketing</option>
                                <option>Business</option>
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
                                className="w-full border p-2 text-black placeholder:text-black rounded-md"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
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
                            className="w-full border p-2 text-black placeholder:text-black rounded-md"
                        />
                    </div>

                    {/* Duration and Total Seats */}
                    <div className="flex space-x-4">
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
                                className="w-full border p-2 text-black placeholder:text-black rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold" htmlFor="totalSeats">
                                Total Seat
                            </label>
                            <input
                                id="totalSeats"
                                name="totalSeats"
                                type="number"
                                value={courseData.totalSeats}
                                onChange={handleChange}
                                placeholder="e.g., 50"
                                className="w-full border p-2 text-black placeholder:text-black rounded-md"
                                min={1}
                            />
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
                            className="w-full border p-2 text-black placeholder:text-black rounded-md"
                        />
                    </div>

                    {/* Curriculum */}
                    <div>
                        <label className="block mb-2 font-semibold">🎓 Curriculum</label>
                        {courseData.curriculum.map((section, idx) => (
                            <div key={idx} className="flex items-center mb-2 space-x-2">
                                <input
                                    type="text"
                                    className="flex-grow border p-2 text-black placeholder:text-black rounded-md"
                                    value={section}
                                    onChange={(e) => handleCurriculumChange(idx, e.target.value)}
                                    placeholder={`Section ${idx + 1}`}
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
                            className="flex items-center space-x-1 text-green-400 hover:text-green-600 font-semibold mb-4"
                        >
                            <FaPlus /> <span>Add Section</span>
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-400 hover:bg-green-500 transition rounded-md py-3 font-semibold text-black flex justify-center items-center space-x-2"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : 'Submit Course'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
