
import { useEffect, useRef, useState } from "react";
import { CameraIcon, ImageIcon, XIcon } from "lucide-react";
import RateInput from "../shared/RateInput";
import { JobTitleDropdown } from "./JobTitleDropdown";
import ViewInstructorRate from "./ViewInstructorRate";
import api from "../../../api";

export const ViewInstructor = ({ setShowViewForm, instructorId }) => {

    const fileInputRef = useRef(null);

    const [instructor, setInstructor] = useState({
        name: "",
        rate: 0,
        jobTitle: 0,
        description: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (!instructorId) return;

        api.get(`Instructor/${instructorId}`)
            .then(res => setInstructor(res.data))
            .catch(err => console.error(err));
    }, [instructorId]);

    const jobTitleMap = {
        BackendDeveloper: 0,
        FrontendDeveloper: 1,
        FullstackDeveloper: 2,
        UXUIDesigner: 3,
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white p-6 rounded-lg w-150">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">View Instructor</h2>
                    <button onClick={() => setShowViewForm(false)}>
                        <XIcon />
                    </button>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">
                    {/* Avatar Upload */}
                    <div className="flex justify-center items-center w-20 h-20 bg-[#F2F2F2] rounded-full py-5 my-6 relative">
                        {instructor.imageUrl ? (
                            <img
                                src={instructor.imageUrl}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-full"
                            />
                        ) : (
                            <ImageIcon className="rounded-full text-[#2B3F6C]" />
                        )}

                        <span
                            className="flex items-center justify-center text-white border-2 border-white rounded-full bg-[#5879DC] w-9 h-9 absolute top-12 left-11"
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
                            value={instructor.name}
                            readOnly
                            placeholder="Write here"
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-0"
                        />
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
                                value={instructor.jobTitle}
                                enabled={false}
                                readOnly
                            />
                        </div>

                        {/* Rate */}
                        <RateInput value={instructor.rate} disabled={true} />
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
                            value={instructor.description}
                            readOnly
                            rows="4"
                            placeholder="Write instructor description..."
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-0"
                        ></textarea>

                    </div>
                </div>
            </div>
        </div>
    );
};
