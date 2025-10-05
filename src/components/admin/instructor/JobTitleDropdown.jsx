import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const JobTitleDropdown = ({ value, onChange, enabled = true }) => {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 0, label: "Fullstack Developer" },
        { value: 1, label: "Backend Developer" },
        { value: 2, label: "Frontend Developer" },
        { value: 3, label: "UX/UI Designer" },
    ];

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (option) => {
        onChange({
            target: { name: "jobTitle", value: Number(option.value) },
        });
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Input box */}
            <div
                className="flex justify-between items-center w-full px-4 py-2 border rounded-lg border-gray-300 bg-white cursor-pointer"
                onClick={enabled ? () => setIsOpen(!isOpen) : () => setIsOpen(false)}
            >
                <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
                    {selectedOption ? selectedOption.label : "Select Job Title"}
                </span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${value === option.value ? "bg-gray-50 font-semibold" : ""
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
