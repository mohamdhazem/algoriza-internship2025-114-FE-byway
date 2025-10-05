import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getEnumLabel, JobTitleEnum } from "../../../utils/enums";

export const TopInstructorsSlider = ({ topInstructors }) => {
    const visibleCount = 5;   
    const step = 3;
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - step, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(prev + step, topInstructors.length - visibleCount)
        );
    };

    const maxIndex = topInstructors.length - visibleCount;
    const clampedIndex = Math.min(startIndex, maxIndex);

    const stepSize = (100 / topInstructors.length ) + 10.5;
    const translatePercent = clampedIndex * stepSize;

    return (
        <div className="px-20">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">Top Instructors</h2>
                <div className="flex justify-between gap-5 w-30">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="flex-1 py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={startIndex + visibleCount >= topInstructors.length}
                        className="flex-1 py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="overflow-hidden py-7 px-0.5">
                <div
                    className="flex transition-transform duration-600 ease-in-out"
                    style={{
                        gap: "2.5%",
                        transform: `translateX(-${translatePercent}%)`,
                    }}
                >
                    {topInstructors.map((ins, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_calc((100%/5)-2%)] flex flex-col items-center rounded-xl shadow-blue-soft"
                        >
                            <div className="w-full px-4 pt-4">
                                <img
                                    src={ins.imageUrl}
                                    className="w-full h-37 object-cover rounded-xl"
                                    alt="instructor"
                                />
                            </div>
                            <h2 className="text-lg font-semibold pt-4">{ins.name}</h2>
                            <p className="text-sm text-[#334155]">{getEnumLabel(JobTitleEnum,ins.jobTitle)}</p>
                            <div className="w-full px-4 pt-3">
                                <hr className="border-gray-300 h-1" />
                            </div>
                            <div className="flex-1 flex justify-between items-center gap-16 px-4 py-3.5">
                                <div className="flex justify-between items-center gap-1">
                                    <img src="icons/StarFilled.svg" alt="" />
                                    <p className="text-xs font-semibold text-[#0F172A]">{ins.rate}</p>
                                </div>
                                <p className="text-xs font-semibold text-[#334155]">
                                    {ins.studentsNumber} Students
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};
