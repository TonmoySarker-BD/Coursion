import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
            >
                <div className="bg-green-600 p-6 text-center">
                    <motion.h1
                        className="text-6xl font-bold text-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        404
                    </motion.h1>
                </div>

                <div className="p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <svg
                            className="w-24 h-24 mx-auto text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Oops! Page Not Found</h2>
                    <p className="text-gray-600 mt-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            <FaHome /> Go Home
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            <FaSearch /> Back to Previous
                        </motion.button>
                    </div>

                    <div className="mt-8">
                        <p className="text-gray-500 text-sm">
                            Need help?{" "}
                            <a href="/contact" className="text-green-600 hover:underline">
                                Contact our support team
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;