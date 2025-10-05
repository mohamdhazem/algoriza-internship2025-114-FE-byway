import { BedDoubleIcon, Calendar, CalendarCheck, CalendarHeart, CalendarRange, CalendarRangeIcon, Link, Link2, LucideQuote, Quote, TextQuote } from "lucide-react";
import { useRef, useState } from "react";

export default function TextArea({ value, type, onchange }) {
    const handleChange = (e) => {
        onchange(e);
    }
    return (
        <div className="flex flex-col items-start w-full">
            <label htmlFor={type} className="text-sm font-medium text-[#2B3453] mb-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>

            <div
                id="custom-toolbar"
                className="flex items-center justify-between w-full gap-2 py-1 px-4 border border-gray-300 border-b-0 bg-white rounded-t-lg"
            >
                <div className="flex items-center">
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded font-black "
                    >
                        B
                    </button>
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded italic"
                    >
                        I
                    </button>
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded underline"
                    >
                        U
                    </button>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center relative">
                    <button
                        className="px-1 py-1 hover:bg-gray-100 rounded"
                    >
                        <img src="/icons/texteditor/Shape.svg" alt="Draw" />
                    </button>

                    <div className="relative">
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/color.svg" alt="Color" />
                        </button>

                    </div>

                    <div className="relative">
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/doubleA.svg" alt="Size" />
                        </button>

                    </div>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center">
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                    >
                        <img src="/icons/texteditor/unorderedList.svg" alt="Unordered List" />
                    </button>
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                    >
                        <img src="/icons/texteditor/orderedList.svg" alt="Ordered List" />
                    </button>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center">
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                    >
                        <Link2 size={16} />
                    </button>

                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                    >
                        <img src="/icons/texteditor/calender.svg" alt="Calendar" />
                    </button>

                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                    >
                        <img src="/icons/texteditor/qoute.svg" alt="Quote" />
                    </button>
                </div>
            </div>

            <input
                type="text"
                name={type}
                id={type}
                onChange={handleChange}
                value={value}
                placeholder="Write here"
                className="w-full text-sm font-medium text-[#2B3453] px-4 pt-3 pb-12 border rounded-b-lg border-gray-300 focus:outline-blue-950/30"
            />
        </div>
    );
}
