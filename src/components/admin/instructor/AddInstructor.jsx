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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Maximum file size in bytes (2MB)
        const MAX_SIZE = 2 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            showError("File size should not exceed 2MB");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const { width, height } = img;

            // Restrict dimensions (example: 600x600 pixels)
            if (width > 600 || height > 600) {
                showError("Image dimensions should not exceed 600x600 pixels");
                URL.revokeObjectURL(img.src); // free memory
                return;
            }

            // Valid file — update state
            setFormData((prev) => ({
                ...prev,
                PictureFile: file,
                imageUrl: img.src, // blob URL for preview
            }));
        };

        img.onerror = () => {
            showError("Invalid image file");
        };
    };


    // Handle rating change from RateInput
    const handleRateChange = (rate) => {
        setFormData((prev) => ({ ...prev, rate }));
    };

    // Validation
    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (formData.jobTitle === null) newErrors.jobTitle = "Job Title is required";
        if (formData.rate === 0) newErrors.rate = "Rate is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {

            const data = new FormData();
            data.append("name", formData.name);
            data.append("jobTitle", formData.jobTitle);
            data.append("description", formData.description);
            data.append("rate", formData.rate);

            if (formData.PictureFile) {
                data.append("PictureFile", formData.PictureFile);
            }

            const response = await api.post(`/Instructor`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            showSuccess("Instructor Added successfully");
            setShowForm(false);

        } catch (error) {
            showError(error);
            console.error("Error:", error);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white p-6 rounded-lg w-150">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Instructor</h2>
                    <button onClick={() => setShowForm(false)}>
                        <XIcon />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Avatar Upload */}
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
                    <div className="flex gap-6 w-full">
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
                            className="col-span-1 bg-[#EDEDED] text-[#8C8C8C] px-4 py-3 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="col-span-4 bg-[#020617] text-white px-4 py-3 rounded-lg cursor-pointer"
                        >
                            Save Instructor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
