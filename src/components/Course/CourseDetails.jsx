import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar, FaUserAlt, FaClock, FaUsers } from "react-icons/fa";
import { isCancel } from "axios";
import EnrollButton from "../Enroll/EnrollButton";
import useAxiosSecure from "../../API/axios";
import ReviewForm from "../Review/ReviewForm";
import ReviewList from "../Review/ReviewList";
import { AuthContext } from "../../context/Auth/AuthContext";
import ShareCourse from "../shared/ShareCourse";

const CourseDetails = () => {
    const { user } = use(AuthContext);
    const api = useAxiosSecure();
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(false);



    useEffect(() => {
        const controller = new AbortController();
        api.get(`/courses/${id}`, { signal: controller.signal })
            .then((res) => setCourse(res.data))
            .catch((err) => {
                if (isCancel(err)) return;
                setError(err || "Failed to load course");
                console.error("Other error:", error);
            });

        document.title = `${course ? course.title : "Course Details"}`;
        if (!user?.accessToken) return;

        api.get(`/enroll?courseId=${id}&userEmail=${user.email}`)
            .then(({ data }) => {
                setEnrolled(data.enrolled);
            })
            .catch(console.error);

        return () => controller.abort();
    }, [id, error, api, course, user]);

    if (!course)
        return <div className="max-w-5xl mx-auto py-10 px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white/10 shadow-md rounded-2xl overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-96 object-cover"
                />

                <div className="p-6">
                    <h2 className="text-3xl font-semibold mb-2">{course.title}</h2>
                    <div className="flex items-center justify-between mb-4">
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    i < Math.floor(course.rating) ? (
                                        <FaStar key={i} className="text-yellow-400 text-sm" />
                                    ) : (
                                        <FaStar key={i} className="text-gray-300 text-sm" />
                                    )
                                ))}
                            </div>
                            <span className="font-medium ">
                                {course.rating.toFixed(1)} ({course.reviews?.length || 0} reviews)
                            </span>
                        </div>
                        {/* Duration */}
                        <div className="flex items-center gap-2">
                            <FaClock className="text-purple-500" />
                            <span>{course.duration}</span>
                        </div>
                    </div>



                    <p className="text-lg font-semibold mb-4"> • {course.category} • {course.difficulty}</p>


                    <p className=" mb-4">{course.description}</p>

                    <div className="flex items-center gap-6 flex-wrap mb-8 py-4 border-b border-gray-100">
                        {/* Instructor */}
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-success shadow-sm">
                                <img
                                    src={course.instructorImage}
                                    alt={course.instructor}
                                    className="w-full h-full object-cover"

                                />
                            </div>
                            <div className="flex flex-col">

                                <span className="font-bold text-3xl">{course.instructor}</span>
                                {/* Students */}
                                <div className="flex items-center gap-2">
                                    <FaUsers className="text-blue-500" />
                                    <span>{course.students.toLocaleString()} Students</span>
                                </div>
                            </div>
                        </div>






                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-medium mb-2">What You'll Learn</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {course.curriculum.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>


                    <div className="flex items-center justify-between flex-wrap gap-4">

                        <EnrollButton
                            courseId={course._id}
                            totalSeats={course.totalSeats}
                            students={course.students}
                        ></EnrollButton>
                        <ShareCourse courseId={course._id} />
                    </div>

                </div>
            </div>

            <div className="space-y-10 mt-10">
                {/* Review Form Section */}
                <div className="text-center">
                    {enrolled ? (
                        <ReviewForm courseId={course._id} />
                    ) : (
                        <div className="p-6 bg-white/10 shadow-lg rounded-3xl max-w-7xl mx-auto">
                            <p className="text-2xl font-semibold mb-3">You must enroll in the course to leave a review.</p>

                        </div>
                    )}
                </div>

                {/* Reviews List Section */}
                <ReviewList reviews={course.reviews} />
            </div>
        </div>
    );
};

export default CourseDetails;
