// components/EnrollButton.jsx
import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/Auth/AuthContext";
import api from "../../API/axios";


export default function EnrollButton({ courseId }) {
  const { user } = useContext(AuthContext);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    api
      .get(`/api/enroll?courseId=${courseId}`)
      .then(({ data }) => setEnrolled(data.enrolled))
      .catch(console.error);
  }, [user, courseId]);
  const handleEnroll = async () => {
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "Login required",
        text: "Please log in first to enroll in a course.",
        confirmButtonText: "Got it",
      });
    }

    if (enrolled || loading) return;
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
      await api.post("/api/enroll", { courseId });
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

  return (
    <button
      onClick={handleEnroll}
      disabled={loading || enrolled}
      className={`${
        enrolled || !user ? "bg-gray-400 cursor-default" : "bg-success hover:bg-success/90"
      } text-white px-6 py-2 rounded-full font-semibold transition flex items-center gap-2`}
    >
      {loading && <FaSpinner className="animate-spin" />}
      {!user ? "Login to Enroll" : enrolled ? "Enrolled" : "Enroll Now"}
    </button>
  );
}
