import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function ViewInstructorRate({ value }) {

    return (
        <div className="flex flex-col flex-1 items-start">
            <label
                htmlFor="rate"
                className="text-sm font-medium text-[#2B3453] mb-2"
            >
                Rate
            </label>

            <div className="flex items-center justify-start h-10">
                {Array(5)
                    .fill(0)
                    .map((_, i) => {
                        const starValue = i + 1;
                        return (
                            <Star
                                key={i}
                                className={`w-5 h-5 cursor-pointer ${starValue <= value
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
