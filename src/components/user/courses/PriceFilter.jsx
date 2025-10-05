import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Range } from "react-range";


export default function PriceFilter({ onChange }) {
    const [price, setPrice] = useState([0, 1000]);
    const [open, setOpen] = useState(true); // start open

    const clickHandler = (values) => {
        setPrice(values);
        onChange && onChange(values);
    };

    // useEffect(() => {
    //     setRating(value || 0);
    // }, [value]);

    return (
        <div className="flex flex-col items-start w-full">
            {/* Header Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full cursor-pointer"
            >
                <p className="font-medium text-gray-900">Price</p>
                {open ? <ChevronUp /> : <ChevronDown />}
            </button>

            <hr className="text-gray-200 w-full my-2" />

            {open && (
                <div className="w-full relative mt-2 mb-6 px-1.5 cursor-pointer">
                    {/* Range Slider */}
                    <Range
                        step={10}
                        min={0}
                        max={1000}
                        values={price}
                        onChange={(values) => clickHandler(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className="h-1 w-full bg-[#DDDDDD] rounded-full relative"
                            >
                                <div
                                    className="absolute h-1 bg-[#A8C9FF] rounded-full"
                                    style={{
                                        left: `${(price[0] / 1000) * 100}%`,
                                        width: `${((price[1] - price[0]) / 1000) * 100}%`,
                                    }}
                                />
                                {children}
                            </div>
                        )}
                        renderThumb={({ props, index }) => (
                            <div {...props} className="relative">
                                {/* Thumb */}
                                <div className="w-4 h-4 bg-blue-500 rounded-full shadow cursor-pointer" />
                                {/* Value label under thumb */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 cursor-pointer">
                                    ${price[index]}
                                </div>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>

    );
}

