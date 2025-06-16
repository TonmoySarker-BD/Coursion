import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";

const ReviewList = ({ reviews }) => {
    return (
        <div className="mb-10 bg-white/10 rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Student Reviews</h3>

            <div className="space-y-5">
                {reviews?.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id || review.createdAt}
                            className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="flex-shrink-0">
                                    {review.image ? (
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-gray-400 text-3xl" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                        <span className="text-xs text-gray-500">
                                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                                        </span>
                                    </div>

                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.round(review.rating) ? (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ) : (
                                                <FaRegStar key={i} className="text-yellow-400 text-sm" />
                                            )
                                        ))}
                                    </div>

                                    <p className="text-black text-left">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;