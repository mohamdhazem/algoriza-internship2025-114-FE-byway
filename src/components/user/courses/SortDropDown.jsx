import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SortDropDown = ({ value , onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 0, label: "Highest price" },
        { value: 1, label: "Lowest price" },
        { value: 2, label: "The latest" },
        { value: 3, label: "The oldest" },
    ];

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative ">
            {/* Input box */}
            <div
                className="flex justify-between items-center text-sm gap-2 px-4 py-2.5 border rounded-lg border-gray-300 bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
                    {selectedOption ? selectedOption.label : "Select Sort Type"}
                </span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-start">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${value === option.value ? "bg-gray-50 font-semibold" : ""
                                }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
