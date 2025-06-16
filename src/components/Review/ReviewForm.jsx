import { useState, useContext } from "react";
import StarRating from "./StarRating";
import useAxiosSecure from "../../API/axios";
import { AuthContext } from "../../context/Auth/AuthContext";
import Swal from "sweetalert2";

export default function ReviewForm({ courseId, onAdded }) {
    const api = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        comment: "",
        rating: 0,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const reviewData = {
            name: user?.displayName || "Anonymous",
            image: user?.photoURL || "",
            ...form,
        };

        try {
            const res = await api.post(`/courses/${courseId}/reviews`, reviewData);

            // Success SweetAlert
            await Swal.fire({
                title: "Success!",
                text: "Your review has been submitted",
                icon: "success",
                confirmButtonColor: "#16a34a", // green-600
            });

            onAdded?.(res.data.review);
            setForm({ comment: "", rating: 0 });

        } catch (err) {
            // Error SweetAlert
            await Swal.fire({
                title: "Error!",
                text: err.response?.data?.message || "Failed to submit review",
                icon: "error",
                confirmButtonColor: "#dc2626", // red-600
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 p-6 rounded-xl shadow-lg bg-white/10"
        >
            <h3 className="text-xl font-semibold text-left">Leave a review</h3>

            <div className="flex items-center gap-3">
                <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover border"
                />
                <span className="font-medium text-left">{user?.displayName}</span>
            </div>

            <div className="text-left">
                <label className="block mb-1 font-medium">Comment*</label>
                <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border rounded px-3 py-2 bg-white text-gray-800"
                />
            </div>

            <div className="text-left">
                <label className="block mb-1 font-medium">Rating*</label>
                <StarRating
                    value={form.rating}
                    onChange={(r) => setForm({ ...form, rating: r })}
                />
            </div>

            <div className="text-left">
                <button
                    disabled={loading}
                    className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 disabled:opacity-60 transition-colors"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </div>
        </form>
    );
}