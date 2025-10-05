import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomerReviews = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3; // show 3 reviews at a time

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

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - visibleCount, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(prev + visibleCount, reviews.length - visibleCount)
        );
    };

    // how many slides can fit in one view
    const maxIndex = reviews.length - visibleCount;

    // compute percentage offset
    const step = (100 / reviews.length) * startIndex * visibleCount;

    // clamp to max
    const translatePercent = Math.min(
        (startIndex / reviews.length) * 100,
        (maxIndex / reviews.length) * 100
    );

    const visibleReviews = reviews.slice(startIndex, startIndex + visibleCount);

    return (
        <div className="pl-20 my-5 py-15 bg-[#F8FAFC]">
            {/* Header */}
            <div className="pr-20 flex justify-between items-center">
                <h2 className="font-semibold text-2xl text-start">
                    What Our Customer Say <br /> About Us
                </h2>
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
                        disabled={startIndex + visibleCount >= reviews.length}
                        className="flex-1 py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="overflow-hidden pt-8">
                <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${translatePercent}%)`,
                        width: `${(reviews.length / visibleCount) * 100}%`,
                    }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 basis-[calc((100%-4rem)/4.1)] bg-white rounded-2xl shadow-blue-soft p-5"
                        >
                            <div className="flex justify-start">
                                <img src="icons/reviewcomma.svg" alt="" />
                            </div>
                            <div className="pt-4 text-start">
                                <p className="text-[16px]">"{review.text}</p>
                            </div>
                            <div className="flex justify-start gap-2 pt-3">
                                <div>
                                    <img
                                        src={review.image}
                                        className="w-15 h-15 rounded-full object-cover"
                                        alt={review.name}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-lg font-semibold text-black">
                                        {review.name}
                                    </h2>
                                    <h5 className="text-sm text-gray-700">{review.job}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
