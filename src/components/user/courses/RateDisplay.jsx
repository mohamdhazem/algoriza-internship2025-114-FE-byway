
export default function RateDisplay({ value = 5 }) {
    return (
        <div className="flex items-center justify-start">
            {Array(5)
                .fill(0)
                .map((_, i) => {
                    const starValue = i + 1;
                    const isActive = starValue <= value;

                    return (
                        <img
                            key={i}
                            src={isActive
                                ? `${import.meta.env.BASE_URL}icons/courseDetails/star2.svg`
                                : `${import.meta.env.BASE_URL}icons/StarEmpty.svg`}
                            alt="star"
                            className="w-3.5 h-3.5 md:w-4 sm:h-4"
                        />
                    );
                })}
        </div>
    );
}

