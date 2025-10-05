import { ChevronUp } from "lucide-react"
import { SortDropDown } from "./SortDropDown"
import RateSearchInput from "./RateFilter"
import LecturesNumberRadio from "./LecturesFilter"
import PriceFilter from "./PriceFilter"
import CategoryFilter from "./CategoryFilter"
import api from "../../../api"
import { useEffect, useState } from "react"
import RateFilter from "./RateFilter"
import { CourseCard } from "../../shared/CourseCard"
import { Pagination } from "../../admin/shared/pagination"
import { useAtom } from "jotai"
import { courseSearchAtom } from "../../../store/courseSearchAtom"

export const CoursesSearch = () => {
    const [courses, setCourses] = useState([]);
    const [count, setCount] = useState(0);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(9);
    const [rate, setRate] = useState(null); // double?
    const [minLecturesNumber, setMinLecturesNumber] = useState(null);
    const [maxLecturesNumber, setMaxLecturesNumber] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [categoriesIds, setCategoriesIds] = useState([]); // array of ints
    const [sortType, setSortType] = useState(2);
    const [search] = useAtom(courseSearchAtom);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/Course/ForUser", {
            params: {
                pageIndex: pageIndex,
                Rate: rate,
                MinLecturesNumber: minLecturesNumber,
                MaxLecturesNumber: maxLecturesNumber,
                MinPrice: minPrice,
                MaxPrice: maxPrice,
                CategoriesIds: categoriesIds,
                SortType: sortType,
                Search: search
            }
        })
            .then(res => {
                setCourses(res.data.data);
                setCount(res.data.count);
                console.log(res.data);
            })
            .catch(err => console.error("Error fetching courses", err));

    }, [pageIndex, sortType, search]);


    const fetchCourses = async () => {
        setLoading(true);

        try {
            const query = new URLSearchParams();

            // always append required params
            query.append("PageIndex", pageIndex);
            if (rate !== null) query.append("Rate", rate);
            if (minLecturesNumber !== null) query.append("MinLecturesNumber", minLecturesNumber);
            if (maxLecturesNumber !== null) query.append("MaxLecturesNumber", maxLecturesNumber);
            if (minPrice !== null) query.append("MinPrice", minPrice);
            if (maxPrice !== null) query.append("MaxPrice", maxPrice);
            if (sortType) query.append("SortType", sortType);
            if (search) query.append("Search", search.toLowerCase());

            // handle array correctly
            categoriesIds.forEach(id => query.append("CategoriesIds", id));

            console.log("sending", query.toString());

            const res = await api.get(`/Course/ForUser?${query.toString()}`);

            setCourses(res.data.data);
            console.log("courses", res.data);
        } catch (err) {
            console.error("Error fetching courses", err);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(count / pageSize);

    return (
        <div className="flex flex-col gap-4 px-20 py-10 ">
            <div className="flex items-center justify-start">
                <h1 className="font-bold text-[40px]">
                    Design Courses
                </h1>
            </div>
            <div className="flex items-center justify-start">
                <h4 className="text-2xl font-semibold">
                    All Development Courses
                </h4>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => fetchCourses()}
                    className="flex items-center justify-center gap-2 border border-gray-900 rounded-lg px-6 py-3 cursor-pointer hover:bg-gray-50">
                    <div
                        className="flex flex-col items-center justify-center  gap-[3px]"
                    >
                        <span className="w-4.5 h-0.5 bg-gray-900 rounded"></span>
                        <span className="w-3 h-0.5 bg-gray-900 rounded"></span>
                        <span className="w-1.5 h-0.5 bg-gray-900 rounded"></span>
                    </div>
                    <h5 className="font-medium text-sm">
                        Filter
                    </h5>
                </button>
                <div className="flex justify-between items-center gap-3">
                    <p className="text-sm w-fit">
                        Sort By
                    </p>
                    <SortDropDown
                        value={sortType}
                        onChange={(value) => setSortType(value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-4">
                {/* side filter */}
                <div className="col-span-1 flex flex-col gap-7 text-[16px] font-medium py-4">
                    <RateFilter
                        value={rate}
                        onChange={(value) => setRate(value)}
                    />
                    <LecturesNumberRadio
                        onChange={(opt) => {
                            setMinLecturesNumber(opt.min);
                            setMaxLecturesNumber(opt.max);
                        }}
                    />
                    <PriceFilter
                        onChange={(prices) => {
                            setMinPrice(prices[0]);
                            setMaxPrice(prices[1])
                        }}
                    />
                    <CategoryFilter
                        onChange={(ids) => setCategoriesIds(ids)}
                    />
                </div>
                {/* courses */}
                <div className="col-span-3 py-2 pl-10">
                    <div className="grid grid-cols-3 gap-4">
                        {loading ? (
                            <p className="col-span-3 text-center text-gray-400 text-lg font-medium pt-40">
                                Loading...
                            </p>
                        ) : courses && courses.length > 0 ? (
                            <>
                                {courses.map((course) => (
                                    <CourseCard key={course.id} course={course} role="user" />
                                ))}

                                {/* ----- Pagination ----- */}
                                <div className="col-span-3 flex justify-center mt-0">
                                    <Pagination
                                        pageIndex={pageIndex}
                                        totalPages={totalPages}
                                        onPageChange={(newPage) => setPageIndex(newPage)}
                                    />
                                </div>
                            </>
                        ) : (
                            <p className="col-span-3 text-center text-gray-500 text-lg font-medium pt-40">
                                No courses found
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}