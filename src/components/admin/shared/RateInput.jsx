import { useEffect, useState } from "react";
import starEmpty from "/icons/StarEmpty.svg";
import starFilled from "/icons/StarFilled.svg";

export default function RateInput({ value, onChange, disabled = false }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const clickHandler = (starValue) => {
        if (disabled) return; // prevent changing rating
        setRating(starValue);
        onChange && onChange(starValue);
    };

    useEffect(() => {
        setRating(value || 0);
    }, [value]);

    return (
        <div className="flex flex-col flex-1 items-start">
            <label
                htmlFor="rate"
                className="text-sm font-medium text-[#2B3453] sm:mb-2"
            >
                Rate
            </label>
            <div className="flex items-center justify-start h-10">
                {Array(5)
                    .fill(0)
                    .map((_, i) => {
                        const starValue = i + 1;
                        const isActive = starValue <= (hover || rating);

                        return (
                            <img
                                key={i}
                                src={isActive ? starFilled : starEmpty}
                                alt="star"
                                onClick={() => clickHandler(starValue)}
                                onMouseEnter={() => !disabled && setHover(starValue)}
                                onMouseLeave={() => !disabled && setHover(0)}
                                className={disabled ? "w-6 h-6" : "w-6 h-6 cursor-pointer"}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

