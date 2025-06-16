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

    const seatsLeft = totalSeats - students;
    const seatsFull = seatsLeft <= 0;

    useEffect(() => {
        if (!user?.accessToken) return;
        api
            .get(`/enroll?courseId=${courseId}&userEmail=${user.email}`)
            .then(({ data }) => {
                setEnrolled(data.enrolled);
            })
            .catch(console.error);
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
                Swal.fire("Removed", "Your enrollment has been deleted.", "success");
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
            await api.post("/enroll", { courseId, userEmail: user.email });
            setEnrolled(true);
            Swal.fire("Enrolled!", "Welcome aboard 🎉", "success");
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed", "error");
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

    const seatsBadge = !enrolled && (
        <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
            {seatsLeft} left
        </span>
    );

    let label = enrolled ? "Remove Enrollment" : "Enroll Now";
    if (!user) label = "Login to Enroll";

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition
        ${enrolled ? "bg-red-500 hover:bg-red-600" : "bg-success hover:bg-success/90"}`}
        >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {label}
            {seatsBadge}
        </button>
    );
}
