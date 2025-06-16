import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function StarRating({ value, onChange }) {
    const [hover, setHover] = useState(null);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hover ? star <= hover : star <= value;
                const Icon = filled ? FaStar : FaRegStar;

                return (
                    <button
                        key={star}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => onChange(star)}
                        type="button"
                        aria-label={`Rate ${star}`}
                        className="text-xl text-amber-400 transition-transform hover:scale-110"
                    >
                        <Icon />
                    </button>
                );
            })}
        </div>
    );
}
