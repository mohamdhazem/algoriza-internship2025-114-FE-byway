
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
                            src={isActive
                                ? `${import.meta.env.BASE_URL}icons/courseDetails/star2.svg`
                                : `${import.meta.env.BASE_URL}icons/StarEmpty.svg`}
                            alt="star"
                            className="w-4 h-4"
                        />
                    );
                })}
        </div>
    );
}

