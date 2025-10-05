import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const CategoryDropdownForAddForm = ({ value, onChange, mode, disabled = false}) => {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 1, label: "Fullstack" },
        { value: 2, label: "Frontend" },
        { value: 3, label: "Backend" },
        { value: 4, label: "UX/UI Design" }
    ];

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (option) => {
        onChange({
            target: { name: "categoryId", value: option.value },
        });
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Input box */}
            <div
                className={`flex justify-between items-center gap-1.5 px-3 py-3 text-sm border rounded-lg border-gray-300 
                    ${mode === "view" ? "" : "cursor-pointer"}`}
                onClick={disabled ? () => setIsOpen(false) : () => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? "text-gray-800 font-medium" : "text-[#96A0B6] font-medium"}>
                    {selectedOption ? selectedOption.label : "Choose"}
                </span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={`px-4 py-2 cursor-pointer text-[#0F172A] font-medium hover:bg-gray-100 ${value === option.value ? "bg-gray-50 font-semibold" : ""
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
