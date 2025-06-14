import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar, FaUserAlt, FaClock, FaUsers } from "react-icons/fa";
import api from "../../API/axios";
import { isCancel } from "axios";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        api.get(`/courses/${id}`, { signal: controller.signal })
            .then((res) => setCourse(res.data))
            .catch((err) => {
                if (isCancel(err)) return;
                setError(err || "Failed to load course");
                console.error("Other error:", error);
            });

        return () => controller.abort();
    }, [id, error]);

    if (!course) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white/10 shadow-md rounded-2xl overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <h2 className="text-3xl font-semibold mb-2">{course.title}</h2>
                    <p className="text-sm mb-4">{course.category} • {course.difficulty}</p>
                    <p className=" mb-4">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm flex-wrap mb-6">
                        <div className="flex items-center gap-1"><FaUserAlt /> {course.instructor}</div>
                        <div className="flex items-center gap-1"><FaUsers /> {course.students} Students</div>
                        <div className="flex items-center gap-1"><FaClock /> {course.duration}</div>
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" /> {course.rating}
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

                    <div className="mb-6">
                        <h3 className="text-xl font-medium mb-2">Student Reviews</h3>
                        <div className="space-y-2">
                            {course.reviews.map((review, idx) => (
                                <div key={idx} className="p-3 border rounded-md">
                                    <p className="font-medium">{review.name}</p>
                                    <p className="text-sm ">{review.comment}</p>
                                    <p className="text-yellow-500">
                                        {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                                            <FaStar key={i} className="inline" />
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="bg-success text-white px-6 py-2 rounded-full font-semibold transition">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
