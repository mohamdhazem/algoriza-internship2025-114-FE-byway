import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getEnumLabel, JobTitleEnum } from "../../../utils/enums";

export const TopInstructorsSlider = ({ topInstructors }) => {
    const [visibleCount, setVisibleCount] = useState(5);
    const [step, setStep] = useState(3);
    const [startIndex, setStartIndex] = useState(0);

    const sliderRef = useRef(null);

    useEffect(() => {
        const updateSettings = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
                setStep(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
                setStep(2);
            } else {
                setVisibleCount(5);
                setStep(3);
            }
        };

        updateSettings();
        window.addEventListener("resize", updateSettings);
        return () => window.removeEventListener("resize", updateSettings);
    }, []);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - step, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(prev + step, topInstructors.length - visibleCount)
        );
    };

    const maxIndex = Math.max(0, topInstructors.length - visibleCount);
    const clampedIndex = Math.min(startIndex, maxIndex);

    const cardWidthPercent = 100 / visibleCount;
    const translatePercent = clampedIndex * cardWidthPercent;

    // Swipe handlers for touch devices
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let startX = 0;
        let endX = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            endX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const distance = endX - startX;
            if (Math.abs(distance) > 50) {
                if (distance > 0) {
                    handlePrev();
                } else {
                    handleNext();
                }
            }
        };

        slider.addEventListener("touchstart", handleTouchStart);
        slider.addEventListener("touchmove", handleTouchMove);
        slider.addEventListener("touchend", handleTouchEnd);

        return () => {
            slider.removeEventListener("touchstart", handleTouchStart);
            slider.removeEventListener("touchmove", handleTouchMove);
            slider.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleNext, handlePrev]);

    return (
        <div className="px-5 md:px-10 lg:px-20 gap-10 ">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-[18px] sm:text-xl md:text-2xl">Top Instructors</h2>
                <div className="hidden lg:flex justify-between gap-5 w-30">
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
            <div className={`py-7 px-0.5 ${visibleCount <= 2 ? "overflow-x-auto scroll-snap-x mandatory" : "overflow-hidden"}`}>
                <div
                    className={`flex ${visibleCount <= 2 ? "gap-4 scroll-snap-align-start" : "transition-transform duration-1000 ease-in-out"}`}
                    style={
                        visibleCount > 2
                            ? {
                                gap: "2.5%",
                                transform: `translateX(-${translatePercent}%)`,
                            }
                            : {}
                    }
                >
                    {topInstructors.map((ins, index) => (
                        <div
                            key={index}
                            style={{ flex: `0 0 calc(${100 / visibleCount}% - 2%)` }}
                            className={`flex flex-col items-center rounded-xl shadow-blue-soft ${visibleCount <= 2 ? "snap-start" : ""}`}
                        >

                            <div className="w-full px-4 pt-4">
                                <img
                                    src={ins.imageUrl}
                                    className="w-full h-37 object-cover rounded-xl"
                                    alt="instructor"
                                />
                            </div>
                            <h2 className="text-lg font-semibold pt-4">{ins.name}</h2>
                            <p className="text-sm text-[#334155]">
                                {getEnumLabel(JobTitleEnum, ins.jobTitle)}
                            </p>
                            <div className="w-full px-4 pt-3">
                                <hr className="border-gray-300 h-1" />
                            </div>
                            <div className="flex-1 flex justify-between items-center gap-16 px-4 py-3.5">
                                <div className="flex justify-between items-center gap-1">
                                    <img src={`${import.meta.env.BASE_URL}icons/StarFilled.svg`} alt="" />
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
