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
import { X } from "lucide-react";

export const CoursesSearch = () => {
    const [courses, setCourses] = useState([]);
    const [count, setCount] = useState(0);

    const [showFilters, setShowFilters] = useState(false);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(9);
    const [rate, setRate] = useState(null);
    const [minLecturesNumber, setMinLecturesNumber] = useState(null);
    const [maxLecturesNumber, setMaxLecturesNumber] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [sortType, setSortType] = useState(2);
    const [search] = useAtom(courseSearchAtom);

    const [resetLecturesFlag, setResetLecturesFlag] = useState(false);
    const [resetCategoriesFlag, setResetCategoriesFlag] = useState(false);
    const [resetPriceFlag, setResetPriceFlag] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourses();

    }, [pageIndex, sortType, search]);


    const fetchCourses = async (filters) => {
        setShowFilters(false);
        setLoading(true);

        try {
            const query = new URLSearchParams();

            const {
                rate: fRate = rate,
                minLecturesNumber: fMinLectures = minLecturesNumber,
                maxLecturesNumber: fMaxLectures = maxLecturesNumber,
                minPrice: fMinPrice = minPrice,
                maxPrice: fMaxPrice = maxPrice,
                categoriesIds: fCategories = categoriesIds
            } = filters || {};

            query.append("PageIndex", pageIndex);
            if (fRate !== null) query.append("Rate", fRate);
            if (fMinLectures !== null) query.append("MinLecturesNumber", fMinLectures);
            if (fMaxLectures !== null) query.append("MaxLecturesNumber", fMaxLectures);
            if (fMinPrice !== null) query.append("MinPrice", fMinPrice);
            if (fMaxPrice !== null) query.append("MaxPrice", fMaxPrice);
            if (sortType !== null) query.append("SortType", sortType);
            if (search) query.append("Search", search.toLowerCase());

            fCategories.forEach(id => query.append("CategoriesIds", id));

            const res = await api.get(`/Course/ForUser?${query.toString()}`);
            setCourses(res.data.data);
            setCount(res.data.count);
        } catch (err) {
            console.error("Error fetching courses", err);
        } finally {
            setLoading(false);
        }
    };


    const handleResetFilters = () => {
        const defaultFilters = {
            rate: null,
            minLecturesNumber: null,
            maxLecturesNumber: null,
            minPrice: 0,
            maxPrice: 1000,
            categoriesIds: [],
            sortType: 2,
        };

        setRate(defaultFilters.rate);
        setMinLecturesNumber(defaultFilters.minLecturesNumber);
        setMaxLecturesNumber(defaultFilters.maxLecturesNumber);
        setMinPrice(defaultFilters.minPrice);
        setMaxPrice(defaultFilters.maxPrice);
        setCategoriesIds(defaultFilters.categoriesIds);
        setSortType(defaultFilters.sortType);
        setPageIndex(1);

        setResetLecturesFlag(prev => !prev);
        setResetCategoriesFlag(prev => !prev);
        setResetPriceFlag(prev => !prev);

        // Call fetchCourses with updated values
        fetchCourses(defaultFilters);
    };


    const totalPages = Math.ceil(count / pageSize);

    return (
        <div className="flex flex-col gap-4 px-4 sm:px-10 md:px-20 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center justify-start">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-[40px]">
                    Design Courses
                </h1>
            </div>

            <div className="flex items-center justify-start">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    All Development Courses
                </h4>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Filter Button for desktop */}
                <div className="hidden lg:flex gap-5 w-full sm:w-auto">
                    {/* Filter Button */}
                    <button
                        onClick={fetchCourses}
                        className="flex items-center justify-center gap-2 border border-gray-900 rounded-lg px-5 py-2.5 cursor-pointer hover:bg-gray-50 w-full sm:w-auto"
                    >
                        <div className="flex flex-col items-center justify-center gap-[3px]">
                            <span className="w-4.5 h-0.5 bg-gray-900 rounded"></span>
                            <span className="w-3 h-0.5 bg-gray-900 rounded"></span>
                            <span className="w-1.5 h-0.5 bg-gray-900 rounded"></span>
                        </div>
                        <h5 className="font-medium text-sm">Filter</h5>
                    </button>

                    <button
                        onClick={handleResetFilters}
                        className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg px-5 py-2.5 cursor-pointer w-full hover:bg-gray-50 sm:w-auto"
                    >
                        <X size={16} />
                        <h5 className="font-medium text-sm">Reset</h5>
                    </button>
                </div>

                {/* Filter Button for mobile */}
                <button
                    onClick={() => setShowFilters(true)}
                    className="flex lg:hidden items-center justify-center gap-2 border border-gray-900 rounded-lg px-5 py-2.5 cursor-pointer hover:bg-gray-50 w-full sm:w-auto"
                >
                    <div className="flex flex-col items-center justify-center gap-[3px]">
                        <span className="w-4.5 h-0.5 bg-gray-900 rounded"></span>
                        <span className="w-3 h-0.5 bg-gray-900 rounded"></span>
                        <span className="w-1.5 h-0.5 bg-gray-900 rounded"></span>
                    </div>
                    <h5 className="font-medium text-sm">Filter</h5>
                </button>

                {/* Sort Dropdown */}
                <div className="flex justify-between sm:justify-end items-center gap-3 w-full sm:w-auto">
                    <p className="text-sm">Sort By</p>
                    <SortDropDown value={sortType} onChange={(v) => setSortType(v)} />
                </div>
            </div>


            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
                {/* Sidebar Filters - Desktop */}
                <div className="hidden lg:flex lg:col-span-1 flex-col gap-7 text-[15px] font-medium py-4 lg:top-24 lg:h-fit">
                    <RateFilter value={rate} onChange={setRate} />
                    <LecturesNumberRadio
                        resetFlag={resetLecturesFlag}
                        onChange={(opt) => {
                            setMinLecturesNumber(opt.min);
                            setMaxLecturesNumber(opt.max);
                        }}
                    />
                    <PriceFilter
                        resetFlag={resetPriceFlag}
                        onChange={(prices) => {
                            setMinPrice(prices[0]);
                            setMaxPrice(prices[1]);
                        }}
                    />
                    <CategoryFilter
                        resetFlag={resetCategoriesFlag}
                        onChange={setCategoriesIds} />
                </div>

                {/* Courses Section */}
                <div className="relative lg:col-span-3 py-2 lg:pl-10 flex flex-col min-h-[80vh]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
                        {loading ? (
                            <p className="col-span-full text-center text-gray-400 text-lg font-medium pt-20">
                                Loading...
                            </p>
                        ) : courses && courses.length > 0 ? (
                            <>
                                {courses.map((course) => (
                                    <CourseCard key={course.id} course={course} role="user" />
                                ))}
                            </>
                        ) : (
                            <p className="col-span-full text-center text-gray-500 text-lg font-medium pt-20">
                                No courses found
                            </p>
                        )}
                    </div>

                    <div className="mt-auto pt-2 pb-8 flex justify-center">
                        <Pagination
                            pageIndex={pageIndex}
                            totalPages={totalPages}
                            onPageChange={setPageIndex}
                        />
                    </div>
                </div>

            </div>

            {/* Mobile Filter */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-end lg:hidden">
                    <div className="w-3/4 sm:w-2/3 bg-white h-full shadow-xl p-6 overflow-y-auto relative transition-transform">
                        <button
                            className="absolute top-4 right-4"
                            onClick={() => setShowFilters(false)}
                        >
                            <X size={22} />
                        </button>
                        <h3 className="text-xl font-semibold mb-6">Filters</h3>

                        <RateFilter value={rate} onChange={setRate} />
                        <LecturesNumberRadio
                            onChange={(opt) => {
                                setMinLecturesNumber(opt.min);
                                setMaxLecturesNumber(opt.max);
                            }}
                        />
                        <PriceFilter
                            onChange={(prices) => {
                                setMinPrice(prices[0]);
                                setMaxPrice(prices[1]);
                            }}
                        />
                        <CategoryFilter onChange={setCategoriesIds} />

                        <div className="flex justify-between gap-5 sm:gap-20">
                            <button
                                onClick={fetchCourses}
                                className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg cursor-pointer"
                            >
                                Apply Filters
                            </button>

                            <button
                                onClick={handleResetFilters}
                                className="mt-6 w-full bg-gray-100 border border-gray-500 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );

}