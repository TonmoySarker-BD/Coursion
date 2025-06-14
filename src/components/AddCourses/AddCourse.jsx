import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaSpinner, FaCheck, FaUser } from 'react-icons/fa';
import { MdOutlineCategory, MdOutlineSchool } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';

const AddCourse = () => {
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Form state
    const [courseData, setCourseData] = useState({
        title: '',
        category: 'Design',
        difficulty: 'Beginner',
        description: '',
        duration: '',
        curriculum: [''],
        image: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle curriculum item changes
    const handleCurriculumChange = (index, value) => {
        const newCurriculum = [...courseData.curriculum];
        newCurriculum[index] = value;
        setCourseData(prev => ({
            ...prev,
            curriculum: newCurriculum
        }));
    };

    // Add new curriculum item
    const addCurriculumItem = () => {
        setCourseData(prev => ({
            ...prev,
            curriculum: [...prev.curriculum, '']
        }));
    };

    // Remove curriculum item
    const removeCurriculumItem = (index) => {
        if (courseData.curriculum.length > 1) {
            const newCurriculum = [...courseData.curriculum];
            newCurriculum.splice(index, 1);
            setCourseData(prev => ({
                ...prev,
                curriculum: newCurriculum
            }));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Validate required fields
            if (!courseData.title || !courseData.description) {
                throw new Error('Title and description are required');
            }

            // Prepare final course data
            const finalCourseData = {
                ...courseData,
                id: Date.now().toString(),
                dateAdded: new Date().toISOString().split('T')[0],
                rating: 0,
                students: 0,
                reviews: [],
                instructor: user?.displayName,
                instructorImage: user?.photoURL,
                createdBy: {
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                    timestamp: new Date().toISOString()
                },
                curriculum: courseData.curriculum.filter(item => item.trim() !== '')
            };

            console.log('Submitting course:', finalCourseData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                // Reset form
                setCourseData({
                    title: '',
                    category: 'Design',
                    difficulty: 'Beginner',
                    description: '',
                    duration: '',
                    curriculum: [''],
                    image: '',
                });
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white/10 rounded-xl shadow-md overflow-hidden p-6"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Create New Course</h2>
                    <p className="mt-2">
                        Fill out the form below to add a new course to our platform
                    </p>
                </div>

                {/* Course Created By Section */}
                {user && (
                    <div className="mb-6 p-4 bg-white/20 rounded-lg flex items-center space-x-4">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <FaUser className="text-xl" />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium">Course will be created by:</p>
                            <p className="font-medium">
                                {user.displayName || 'Anonymous User'}
                            </p>
                            <p className="text-sm">
                                {user.email || 'unknown@example.com'}
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {isSuccess && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                        <FaCheck className="mr-2" />
                        Course submitted successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Course Information
                        </h3>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium ">
                                Course Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={courseData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-2 border"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium ">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={courseData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-2 border"
                                    required
                                >
                                    <option value="Design">Design</option>
                                    <option value="Development">Development</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Photography">Photography</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium ">
                                    Difficulty Level *
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={courseData.difficulty}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-2 border"
                                    required
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium ">
                                Course Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={courseData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-2 border placeholder-black"
                                required
                                placeholder="Course Description"
                            />
                        </div>

                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium ">
                                Estimated Duration (e.g., '15 hours')
                            </label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  p-2 border placeholder-black"
                                placeholder="e.g., 15 hours"
                            />
                        </div>

                        <div>
                            <label htmlFor="totalSeat" className="block text-sm font-medium ">
                                Total Seat
                            </label>
                            <input
                                type="number"
                                id="totalSeat"
                                name="totalSeat"
                                value={courseData.totalSeat || ''}
                                onChange={handleChange}
                                min={1}
                                className="mt-1 placeholder-black block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                placeholder="e.g., 50"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium ">
                                Course Image URL
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={courseData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  placeholder-black p-2 border"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center">
                            <MdOutlineSchool className="mr-2" />
                            Curriculum
                        </h3>

                        {courseData.curriculum.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleCurriculumChange(index, e.target.value)}
                                    className="flex-1 block rounded-md border-gray-300 shadow-sm  placeholder-black p-2 border"
                                    placeholder={`Section ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeCurriculumItem(index)}
                                    className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                                    disabled={courseData.curriculum.length <= 1}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addCurriculumItem}
                            className="flex items-center px-4 py-2 bg-blue-50 text-success rounded-md hover:bg-blue-100"
                        >
                            <FaPlus className="mr-2" />
                            Add Section
                        </button>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : isSuccess ? (
                                <>
                                    <FaCheck className="mr-2" />
                                    Success!
                                </>
                            ) : (
                                'Submit Course'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddCourse;