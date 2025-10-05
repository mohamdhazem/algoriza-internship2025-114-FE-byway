import { useEffect, useRef, useState } from "react"
import { CategoryDropdownForAddForm } from "./CategoryDropdownForAddForm";
import { LevelDropdown } from "./LevelDropdown";
import { InstructorDropdown } from "./InstrucrotDropdown";
import RateInput from "../shared/RateInput";
import DescriptionEditor from "./TextArea";
import TextArea from "./TextArea";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash } from "lucide-react";
import api from "../../../api";
import { validateAndPreviewImage } from "../../../utils/image";
import { showError, showSuccess } from "../../../utils/popup";
import { Editorhelper } from "./Editorhelper";

export const CourseForm = ({ mode, courseId }) => {

    const [instructors, setInstructors] = useState([]);
    const navigate = useNavigate();

    let [step, setStep] = useState(1);
    const fileInputRef = useRef(null);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const [errors, setErrors] = useState({});

    const [contentNumber, setContentNumber] = useState(2);

    let [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        ImageFile: null,
        categoryId: null,
        level: null,
        instructorId: null,
        cost: null,
        totalHours: null,
        rate: null,
        description: "",
        certification: "",
        contents: [
            { name: "", lecturesNumber: "", time: "" },
            { name: "", lecturesNumber: "", time: "" }
        ]
    })


    useEffect(() => {
        if ((mode === "edit" || mode === "view") && courseId) {
            // Fetch Get Course by id api
            api.get(`/course/${courseId}`)
                .then(res => setFormData(res.data))
                .catch(err => console.error(err));
        }
        // Fetch Avaliable Instructors for drop down list 
        api.get("/Instructor/ForDropDown")
            .then(res => setInstructors(res.data))
            .catch(err => console.error(err));
    }, [mode, courseId])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const previewUrl = await validateAndPreviewImage(file, 2);
            setFormData((prev) => ({
                ...prev,
                ImageFile: file,
                imageUrl: previewUrl,
            }));
        } catch (err) {
            showError(err);
        }
    };

    const handleContentChange = (index, e) => {
        const { name, value } = e.target;
        const newContents = [...formData.contents];

        if (name === "time") {
            newContents[index].time = value;
        } else {
            newContents[index][name] = value;
        }

        setFormData((prev) => ({
            ...prev,
            contents: newContents
        }));
    };

    const addContentItem = () => {
        setFormData(prev => ({
            ...prev,
            contents: [...prev.contents, { name: "", lecturesNumber: null, time: "" }]
        }));
        setContentNumber((prev) => prev + 1)
    };

    const removeContentItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            contents: prev.contents.filter((_, i) => i !== index),
        }));
        setContentNumber((prev) => prev - 1);
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.name?.trim()) newErrors.name = "Course name is required";
        if (!formData.categoryId) newErrors.category = "Category is required";
        if (!formData.level) newErrors.level = "Level is required";
        if (!formData.instructorId) newErrors.instructorId = "Instructor is required";
        if (!formData.cost || isNaN(formData.cost)) newErrors.cost = "Cost must be a number";
        if (!formData.totalHours || isNaN(formData.totalHours)) newErrors.totalHours = "Total hours must be a number";
        if (!formData.rate) newErrors.rate = "Rate is required";
        if (!formData.description?.trim()) newErrors.description = "Description is required";
        if (!formData.certification?.trim()) newErrors.certification = "Certification is required";

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};

        // validate each content item
        formData.contents.forEach((c, i) => {
            if (!c.name?.trim()) {
                newErrors[`content-name-${i}`] = "Content name is required";
            }
            if (!c.lecturesNumber || isNaN(c.lecturesNumber)) {
                newErrors[`content-lectures-${i}`] = "Lectures number must be a number";
            }
            if (!c.time?.trim()) {
                newErrors[`content-time-${i}`] = "Time is required";
            }
        });

        return newErrors;
    };


    const handleNext = () => {
        const validationErrors = validateStep1();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            nextStep();
            console.log("Submitting form:", formData);
            // 👉 call your API here
        }

    }

    const buildFormData = (data) => {
        const fd = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value === null || value === undefined) return;

            if (key === "contents") {
                // Backend expects string property called ContentsJson
                const formatted = value.map(c => ({
                    Name: c.name,
                    LecturesNumber: Number(c.lecturesNumber),
                    Time: c.time
                }));
                fd.append("ContentsJson", JSON.stringify(formatted));
            } else if (key === "ImageFile") {
                if (value instanceof File) {
                    fd.append("ImageFile", value);
                }
            } else {
                fd.append(key, value);
            }
        });

        return fd;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateStep2();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Transform raw times to HH:MM:SS before sending
        const preparedContents = formData.contents.map(c => {
            let hours = parseInt(c.time || "0", 10);
            if (isNaN(hours)) hours = 0;
            return {
                ...c,
                time: `${hours.toString().padStart(2, "0")}:00:00`
            };
        });

        try {
            const fd = buildFormData({
                ...formData,
                contents: preparedContents
            });

            let response;
            if (mode === "add") {
                response = await api.post("/course", fd, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                showSuccess("Course Added Successfully")
            } else if (mode === "edit") {
                response = await api.put(`/course/${courseId}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                showSuccess("Course Updated Successfully")

            }

            navigate("/Courses");
        } catch (error) {
            if (error.response && error.response.data) {
                showError(error.response.data.message || error.response.data);
            } else {
                showError(error.message);
            }
        }
    };


    const inputMode = mode === "view";

    return (
        <form action="" className="flex flex-col gap-4.5 p-5 bg-white rounded-2xl shadow-soft">
            {step < 2 && (
                <div className="flex flex-col gap-4.5 items-start rounded-2xl">
                    <div className="flex justify-start items-center gap-2">
                        <h2 className="font-medium text-2xl text-[#202637]">Add Course</h2>
                        <h5 className="text-sm text-[#626C83]">Step 1 of 2</h5>
                    </div>
                    <div>
                        <h3 className="font-medium text-xl text-[#2B3453] mt-2">Course details</h3>
                    </div>
                    <div className="w-full border border-gray-200 rounded-lg shadow">
                        <div className="flex justify-start gap-8 p-3">

                            {/* Upload box */}
                            <div
                                aria-disabled={inputMode ? true : false}
                                onClick={() => {
                                    if (mode !== "view") fileInputRef.current.click();
                                }}
                                className={`flex justify-center items-center gap-2 w-[250px] h-[130px] rounded-lg bg-[#F2F4F5] border border-gray-200 
                                    ${inputMode ? "" : "cursor-pointer"}`}
                            >
                                {formData.ImageFile ? (
                                    // Preview newly selected file
                                    <img
                                        src={URL.createObjectURL(formData.ImageFile)}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : formData.imageUrl ? (
                                    // Show existing image from DB
                                    <img
                                        src={formData.imageUrl}
                                        alt="Instructor"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    // Default placeholder
                                    <>
                                        <img src="/icons/uploadImageIcon.svg" className="w-5 h-5" alt="" />
                                        <span className="text-[#737F8E] text-sm">Upload Image</span>
                                    </>
                                )}
                            </div>

                            {/* Info & button */}
                            <div className="flex flex-col items-start justify-start py-1">
                                <h2 className="text-[#202637] text-lg font-medium">Size: 700x430 pixels</h2>
                                <h2 className="text-[#202637] text-lg font-medium">File Support: .jpg, .jpeg, png, or .gif</h2>
                                <button
                                    type="button"
                                    disabled={inputMode ? true : false}
                                    onClick={() => {
                                        if (mode !== "view") fileInputRef.current.click();
                                    }}
                                    className={`mt-3 w-[150px] h-[45px] px-2.5 border rounded-lg text-[#5879DC] font-medium flex justify-center items-center gap-2 
                                        ${inputMode ? "" : "cursor-pointer"}`}
                                >
                                    <img src="/icons/uploadImage.svg" className="w-4 h-4" alt="" />
                                    <p className="text-sm text-[#5879DC]">Upload Image</p>
                                </button>
                            </div>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="name" className="text-sm font-medium text-[#2B3453] mb-2">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            disabled={inputMode}
                            onChange={handleChange}
                            placeholder="Write here"
                            className="input-style"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-start w-1/2">
                            <label className="text-sm font-medium text-[#2B3453] mb-2">
                                Category
                            </label>
                            <CategoryDropdownForAddForm
                                value={formData.categoryId}
                                onChange={handleChange}
                                mode={mode}
                                disabled={inputMode ? true : false}
                            />
                            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                        </div>
                        <div className="flex flex-col items-start w-1/2">
                            <label className="text-sm font-medium text-[#2B3453] mb-2">
                                Level
                            </label>
                            <LevelDropdown
                                value={formData.level}
                                onChange={handleChange}
                                mode={mode}
                                disabled={inputMode ? true : false}
                            />
                            {errors.level && <p className="text-red-500 text-xs">{errors.level}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-start w-1/2">
                            <label className="text-sm font-medium text-[#2B3453] mb-2">
                                Instructor
                            </label>
                            <InstructorDropdown
                                value={formData.instructorId}
                                instructorsList={instructors}
                                onChange={handleChange}
                                mode={mode}
                                disabled={inputMode ? true : false}
                            />
                            {errors.instructorId && <p className="text-red-500 text-xs">{errors.instructorId}</p>}

                        </div>
                        <div className="flex flex-col items-start w-1/2">
                            <label htmlFor="cost" className="text-sm font-medium text-[#2B3453] mb-2">
                                Cost
                            </label>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={formData.cost}
                                disabled={inputMode}
                                onChange={handleChange}
                                placeholder="Write here"
                                className="input-style"
                            />
                            {errors.cost && <p className="text-red-500 text-xs">{errors.cost}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-start w-1/2">
                            <label htmlFor="totalHours" className="text-sm font-medium text-[#2B3453] mb-2">
                                Total hours
                            </label>
                            <input
                                type="text"
                                id="totalHours"
                                name="totalHours"
                                value={formData.totalHours}
                                disabled={inputMode}
                                onChange={handleChange}
                                placeholder="Write here"
                                className="input-style"
                            />
                            {errors.totalHours && <p className="text-red-500 text-xs">{errors.totalHours}</p>}
                        </div>
                        <div className="flex flex-col items-start w-1/2">
                            <RateInput
                                value={formData.rate}
                                onChange={(starValue) =>
                                    setFormData((prev) => ({ ...prev, rate: starValue }))
                                }
                                disabled={inputMode}
                            />
                            {errors.rate && <p className="text-red-500 text-xs">{errors.rate}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-start w-1/2">
                            {/* <TextArea value={formData.description} type={"description"} onchange={handleChange}></TextArea> */}
                            <Editorhelper
                                comingValue={formData.description}
                                type={"description"}
                                onchange={handleChange}
                                disabled={inputMode ? true : false}
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        </div>
                        <div className="flex flex-col items-start w-1/2">
                            <Editorhelper
                                comingValue={formData.certification}
                                type={"certification"}
                                onchange={handleChange}
                                disabled={inputMode ? true : false}
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        </div>
                    </div>

                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-4.5 items-start bg-white rounded-2xl">
                    <div className="flex justify-start items-center gap-2">
                        <button className="cursor-pointer" onClick={prevStep}>
                            <ArrowLeft size={18}></ArrowLeft>
                        </button>
                        <h2 className="font-medium text-2xl text-[#202637] pl-1.5">Add Course</h2>
                        <h5 className="text-sm text-[#626C83]">Step 1 of 2</h5>
                    </div>
                    <div className="flex items-center justify-start">
                        <h3 className="font-medium text-xl text-[#2B3453] mt-2">Add Content</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {formData.contents.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2 bg-[#F7F8F9] p-5 w-full rounded-lg relative">
                                <div className="flex flex-col items-start">
                                    <label htmlFor={`name-${index}`} className="text-sm font-medium text-[#2B3453] mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`name-${index}`}
                                        name="name"
                                        value={item.name}
                                        onChange={(e) => handleContentChange(index, e)}
                                        disabled={inputMode}
                                        placeholder="Write here"
                                        className="input-style"
                                    />
                                    {errors[`content-name-${index}`] && <p className="text-red-500 text-xs">{errors[`content-name-${index}`]}</p>}
                                </div>

                                <div className="flex items-center gap-4 w-full">
                                    <div className="flex flex-col items-start w-1/2">
                                        <label className="text-sm font-medium text-[#2B3453] mb-2">
                                            Lectures Number
                                        </label>
                                        <input
                                            type="text"
                                            id={`lectures-${index}`}
                                            name="lecturesNumber"
                                            value={item.lecturesNumber}
                                            onChange={(e) => handleContentChange(index, e)}
                                            disabled={inputMode}
                                            placeholder="Write here"
                                            className="input-style"
                                        />
                                        {errors[`content-lectures-${index}`] && <p className="text-red-500 text-xs">{errors[`content-lectures-${index}`]}</p>}

                                    </div>
                                    <div className="flex flex-col items-start w-1/2">
                                        <label className="text-sm font-medium text-[#2B3453] mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="text"
                                            id={`time-${index}`}
                                            name="time"
                                            value={item.time.split(":")[0] || ""}
                                            onChange={(e) => handleContentChange(index, e)}
                                            disabled={inputMode}
                                            placeholder="Enter hours"
                                            className="input-style"
                                        />
                                        {errors[`content-time-${index}`] && <p className="text-red-500 text-xs">{errors[`content-time-${index}`]}</p>}

                                    </div>
                                </div>

                                {contentNumber > 1 && index > 0 && mode !== "view" && (
                                    <div className="flex items-center justify-start pt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeContentItem(index)}
                                            className=" bg-[#FDEEEE] text-[#EB5757] font-bold py-3 px-3.5 rounded-lg cursor-pointer"
                                        >
                                            <img src="/icons/texteditor/trash.svg" className="w-4.5 h-4.5" alt="" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {mode !== "view" && (
                            <button
                                type="button"
                                onClick={addContentItem}
                                className="mt-2 px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-[#202637] font-semibold bg-[#ECEEF0] cursor-pointer"
                            >
                                <h3 className="">Add Another Content</h3>
                                <img src="/icons/texteditor/addContent.svg" className="w-3.5 h-3.5" alt="" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-10 gap-2 w-full h-12 py-1">
                {(step === 2 && mode !== "view") || (step === 1) && (
                    <Link
                        className="col-span-1 flex items-center justify-center bg-[#ffe7e7] text-[#EB5757] rounded-lg cursor-pointer"
                        to={"/Courses"}
                    >
                        Cancel
                    </Link>
                )}

                {step === 1 && (
                    <button
                        type="button"
                        className="col-span-9 bg-[#020617] text-white rounded-lg cursor-pointer"
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                )}

                {step === 2 && mode !== "view" && (

                    <button
                        className="col-span-9 bg-[#020617] text-white rounded-lg cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {mode === "add" ? "Submit" : "Update"}
                    </button>
                )}

            </div>

        </form>
    )
}