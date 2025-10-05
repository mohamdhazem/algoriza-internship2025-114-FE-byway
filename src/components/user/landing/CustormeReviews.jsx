import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomerReviews = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    const reviews = [
        {
            text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
            image: "icons/reviewer.jpg",
            name: "Jane Doe",
            job: "Designer",
        },
        {
            text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
            image: "icons/reviewer.jpg",
            name: "Jane Doe",
            job: "Designer",
        },
        {
            text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
            image: "icons/reviewer.jpg",
            name: "Jane Doe",
            job: "Designer",
        },
        {
            text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
            image: "icons/reviewer.jpg",
            name: "Jane Doe",
            job: "Designer",
        }
    ];

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1); // small
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2); // medium
            } else {
                setVisibleCount(3); // large screens
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const handlePrev = () => {
        let step;
        if (window.innerWidth < 640) {
            step = 2; // small screen → move 2 steps instead of 1
        } else if (window.innerWidth < 1024) {
            step = 1; // medium
        } else {
            step = visibleCount; // large
        }

        setStartIndex((prev) => Math.max(prev - step, 0));
    };

    const handleNext = () => {
        let step;
        if (window.innerWidth < 450) {
            step = 3; // small screen → move 2 steps instead of 1
        }else if (window.innerWidth < 640) {
            step = 2; // medium
        }
         else if (window.innerWidth < 1024) {
            step = 1; // medium
        } else {
            step = visibleCount; // large
        }

        setStartIndex((prev) =>
            Math.min(prev + step, reviews.length - visibleCount)
        );
    };



    const maxIndex = reviews.length - visibleCount;

    const translatePercent = (startIndex / reviews.length * 50 / 100) * (100 * visibleCount);

    return (
        <div className="pl-5 md:pl-10 lg:pl-20 my-5 py-15 bg-[#F8FAFC]">
            {/* Header */}
            <div className="pr-5 md:pr-10 lg:pr-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-start">
                    What Our Customer Say <br className="hidden md:block" /> About Us
                </h2>
                <div className="flex justify-between gap-3 w-full md:w-auto">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="py-2 px-4 bg-[#94A3B8] text-white rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={startIndex >= maxIndex}
                        className="py-2 px-4 bg-[#94A3B8] text-white rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="overflow-hidden pt-8">
                <div
                    className="flex gap-4 transition-transform duration-1000 ease-in-out"
                    style={{
                        transform: `translateX(-${translatePercent}%)`,
                        width: `${(reviews.length / visibleCount) * 100}%`,
                    }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[15%] sm:w-[22%] lg:w-[23.7%] bg-white rounded-2xl shadow-blue-soft p-4 md:p-5"
                        >
                            {/* Quote Icon */}
                            <div className="flex justify-start">
                                <img
                                    src="icons/reviewcomma.svg"
                                    alt=""
                                    className="w-6 md:w-8"
                                />
                            </div>

                            {/* Review Text */}
                            <div className="pt-3 text-start">
                                <p className="text-sm md:text-base text-gray-700">
                                    "{review.text}
                                </p>
                            </div>

                            {/* User Info */}
                            <div className="flex justify-start gap-3 pt-4">
                                <img
                                    src={review.image}
                                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
                                    alt={review.name}
                                />
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-sm md:text-lg font-semibold text-black">
                                        {review.name}
                                    </h2>
                                    <h5 className="text-xs md:text-sm text-gray-700">
                                        {review.job}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
