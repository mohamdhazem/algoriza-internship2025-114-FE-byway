import { useEffect, useRef, useState } from "react";
import { CameraIcon, ImageIcon, XIcon } from "lucide-react";
import RateInput from "../shared/RateInput";
import { JobTitleDropdown } from "./JobTitleDropdown";
import api from "../../../api";
import { showError, showSuccess } from "../../../utils/popup";

export const AddInstructor = ({ setShowForm }) => {

    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        jobTitle: null,
        description: "",
        rate: 0,
        imageUrl: "",
        PictureFile: null
    });

    const [errors, setErrors] = useState({});

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field as user types
        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const MAX_SIZE = 2 * 1024 * 1024; // 2MB
        if (file.size > MAX_SIZE) {
            setErrors((prev) => ({
                ...prev,
                image: "File size should not exceed 2MB"
            }));
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const { width, height } = img;

            if (width > 1000 || height > 1000) {
                setErrors((prev) => ({
                    ...prev,
                    image: "Image should be less than 1000*1000 pixels"
                }));
                URL.revokeObjectURL(img.src);
                return;
            }

            // Clear previous image error
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated.image;
                return updated;
            });

            // Valid file
            setFormData((prev) => ({
                ...prev,
                PictureFile: file,
                imageUrl: img.src
            }));
        };

        img.onerror = () => {
            setErrors((prev) => ({
                ...prev,
                image: "Invalid image file"
            }));
        };
    };

    // Handle rating change
    const handleRateChange = (rate) => {
        setFormData((prev) => ({ ...prev, rate }));

        if (errors.rate) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated.rate;
                return updated;
            });
        }
    };

    // Validation before submit
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (formData.jobTitle === null) newErrors.jobTitle = "Job Title is required";
        if (!formData.PictureFile) newErrors.image = "Image is required";
        if (formData.rate === 0) newErrors.rate = "Rate is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("jobTitle", formData.jobTitle);
            data.append("description", formData.description);
            data.append("rate", formData.rate);
            if (formData.PictureFile) data.append("PictureFile", formData.PictureFile);

            const response = await api.post(`/Instructor`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            showSuccess("Instructor added successfully");
            setShowForm(false);
        } catch (error) {
            showError("Something went wrong while adding the instructor.");
            console.error("Error:", error);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-100 overflow-auto">
            <div className="bg-white p-6 rounded-lg w-full sm:w-150">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Instructor</h2>
                    <button
                        className="cursor-pointer"
                        onClick={() => setShowForm(false)}>
                        <XIcon />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Upload image*/}
                    <div className="flex justify-center items-center w-20 h-20 bg-[#F2F2F2] rounded-full py-5 my-6 relative">
                        {/* Hidden input */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {formData.PictureFile ? (
                            <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-full"
                            />
                        ) : (
                            <ImageIcon className="rounded-full text-[#2B3F6C]" />
                        )}

                        <span
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center justify-center text-white border-2 border-white rounded-full bg-[#5879DC] w-9 h-9 absolute top-12 left-11 cursor-pointer hover:bg-blue-600"
                        >
                            <CameraIcon size={21} />
                        </span>
                    </div>
                    {errors.image && <p className="text-red-500 text-xs flex justify-start -mt-7">{errors.image}</p>}

                    {/* Name */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="text-sm font-medium text-[#2B3453] mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Write here"
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-blue-950/30"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    {/* Job Title & Rate */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full">
                        {/* Job Title */}
                        <div className="flex flex-col flex-1 items-start">
                            <label
                                htmlFor="jobTitle"
                                className="text-sm font-medium text-[#2B3453] mb-2"
                            >
                                Job Title
                            </label>

                            <JobTitleDropdown
                                value={formData.jobTitle}
                                onChange={handleChange}
                            />

                            {errors.jobTitle && (
                                <p className="text-red-500 text-xs">{errors.jobTitle}</p>
                            )}
                        </div>

                        {/* Rate */}
                        <div className="flex flex-col flex-1 items-start">
                            <RateInput value={formData.rate} onChange={handleRateChange} />
                            {errors.rate && <p className="text-red-500 text-xs">{errors.rate}</p>}
                        </div>

                    </div>

                    {/* Description */}
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="description"
                            className="text-sm font-medium text-[#2B3453] mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Write instructor description..."
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-blue-950/30"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs">{errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        <button
                            type="cancel"
                            onClick={() => setShowForm(false)}
                            className="col-span-2 sm:col-span-1 bg-[#EDEDED] text-[#8C8C8C] px-4 py-3 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="col-span-3 sm:col-span-4 bg-[#020617] text-white px-4 py-3 rounded-lg cursor-pointer"
                        >
                            Save Instructor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
