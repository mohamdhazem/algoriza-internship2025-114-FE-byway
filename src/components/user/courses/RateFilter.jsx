import { useEffect, useState } from "react";
import starEmpty from "/icons/StarEmpty.svg";
import starFilled from "/icons/StarFilled.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RateFilter({ value , onChange }) {
    const [open, setOpen] = useState(true);
    const [hover, setHover] = useState(0);

    const clickHandler = (starValue) => {
        setHover(starValue);
        onChange && onChange(starValue); 
    };

    return (
        <div className="flex flex-col items-start w-full">
            {/* Header Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full cursor-pointer"
            >
                <p className="font-medium text-gray-900">Rating</p>
                {open ? <ChevronUp /> : <ChevronDown />}
            </button>

            <hr className="text-gray-200 w-full my-2" />

            {/* Stars Section */}
            {open && (
                <div className="flex items-center justify-start h-10">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => {
                            const starValue = i + 1;
                            const isActive = starValue <= (hover || value);

                            return (
                                <img
                                    key={i}
                                    src={isActive ? starFilled : starEmpty}
                                    alt="star"
                                    onClick={() => clickHandler(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    className="w-6 h-6 cursor-pointer"
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
}
