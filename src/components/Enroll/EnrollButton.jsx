import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/Auth/AuthContext";
import useAxiosSecure from "../../API/axios";

export default function EnrollButton({ courseId, totalSeats, students }) {
    const { user } = useContext(AuthContext);
    const api = useAxiosSecure();
    const navigate = useNavigate();

    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seats, setSeats] = useState(students); // Track seats locally

    const seatsLeft = totalSeats - seats;
    const seatsFull = seatsLeft <= 0;

    useEffect(() => {
        const checkEnrollment = async () => {
            if (!user?.accessToken) return;
            try {
                const { data } = await api.get(`/enroll?courseId=${courseId}&userEmail=${user.email}`);
                setEnrolled(data.enrolled);
                if (data.students !== undefined) {
                    setSeats(data.students);
                }
            } catch (err) {
                console.error("Enrollment check error:", err);
            }
        };
        checkEnrollment();
    }, [user, api, courseId]);

    const handleClick = async () => {
        if (!user) return navigate("/signin");
        if (loading) return;

        if (enrolled) {
            const ok = await Swal.fire({
                title: "Remove your enrollment?",
                text: "You will lose access to the course.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, remove",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            });
            if (!ok.isConfirmed) return;

            try {
                setLoading(true);
                await api.delete(`/enroll?courseId=${courseId}&userEmail=${user.email}`);
                setEnrolled(false);
                setSeats(prev => prev - 1); // Decrement seat count
                await Swal.fire(
                    {
                icon: 'success',
                title: 'Removed',
                text: 'Your enrollment has been deleted.',
                showConfirmButton: false,
                timer: 2000
            }
            );
            } catch (err) {
                Swal.fire("Error", err.response?.data?.message || "Failed", "error");
            } finally {
                setLoading(false);
            }
            return;
        }

        if (seatsFull) return;

        const ok = await Swal.fire({
            title: "Enroll in this course?",
            text: `Only ${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} left`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, enroll me!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
        if (!ok.isConfirmed) return;

        try {
            setLoading(true);
            const response = await api.post("/enroll", {
                courseId,
                userEmail: user?.email
            });

            setEnrolled(true);
            setSeats(prev => prev + 1); // Increment seat count

            await Swal.fire({
                title: "Enrolled Successfully!",
                text: response?.data?.message || "Welcome aboard 🎉",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (err) {
            console.error("Enrollment error:", err);
            let errorMessage = "Failed to enroll in the course";
            if (err.response) {
                errorMessage = err.response.data?.message ||
                    err.response.statusText ||
                    "Server error occurred";
            } else if (err.request) {
                errorMessage = "No response from server. Please check your connection.";
            }
            await Swal.fire({
                title: "Enrollment Failed",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#d33"
            });
        } finally {
            setLoading(false);
        }
    };

    if (seatsFull && !enrolled)
        return (
            <div className="flex-1 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-center">
                No seats left
            </div>
        );

    const seatsBadge = !enrolled && seatsLeft > 0 && (
        <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
            {seatsLeft} left
        </span>
    );

    let label = enrolled ? "Remove Enrollment" : "Enroll Now";
    if (!user) label = "Login to Enroll";

    return (
        <button
            onClick={handleClick}
            disabled={loading || (seatsFull && !enrolled)}
            className={`px-4 py-2 text-white rounded-lg transition
                ${enrolled ? "bg-red-500 hover:bg-red-600" : "bg-success hover:bg-success/90"}
                ${(seatsFull && !enrolled) ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {label}
            {seatsBadge}
        </button>
    );
}