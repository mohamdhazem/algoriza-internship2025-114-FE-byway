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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-medium">Instructors</h2>
                    <div className="flex items-center justify-center font-semibold text-sm w-7 h-7 sm:text-[16px] sm:w-12 sm:h-8 text-[#7E8CA0] bg-[#EEF0F3] rounded-2xl">
                        {count}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-between sm:justify-end items-start sm:items-center gap-3">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="flex items-center justify-center gap-1 text-white text-sm font-medium bg-gray-950 px-4 sm:px-5 py-2.5 rounded-lg cursor-pointer"
                    >
                        Add Instructor
                    </button>

                    {showAddForm && <AddInstructor setShowForm={setShowAddForm} />}
                    {showEditForm && <UpdateInstructor setShowEditForm={setShowEditForm} instructorId={selectedInstructor} />}
                    {showViewForm && <ViewInstructor setShowViewForm={setShowViewForm} instructorId={selectedInstructor} />}
                    {showDeleteForm && <DeleteForm setShowDeleteForm={setShowDeleteForm} entity={selectedInstructor} entityName={"instructor"} />}

                    <div className="flex justify-between gap-2 w-full sm:w-fit">
                        {/* Search Box */}
                        <div className="flex items-center sm:w-60 px-3 py-2 border rounded-lg border-[#F1F3F9] bg-white shadow-soft">
                            <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Search for Instructors"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full outline-none bg-transparent font-inter font-medium text-sm text-[#96A0B6] leading-5"
                            />
                        </div>

                        {/* Sort Button */}
                        <div
                            onClick={() => setRateSort((prev) => !prev)}
                            className="flex flex-col items-center justify-center w-10 h-10 border rounded-lg border-[#F1F3F9] bg-white shadow-soft cursor-pointer hover:bg-gray-50 gap-1"
                        >
                            <span className="w-6 h-0.5 bg-[#96A0B6] rounded"></span>
                            <span className="w-4 h-0.5 bg-[#96A0B6] rounded"></span>
                            <span className="w-2 h-0.5 bg-[#96A0B6] rounded"></span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="py-6 flex flex-col md:h-[550px]">
                <div className="flex-1 overflow-y-auto border rounded-lg border-none">
                    {/* Desktop */}
                    <table className="hidden md:table w-full table-auto text-sm text-left border-collapse">
                        <thead className="bg-[#F1F5FF] text-[#202637] text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-3 w-[30%]">Name</th>
                                <th className="px-6 py-3 w-[25%]">Job Title</th>
                                <th className="px-6 py-3 w-[20%]">Rate</th>
                                <th className="px-6 py-3 w-[25%]">Action</th>
                            </tr>
                        </thead>

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
                                            <button onClick={() => handleView(inst.id)} className="text-[#5879DC] hover:text-blue-500 cursor-pointer">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleEdit(inst.id)} className="text-[#5879DC] hover:text-blue-500 cursor-pointer">
                                                <PencilLine className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(inst)} className="text-[#EB5757] hover:text-red-700 cursor-pointer">
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile */}
                    <div className="md:hidden flex flex-col gap-4">
                        {instructors.map((inst) => (
                            <div key={inst.id} className="flex flex-col items-start justify-between p-4 border border-gray-200 rounded-xl shadow-md">
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="text-lg font-semibold text-gray-900">{inst.name}</h3>
                                    <div className="flex items-center mt-2">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <img
                                                key={num}
                                                src={num <= inst.rate ? "icons/StarFilled.svg" : "icons/StarEmpty.svg"}
                                                className="w-5 h-5"
                                                alt="star"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {getEnumLabel(JobTitleEnum, inst.jobTitle)}
                                </p>

                                <div className="flex justify-end gap-4 sm:gap-5 mt-6 sm:mt-3">
                                    <button onClick={() => handleView(inst.id)} className="text-[#5879DC] hover:text-blue-500 cursor-pointer">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleEdit(inst.id)} className="text-[#5879DC] hover:text-blue-500 cursor-pointer">
                                        <PencilLine className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(inst)} className="text-[#EB5757] hover:text-red-700 cursor-pointer">
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPageIndex(newPage)}
                />
            </div>
        </div>

    )
}