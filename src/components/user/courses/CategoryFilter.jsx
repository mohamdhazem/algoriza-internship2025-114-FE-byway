import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export default function CategoryFilter({ resetFlag, onChange }) {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(true); // start open

    const categoryOptions = [
        { id: 1, label: "Fullstack" },
        { id: 2, label: "Frontend" },
        { id: 3, label: "Backend" },
        { id: 4, label: "UI/UX Design" }
    ];

    useEffect(() => {
        setCategories([]);
        
    },[resetFlag])

    const handleCategoryChange = (catId) => {
        setCategories((prev) => {
            const newCategories = prev.includes(catId)
                ? prev.filter((c) => c !== catId) // remove if already selected
                : [...prev, catId]; // add if not selected

            // pass values to parent
            onChange && onChange(newCategories);

            return newCategories;
        });
    };

    return (
        <div className="flex flex-col items-start w-full">
            {/* Header Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full cursor-pointer"
            >
                <p className="font-medium text-gray-900">Category</p>
                {open ? <ChevronUp /> : <ChevronDown />}
            </button>

            <hr className="text-gray-200 w-full my-2" />

            {open && (
                <div className="mt-2 space-y-2 w-full">
                    {categoryOptions.map((cat) => {
                        const checked = categories.includes(cat.id);

                        return (
                            <label
                                key={cat.id}
                                className="flex items-center gap-2 cursor-pointer select-none"
                                onClick={() => handleCategoryChange(cat.id)}
                            >
                                <div
                                    className={`w-5 h-5 flex items-center justify-center border-1 rounded-sm
                                    ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"}`}
                                >
                                    {checked && <Check className="w-4 h-4 text-white" />}
                                </div>
                                <p className="text-gray-900 text-[15px]">{cat.label}</p>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
