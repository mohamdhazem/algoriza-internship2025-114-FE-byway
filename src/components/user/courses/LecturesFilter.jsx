import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


export default function LecturesFilter({ onChange }) {
    const [lectures, setLectures] = useState("");
    const [open, setOpen] = useState(true); // start open


    const lectureOptions = [
        { label: "1-15", min: 1, max: 15 },
        { label: "16-30", min: 16, max: 30 },
        { label: "31-45", min: 31, max: 45 },
        { label: "More than 45", min: 46, max: null }, // null = no max
    ];


    const clickHandler = (option) => {
        setLectures(option.label);
        onChange && onChange(option);
    };

    // useEffect(() => {
    //     setRating(value || 0);
    // }, [value]);

    return (
        <div className="flex flex-col items-start">
            {/* Header Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full cursor-pointer"
            >
                <p className="font-medium text-gray-900">Number of Lectures</p>
                {open ? <ChevronUp /> : <ChevronDown />}
            </button>

            <hr className="text-gray-200 w-full my-2" />

            {open && (
                <div className="flex flex-col items-start justify-start gap-2">
                    {lectureOptions.map((opt) => (
                        <label key={opt.label} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="lectures"
                                value={opt.label}
                                checked={lectures === opt.label}
                                onChange={() => clickHandler(opt)}
                            />
                            <p className="text-gray-900">{opt.label}</p>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

