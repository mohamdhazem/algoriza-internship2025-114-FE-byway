import { SearchIcon } from "lucide-react"
import { CategoryDropdown } from "./CategoryDropdown"
import { CourseCard } from "../../shared/CourseCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import { Pagination } from "../shared/pagination";
import { useAtom } from "jotai";
import { coursesAtom } from "../../../store/coursesAtom";

export const CoursesSection = () => {

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(9);
    const [search, setSearch] = useState("");
    const [rateSort, setRateSort] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    // const [courses, setCourses] = useState([]);
    const [courses, setCourses] = useAtom(coursesAtom);

    const [count, setCount] = useState(0);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/course/ForDashboard", {
                params: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    rateSort: rateSort,
                    search: search,
                    categoryId: categoryId
                }
            });

            setCourses(res.data.data);
            setCount(res.data.count);
            console.log(count)
        } catch (err) {
            console.error("Error fetching Courses:", err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [pageIndex, search, rateSort, categoryId]);

    const totalPages = Math.ceil(count / pageSize);

    return (
        <div className="flex flex-col overflow-x-auto bg-white rounded-2xl shadow-md p-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">Courses</h2>
                    <div className="flex items-center justify-center font-semibold w-12 h-8 text-[#7E8CA0] bg-[#EEF0F3] rounded-2xl">
                        {count}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Add Course Button */}
                    <Link
                        type="button"
                        to={"/Courses/Add"}
                        className="flex items-center justify-center gap-1 h-10 w-60 text-white text-sm font-medium bg-gray-950 px-5 py-3 rounded-lg hover:bg-gray-800"
                    >
                        Add Course
                    </Link>

                    {/* Category DropDown */}
                    <CategoryDropdown
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(e.target.value);
                            setPageIndex(1);
                        }}
                    />

                    {/* Search Box */}
                    <div className="flex items-center h-10 w-60 px-3 py-3 border rounded-lg border-gray-100 shadow-soft">
                        <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPageIndex(1);
                            }}
                            placeholder="Search courses"
                            className="w-full outline-none bg-transparent font-inter font-medium text-sm text-[#96A0B6] leading-5"
                        />
                    </div>

                    {/* Order Button */}
                    <div
                        onClick={() => setRateSort((prev) => !prev)}
                        className="flex flex-col items-center justify-center w-9 h-9 border rounded-lg border-gray-100 shadow-soft cursor-pointer hover:bg-gray-50 gap-1"
                    >
                        <span className="w-6 h-0.5 bg-[#96A0B6] rounded"></span>
                        <span className="w-4 h-0.5 bg-[#96A0B6] rounded"></span>
                        <span className="w-2 h-0.5 bg-[#96A0B6] rounded"></span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-5">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course}></CourseCard>
                ))}
            </div>

            {/* ----- Pagination ----- */}
            <Pagination
                pageIndex={pageIndex}
                totalPages={totalPages}
                onPageChange={(newPage) => setPageIndex(newPage)}>
            </Pagination>
        </div>
    )
}