import { useEffect, useState } from "react";
import starEmpty from "/icons/StarEmpty.svg";
import starFilled from "/icons/courseDetails/star2.svg";

export default function RateDisplay({ value = 5 }) {
    return (
            <div className="flex items-center justify-start h-10">
                {Array(5)
                    .fill(0)
                    .map((_, i) => {
                        const starValue = i + 1;
                        const isActive = starValue <= value;

                        return (
                            <img
                                key={i}
                                src={isActive ? starFilled : starEmpty}
                                alt="star"
                                className="w-4 h-4"
                            />
                        );
                    })}
            </div>
    );
}

