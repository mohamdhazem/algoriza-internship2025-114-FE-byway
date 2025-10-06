import { ChevronLeft, ChevronRight, SearchIcon, Eye, PencilLine, Star, Trash, LucideStars, StarOff, Stars, XIcon, Image, ImageIcon, CameraIcon } from "lucide-react"
import { useEffect, useState } from "react"
import RateInput from "../shared/RateInput";
import { AddInstructor } from "./AddInstructor";
import { UpdateInstructor } from "./UpdateInstructor";
import { ViewInstructor } from "./ViewInstructor";
import { DeleteForm } from "../shared/DeleteForm";
import api from "../../../api";
import { getEnumLabel, JobTitleEnum } from "../../../utils/enums";
import { Pagination } from "../shared/pagination";
import { useAtom } from "jotai";
import { instructorsAtom } from "../../../store/instructorsAtom";

export const InstructorsTable = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(7);
    const [search, setSearch] = useState("");
    const [rateSort, setRateSort] = useState(false);

    const [count, setCount] = useState(0);
    const [instructors, setInstructors] = useAtom(instructorsAtom);

    const fetchInstructors = async () => {
        try {
            const res = await api.get("/instructor", {
                params: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    rateSort: rateSort,
                    search: search
                }
            });

            setInstructors(res.data.data);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error fetching instructors:", err);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, [pageIndex, search, rateSort]);

    const totalPages = Math.ceil(count / pageSize);

    let [showAddForm, setShowAddForm] = useState(false);
    let [showViewForm, setShowViewForm] = useState(false);
    let [showEditForm, setShowEditForm] = useState(false);
    let [showDeleteForm, setShowDeleteForm] = useState(false);

    const [selectedInstructor, setSelectedInstructor] = useState(null);


    const handleAdd = () => setShowAddForm(true);

    const handleView = (instructor) => {
        setSelectedInstructor(instructor);
        setShowViewForm(true);
    };

    const handleEdit = (id) => {
        setSelectedInstructor(id);
        setShowEditForm(true);
    };

    const handleDelete = (instructor) => {
        setSelectedInstructor(instructor);
        setShowDeleteForm(true);
    };

    return (
        <div className="flex flex-col overflow-x-auto bg-white rounded-2xl shadow-md p-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">Instructors</h2>
                    <div className="flex items-center justify-center font-semibold w-12 h-8 text-[#7E8CA0] bg-[#EEF0F3] rounded-2xl">
                        {count}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Add Instructor Button */}
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="flex items-center justify-center gap-1 text-white text-sm font-medium bg-gray-950 px-5 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                    >
                        Add Instructor
                    </button>

                    {showAddForm && <AddInstructor setShowForm={setShowAddForm}></AddInstructor>}
                    {showEditForm && <UpdateInstructor setShowEditForm={setShowEditForm} instructorId={selectedInstructor}></UpdateInstructor>}
                    {showViewForm && <ViewInstructor setShowViewForm={setShowViewForm} instructorId={selectedInstructor}></ViewInstructor>}
                    {showDeleteForm && <DeleteForm setShowDeleteForm={setShowDeleteForm} entity={selectedInstructor} entityName={"instructor"}></DeleteForm>}


                    {/* Search Box */}
                    <div className="flex items-center w-60 px-3 py-2 border rounded-lg border-gray-200 bg-white">
                        <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search instructors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none bg-transparent font-inter font-medium text-sm leading-5"
                        />
                    </div>

                    {/* Order Dropdown / Button */}
                    <div
                        onClick={() => setRateSort((prev) => !prev)}
                        className="flex flex-col items-center justify-center w-10 h-10 border rounded-lg border-gray-200 bg-white cursor-pointer hover:bg-gray-50 gap-1"
                    >
                        <span className="w-6 h-0.5 bg-[#96A0B6] rounded"></span>
                        <span className="w-4 h-0.5 bg-[#96A0B6] rounded"></span>
                        <span className="w-2 h-0.5 bg-[#96A0B6] rounded"></span>
                    </div>
                </div>
            </div>

            <div className="py-6 flex flex-col h-[550px]">
                <div className="flex-1 overflow-y-auto border rounded-lg border-none">
                    <table className="w-full table-auto text-sm text-left border-collapse">
                        {/* ----- Header ثابت ----- */}
                        <thead className="bg-[#F1F5FF] text-[#202637] text-sm font-semibold ">
                            <tr>
                                <th className="px-6 py-3  w-[30%]">Name</th>
                                <th className="px-6 py-3  w-[25%]">Job Title</th>
                                <th className="px-6 py-3  w-[20%]">Rate</th>
                                <th className="px-6 py-3  w-[25%]">Action</th>
                            </tr>
                        </thead>

                        {/* ----- Body Scrollable ----- */}
                        <tbody className="divide-y divide-gray-200 font-medium shadow-2xs">
                            {instructors.map((inst) => (
                                <tr key={inst.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{inst.name}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{getEnumLabel(JobTitleEnum, inst.jobTitle)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <img
                                                    key={num}
                                                    src={num <= inst.rate ? "icons/StarFilled.svg" : "icons/StarEmpty.svg"}
                                                    className="w-5 h-5"
                                                    alt="star"
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-start gap-7">
                                            <button
                                                onClick={() => handleView(inst.id)}
                                                className="text-[#5879DC] hover:text-blue-500 cursor-pointer"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(inst.id)}
                                                className="text-[#5879DC] hover:text-blue-500 cursor-pointer"
                                            >
                                                <PencilLine className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(inst)}
                                                className="text-[#EB5757] hover:text-red-700 cursor-pointer"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ----- Pagination ----- */}
                <Pagination
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPageIndex(newPage)}>
                </Pagination>
            </div>



        </div>
    )
}