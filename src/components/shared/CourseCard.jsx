import { Eye, PencilLine, Trash } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteForm } from "../admin/shared/DeleteForm";
import { showSuccess } from "../../utils/popup";
import { getEnumLabel, LevelEnum } from "../../utils/enums";

export const CourseCard = ({ course, role = "admin" }) => {

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        setShowDeleteForm(true);
    }

    const handleClick = () => {
        if (role !== "admin")
            navigate(`/CourseDetails/${course.id}`)
    }
    return (
        <div 
        onClick={handleClick}
        className={`flex flex-col w-full border border-gray-200 rounded-2xl shadow-blue-soft p-3 items-start h-fit ${role === "admin" ? "" : "cursor-pointer"}`}>{/*h-[385px]*/}
            {/* Image */}
            <div className="relative w-full h-35">
                <img
                    className="w-full h-full object-cover rounded-xl"
                    src={course.imageUrl}
                    alt="Card Image.."
                />
                <span className="absolute top-2 left-2 px-3 py-1 bg-[#EEF2FF] text-[#5879DC] rounded-3xl text-sm font-medium">
                    {course.categoryName}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 flex-grow justify-between items-start w-full mt-4 font-inter text-start">
                <h3 className="font-semibold text-lg text-[#0F172A] truncate w-full">
                    {course.name}
                </h3>
                <h5 className="text-sm text-[#334155] -my-2">By {course.instructorName}</h5>

                {/* Stars */}
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <img
                            key={num}
                            src={num <= Math.round(course.rate) ? `${import.meta.env.BASE_URL}icons/StarFilled.svg` : `${import.meta.env.BASE_URL}icons/StarEmpty.svg`}
                            className="w-5 h-5"
                            alt="star"
                        />
                    ))}
                </div>

                {/* Course details */}
                <h5 className="text-sm text-[#334155] truncate overflow-hidden whitespace-nowrap max-w-full">
                    {course.totalHours} Total Hours. {course.totalLectures} Lectures. {getEnumLabel(LevelEnum,course.level)}
                </h5>
                <h2 className="text-xl font-semibold -mt-1">${course.cost.toFixed(2)}</h2>

                {role === "admin" && (
                    < div className="flex items-center gap-4">
                        <Link
                            to={`/Courses/${course.id}/View`}
                            className="p-2 text-[#5879DC] border shadow-soft border-gray-100 rounded-lg hover:text-blue-500">
                            <Eye size={16} />
                        </Link>
                        <Link
                            to={`/Courses/${course.id}/Edit`}
                            className="p-2 text-[#5879DC] border shadow-soft border-gray-100 rounded-lg hover:text-blue-500">
                            <PencilLine size={16} />
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-[#EB5757] border shadow-soft border-gray-100 rounded-lg hover:text-red-700">
                            <Trash size={16} />
                        </button>
                    </div>
                )}

                {showDeleteForm && <DeleteForm setShowDeleteForm={setShowDeleteForm} entity={course} entityName={"course"}></DeleteForm>}

            </div>
        </div >

    )
}