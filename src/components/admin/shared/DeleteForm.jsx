import { XIcon } from "lucide-react"
import api from "../../../api";
import { showError, showSuccess } from "../../../utils/popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { coursesAtom } from "../../../store/coursesAtom";
import { instructorsAtom } from "../../../store/instructorsAtom";

export const DeleteForm = ({ setShowDeleteForm, entity, entityName }) => {
    const [courses, setCourses] = useAtom(coursesAtom);
    const [instructors, setInstructors] = useAtom(instructorsAtom);


    const handleDelete = async (id) => {
        try {
            if (entityName === "instructor") {
                await api.delete(`/Instructor/${id}`);
                setInstructors((prev) => prev.filter((c) => c.id !== id));
            }
            else if (entityName === "course") {
                await api.delete(`/Course/${id}`);
                setCourses((prev) => prev.filter((c) => c.id !== id));
            }

            showSuccess("Deleted successfully!");
            setShowDeleteForm(false);

        } catch (error) {
            const backendMsg = error.response?.data?.message || "Something went wrong";
            showError(backendMsg);
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white p-6 rounded-xl w-115">
                <div className="flex items-center justify-end">
                    <button onClick={() => setShowDeleteForm(false)}>
                        <XIcon />
                    </button>
                </div>
                <div className="flex items-center justify-center py-3 mt-6">
                    <div className="flex items-center justify-center rounded-full bg-[#ffdfdf] outline-12 outline-[#fdeded] w-18 h-18">
                        <img
                            src="icons/deleteTrash.svg"
                            className="w-13 h-13"
                            alt=""
                        />
                    </div>
                </div>
                <div className="py-4 text-lg font-medium text-[#858585] flex justify-center">
                    <p className="w-90 text-center">
                        Are you sure you want to delete this {entityName === "instructor" ? "Instructor" : "Course"}{" "}
                        <span className="text-[#242B42]">{entity.name}</span> ?
                    </p>
                </div>

                <div className="grid grid-cols-5 gap-4 py-4">
                    <button
                        type="cancel"
                        onClick={() => setShowDeleteForm(false)}
                        className="col-span-1 bg-[#EDEDED] text-[#8C8C8C] px-2 py-3 rounded-lg cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={() => handleDelete(entity.id)}
                        className="col-span-4 bg-[#EF5A5A] text-white px-4 py-3 rounded-lg cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>

        </div>
    )
}