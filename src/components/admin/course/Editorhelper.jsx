import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Bold, Link2 } from "lucide-react";


export const Editorhelper = ({ comingValue, type, onchange, disabled = false }) => {
    const [value, setValue] = useState(comingValue || "");

    useEffect(() => {
        if (comingValue !== value) {
            setValue(comingValue || "");
        }
    }, [comingValue]);

    const quillRef = useRef(null);

    const [showColorOptions, setShowColorOptions] = useState(false);
    const [showSizeOptions, setShowSizeOptions] = useState(false);

    const colors = ["red", "green", "blue", "orange", "violet", "#d0d1d2"];
    const sizes = ["small", "normal", "large", "huge"];

    const toggleFormat = (format, value) => {
        const quill = quillRef.current.getEditor();
        const current = quill.getFormat()[format] || null;

        // toggle: if applied, remove it; otherwise apply
        if (current === value || (current === null && value === null)) {
            quill.format(format, false);
        } else {
            quill.format(format, value);
        }
    };

    const insertDate = () => {
        const date = new Date().toLocaleDateString();
        const quill = quillRef.current.getEditor();
        quill.insertText(quill.getSelection()?.index || 0, date);
    };

    const modules = {
        toolbar: {
            container: "#custom-toolbar",
        },
    };

    const handleChange = (content, delta, source, editor) => {
        setValue(content); // always update local state
        if (onchange) {
            // Notify parent, but don't let parent value overwrite local state immediately
            setTimeout(() => {
                onchange({ target: { name: type, value: content } });
            }, 0);
        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>

            <div className="rounded-lg shadow-sm overflow-hidden border border-gray-200 w-full">
                {/* Toolbar */}
                <div
                    id="custom-toolbar"
                    className="flex items-center justify-between gap-4 py-1 px-4 border border-gray-300 bg-white rounded-t-lg shadow-sm"
                >
                    {/* Group 1: Bold, Italic, Underline */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("bold", true)}
                            className="px-2 py-1 hover:bg-gray-100 rounded text-lg font-extrabold"
                        >
                            <Bold className="w-4 h-4" strokeWidth={3.8} />
                        </button>
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("italic", true)}
                            className="px-2 py-1 hover:bg-gray-100 rounded italic"
                        >
                            I
                        </button>
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("underline", true)}
                            className="px-2 py-1 hover:bg-gray-100 rounded underline"
                        >
                            U
                        </button>
                    </div>

                    <div className="h-6 w-px bg-gray-300"></div>

                    {/* Group 2: Draw, Color, Size */}
                    <div className="flex items-center relative">
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => alert("Drawing tool placeholder")}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/Shape.svg" alt="Draw" />
                        </button>

                        {/* Color */}
                        <div className="relative">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() => setShowColorOptions(!showColorOptions)}
                                className="px-2 py-1 hover:bg-gray-100 rounded"
                            >
                                <img src="/icons/texteditor/color.svg" alt="Color" />
                            </button>
                            {showColorOptions && (
                                <div className="absolute top-full left-0 mt-1 flex gap-1 bg-white border border-gray-200 p-1 rounded shadow-md z-10">
                                    {colors.map((color) => (
                                        <span
                                            key={color}
                                            aria-disabled={disabled}
                                            onClick={() => toggleFormat("color", color)}
                                            className="w-5 h-5 rounded cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Size */}
                        <div className="relative">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() => setShowSizeOptions(!showSizeOptions)}
                                className="px-2 py-1 hover:bg-gray-100 rounded"
                            >
                                <img src="/icons/texteditor/doubleA.svg" alt="Size" />
                            </button>
                            {showSizeOptions && (
                                <div className="absolute top-full left-0 mt-1 flex flex-col bg-white border border-gray-300 p-1 rounded shadow-md z-10">
                                    {sizes.map((size) => (
                                        <span
                                            key={size}
                                            aria-disabled={disabled}
                                            onClick={() => toggleFormat("size", size === "normal" ? null : size)}
                                            className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-6 w-px bg-gray-300"></div>

                    {/* Group 3: Lists */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("list", "bullet")}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/unorderedList.svg" alt="Unordered List" />
                        </button>
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("list", "ordered")}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/orderedList.svg" alt="Ordered List" />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-gray-300"></div>

                    {/* Group 4: Link, Calendar, Quote */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => {
                                const url = prompt("Enter link URL");
                                toggleFormat("link", url);
                            }}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <Link2 size={16} />
                        </button>

                        <button
                            type="button"
                            disabled={disabled}
                            onClick={insertDate}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/calender.svg" alt="Calendar" />
                        </button>

                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFormat("blockquote", true)}
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            <img src="/icons/texteditor/qoute.svg" alt="Quote" />
                        </button>
                    </div>
                </div>

                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={handleChange}
                    modules={{ toolbar: false }}
                    placeholder="Write here"
                    className="h-25"
                    readOnly={disabled}
                />
            </div>
        </div>
    );
}

