// components/CourseCard.jsx
import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={`half-${i}`} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  const formatNumber = (num) => new Intl.NumberFormat().format(num);


  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <motion.div
      key={course._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 transition"
      onClick={() => navigate(`/courses/${course._id}`)}
    >
      {/* Course Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="flex justify-between items-center absolute bottom-3 left-3 right-3">
          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyStyle(course.difficulty)}`}>
            {course.difficulty}
          </span>

          <div className="absolute right-3 bg-success  text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <FaUsers className="mr-1" />
            <span>{formatNumber(course.students)}</span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900  line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {course.description}
        </p> */}

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center mr-4">
            <img src={course.instructorImage} alt={course.instructor} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-gray-100">{course.instructor}</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {renderStars(course.rating)}
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    ({course.rating.toFixed(1)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent onClick
              navigate(`/courses/${course._id}`);
            }}
            className="px-4 w-full py-2 rounded-lg bg-success hover:bg-success/90 transition"
          >
            View Details
          </button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default CourseCard;
