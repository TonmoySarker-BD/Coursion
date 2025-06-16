import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/Auth/AuthContext";
import useAxiosSecure from "../../API/axios";

export default function EnrollButton({ courseId, totalSeats, students }) {
    const { user } = useContext(AuthContext);
    const api = useAxiosSecure();
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const seatsFull = students >= totalSeats;

    useEffect(() => {
        if (!user?.accessToken) return;
        api
            .get(`/enroll?courseId=${courseId}&userEmail=${user.email}`)
            .then(({ data }) => setEnrolled(data.enrolled))
            .catch(console.error);
    }, [user,api, courseId]);

    const handleEnroll = async () => {
        if (!user) {
            return navigate("/signin");
        }

        if (enrolled || loading || seatsFull) return;

        const { isConfirmed } = await Swal.fire({
            title: "Enroll in this course?",
            text: "Your seat will be reserved immediately.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, enroll me!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
        if (!isConfirmed) return;

        try {
            setLoading(true);
            await api.post("/enroll", { courseId, userEmail: user.email });
            setEnrolled(true);
            await Swal.fire({
                icon: "success",
                title: "Enrolled!",
                text: "Welcome aboard — happy learning! 🎉",
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops…",
                text: err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    let buttonText = "Enroll Now";
    if (!user) buttonText = "Login to Enroll";
    else if (enrolled) buttonText = "Enrolled";
    else if (seatsFull) buttonText = "Seat Unavailable";

    return (
        <button
            onClick={handleEnroll}
            disabled={enrolled || loading || seatsFull}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors duration-200
                ${ enrolled || seatsFull
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-success hover:bg-success/90"
                }`}
        >
            {loading && <FaSpinner className="animate-spin" />}
            {buttonText}
        </button>
    );
}
