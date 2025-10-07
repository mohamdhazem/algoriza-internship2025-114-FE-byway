import { ChevronRight } from "lucide-react"
import RateDisplay from "./RateDisplay"
import { preconnect } from "react-dom";
import { useEffect, useState } from "react";
import { CourseCard } from "../../shared/CourseCard";
import { getEnumLabel, JobTitleEnum, LevelEnum } from "../../../utils/enums";
import { userAtom } from "../../../store/userAtom";
import { getUserRole, isLoggedIn } from "../../../auth";
import { Link, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../utils/popup";
import { useAtom, useSetAtom } from "jotai";
import { cartCoursesCountAtom, refreshCartCoursesCountAtom } from "../../../store/cartAtom";
import api from "../../../api";

export const CourseDetailsContent = ({ id }) => {
    const [courseDetails, setCourseDetials] = useState(null);
    const [courseContent, setCourseContent] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                console.log(id);
                const res = await api.get(`/course/Details/${id}`);
                setCourseDetials(res.data.course);
                setRelatedCourses(res.data.relatedCourses);
                setCourseContent(res.data.course.Contents);

                const res2 = await api.get(`cart/IsAddedToCart/${id}`);
                setIsAddedToCart(res2.data);

                console.log(res.data);
                console.log("courseDetails: ", courseDetails);
                console.log("courseContent: ", courseContent);
                console.log("relatedCourses: ", relatedCourses);

            } catch (err) {
                console.error("Failed to fetch course:", err);
            }
        };

        if (id) fetchCourse();
    }, [id])

    const navigate = useNavigate();
    const [, refreshCartCount] = useAtom(refreshCartCoursesCountAtom);

    const handleAddToCart = async () => {
        if (!isLoggedIn()) {
            showError("Login To Buy Courses")
            navigate("/userlogin");
            return;
        }

        try {
            if (getUserRole() === "User") {
                await api.post(`/cart/Courses/${id}`);

                console.log("Course added to cart successfully");
                // showSuccess("Course added to cart successfully");

                setIsAddedToCart(true);

                refreshCartCount();

            } else {
                navigate("/UserLogin");
            }
        } catch (err) {
            console.error("Failed to add to cart:", err);

            const backendMessage =
                err.response?.data?.message || err.response?.data || "Failed to add to cart";

            setError(backendMessage);
        }
    };

    return (
        <div className="font-inter relative">
            {/* intro */}
            <div className="px-5 md:px-10 lg:px-20 py-10 flex flex-col gap-4 bg-[#F8FAFC] text-start">
                <div className="flex flex-wrap justify-start items-center gap-0.5 sm:gap-2">
                    <p className="text-sm sm:text-[16px]">Home</p>
                    <ChevronRight className="text-gray-900" size={18} />
                    <p className="text-sm sm:text-[16px]">Courses</p>
                    <ChevronRight className="text-gray-900" size={18} />
                    <p className="text-[#2563EB] text-sm sm:text-[16px] truncate sm:max-w-[250px]">{courseDetails?.name}</p>
                </div>
                <h1 className="text-3xl lg:text-[40px] sm:py-2">{courseDetails?.name}</h1>
                <p className="text-sm sm:text-[17px] md:max-w-100 xl:max-w-180">
                    {courseDetails?.description}
                </p>
                <div className="flex justify-start items-center sm:gap-1.5">
                    <p className="text-[#FEC84B] sm:pt-1 text-[14px] sm:text-[16px]">
                        {courseDetails?.rate}
                    </p>
                    <RateDisplay
                        value={Math.round(courseDetails?.rate ?? 0)}
                    />
                    <div className="w-[1px] bg-gray-700 h-4 mx-1"></div>
                    <p className="text-[12px] sm:text-[16px]">
                        {courseDetails?.totalHours} Total Hours. {courseDetails?.totalLectures} Lectures. {getEnumLabel(LevelEnum, courseDetails?.level)}
                    </p>
                </div>
                <div className="flex justify-start items-center gap-2 text-sm text-gray-700">
                    <img
                        src={courseDetails?.instructorImage}
                        className="w-10 h-10 object-cover rounded-full"
                        alt=""
                    />
                    <p>
                        Created by <span className="text-[#2563EB]">{courseDetails?.instructorName}</span>
                    </p>
                </div>
                <div className="flex justify-start items-center gap-3 text-sm text-gray-700 mt-1">
                    <img
                        src={`${import.meta.env.BASE_URL}icons/category/${courseDetails?.categoryName === "UI/UX Design" ? "UIUX Design" : courseDetails?.categoryName}.svg`}
                        className="w-5 h-5 object-cover"
                        alt=""
                    />
                    <p className="pt-1">{courseDetails?.categoryName}</p>
                </div>
            </div>

            {/* card */}
            <div className="md:absolute md:top-2 md:right-5 z-10 md:w-60 md:h-fit lg:w-100 lg:right-15 lg:h-145 flex flex-col p-6 md:p-4 rounded-xl shadow-soft text-start bg-white">
                <img src={courseDetails?.imageUrl} className="h-45 sm:h-55 md:h-30 lg:h-50 rounded-lg object-cover" alt="" />
                <h3 className="pt-7 md:pt-2 md:text-lg lg:pt-7 lg:text-[24px]">${courseDetails?.cost.toFixed(2)}</h3>
                <button
                    onClick={handleAddToCart}
                    disabled={isAddedToCart}
                    className={`${isAddedToCart ? `bg-[#D9D9D9]` : `bg-[#020617]`} text-white md:text-sm lg:text-[16px] rounded-lg h-12 md:h-fit md:py-1.5 lg:h-12 cursor-pointer lg:mt-4`}>
                    Add To Cart
                </button>
                <Link
                    to={"/cart"}
                    className="bg-white md:text-sm lg:text-[16px] border border-[#020617] rounded-lg h-12 md:h-fit md:py-1.5 lg:h-12 cursor-pointer mt-3 md:mt-1 lg:mt-4 hover:bg-gray-200 transition-colors duration-300 ease-in-out flex justify-center items-center">
                    Buy Now
                </Link>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <div className="h-[1px] bg-[#E2E8F0] my-8 md:my-4 lg:my-8 -mx-4" />
                <p className="text-gray-900 md:text-sm lg:text-[16px]">Share</p>
                <div className="flex justify-start items-center gap-6 md:gap-3 lg:gap-6 pt-3 w-20">
                    <img src={`${import.meta.env.BASE_URL}icons/social/facebook.svg`} className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-5 outline-gray-100 rounded-full p-1.5 cursor-pointer" alt="" />
                    <img src={`${import.meta.env.BASE_URL}icons/social/github.svg`} className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-5 outline-gray-100 rounded-full p-1.5 cursor-pointer" alt="" />
                    <img src={`${import.meta.env.BASE_URL}icons/social/google.svg`} className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-5 outline-gray-100 rounded-full p-1.5 cursor-pointer" alt="" />
                    <img src={`${import.meta.env.BASE_URL}icons/social/x.svg`} className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-5 outline-gray-100 rounded-full p-1.5 cursor-pointer" alt="" />
                    <img src={`${import.meta.env.BASE_URL}icons/social/microsoft.svg`} className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 outline-5 outline-gray-100 rounded-full p-1.5 cursor-pointer" alt="" />
                </div>
            </div>

            {/* buttons */}
            <div className="px-5 md:px-10 lg:px-20 pt-10 pb-5 flex justify-start gap-1 sm:gap-3 md:gap-5">
                <a href="#description" className="px-2 sm:px-6 py-3 border border-[#E2E8F0] rounded-md bg-[#EFF6FF] cursor-pointer">
                    <p className="text-sm">
                        Description
                    </p>
                </a>
                <a href="#instructor" className="px-2 sm:px-6 py-3 border border-[#E2E8F0] rounded-md hover:bg-[#EFF6FF] cursor-pointer">
                    <p className="text-sm">
                        Instructor
                    </p>
                </a>
                <a href="#content" className="px-2 sm:px-6 py-3 border border-[#E2E8F0] rounded-md hover:bg-[#EFF6FF] cursor-pointer">
                    <p className="text-sm">
                        Content
                    </p>
                </a>
                <a href="#reviews" className="px-2 sm:px-6 py-3 border border-[#E2E8F0] rounded-md hover:bg-[#EFF6FF] cursor-pointer">
                    <p className="text-sm">
                        Reviews
                    </p>
                </a>
            </div>

            <div className="ml-20 mr-150 h-[1px] bg-[#E2E8F0]"></div>

            {/* Description */}
            <div
                id="description"
                className="px-5 md:px-10 lg:px-20 py-4 max-w-210 text-start"
            >
                <h4 className="mt-2">Course Description</h4>
                <p className="mt-1.5 text-[15px] text-gray-700">{courseDetails?.description}</p>
                <h4 className="mt-4">Certification</h4>
                <p className="mt-1.5 text-[15px] text-gray-700">{courseDetails?.certification}</p>
            </div>

            <div className="ml-20 mr-150 h-[1px] bg-[#E2E8F0]"></div>

            {/* Instructor */}
            <div
                id="instructor"
                className="px-5 md:px-10 lg:px-20 py-4 max-w-210 text-start"
            >
                <h4>Instructor</h4>
                <h4 className="mt-4 text-[#2563EB]">{courseDetails?.instructorName}</h4>
                <p className="">{getEnumLabel(JobTitleEnum, courseDetails?.instructorJobTitle)}</p>
                <div className="flex justify-start gap-4 pt-5">
                    <img src={courseDetails?.instructorImage} className="w-30 h-30 object-cover rounded-full" alt="" />
                    <div className="flex flex-col justify-center items-start gap-2.5">
                        <div className="flex items-center gap-1.5">
                            <span>
                                <img src={`${import.meta.env.BASE_URL}icons/courseDetails/review.svg`} alt="" />
                            </span>
                            <p className="text-sm text-gray-900">40,445 Reviews</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>
                                <img src={`${import.meta.env.BASE_URL}icons/courseDetails/students.svg`} alt="" />
                            </span>
                            <p className="text-sm text-gray-900">{courseDetails?.instructorStudents} Students</p>
                        </div>
                        <div className="flex items-center gap-1 pl-1">
                            <span>
                                <img src={`${import.meta.env.BASE_URL}icons/courseDetails/courses.svg`} alt="" />
                            </span>
                            <p className="text-sm text-gray-900">{courseDetails?.instructorCourses} Courses</p>
                        </div>
                    </div>
                </div>
                <p className="pt-4">
                    {courseDetails?.instructorDescription}
                </p>
            </div>

            <div className="ml-20 mr-150 h-[1px] bg-[#E2E8F0]"></div>

            {/* Content */}
            <div id="content" className="px-5 md:px-10 lg:px-20 py-6 max-w-201 text-start">
                <h4 className="mb-4 font-semibold text-lg">Content</h4>
                <div className="flex flex-col border border-[#E2E8F0] rounded-lg">
                    {courseDetails?.contents?.map((item, idx, arr) => (
                        <div
                            key={idx}
                            className={`flex justify-between items-center px-6 py-5 ${idx !== arr.length - 1 ? "border-b border-[#E2E8F0]" : ""
                                }`}
                        >
                            <h3 className="text-sm md:text-[18px]">{item.name}</h3>
                            <div className="flex justify-end gap-4 w-48">
                                <p className="text-sm">{item.lecturesNumber} Lectures</p>
                                <p className="text-sm">{item.time.split(":")[0]} Hours</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="ml-20 mr-150 h-[1px] bg-[#E2E8F0] mt-10"></div>

            {/* Static Reviews */}
            <div
                id="reviews"
                className="px-5 md:px-10 lg:px-20 py-4 text-start"
            >
                <h4 className="mt-2">Learner Reviews</h4>
                <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="flex justify-start gap-2">
                            <div className="flex items-start gap-0.5 mb-0.5">
                                <img src={`${import.meta.env.BASE_URL}icons/StarFilled.svg`} className="w-5 h-5 mt-0.5" alt="" />
                                <h4>4.6</h4>
                            </div>
                            <div className="flex items-end">
                                <p>146,951 reviews</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 mt-3">
                            {Array(5)
                                .fill(0)
                                .map((_, rowIndex) => {
                                    const percentages = [80, 10, 5, 3, 2];
                                    const starsCount = 5 - rowIndex; // decreasing stars each row
                                    return (
                                        <div key={rowIndex} className="flex">
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => {
                                                    const starValue = i + 1;
                                                    const isActive = starValue <= starsCount;
                                                    return (
                                                        <img
                                                            key={i}
                                                            src={isActive
                                                                ? `${import.meta.env.BASE_URL}icons/StarFilled.svg`
                                                                : `${import.meta.env.BASE_URL}icons/StarEmpty.svg`}
                                                            alt="star"
                                                            className="w-5 h-5"
                                                        />
                                                    );
                                                })}
                                            <p className="pl-2">{percentages[rowIndex]}%</p>
                                        </div>

                                    );
                                })}
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        {Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-col-reverse border border-[#E2E8F0] rounded-xl p-4">
                                <div className="flex flex-col sm:flex-col gap-4 lg:flex-row justify-between items-start lg:items-start">
                                    <div className="flex justify-start gap-3">
                                        <img
                                            src={`${import.meta.env.BASE_URL}icons/courseDetails/reviewer.png`}
                                            className="w-12 h-12 sm:w-15 sm:h-15 rounded-full object-cover"
                                            alt=""
                                        />
                                        <h5 className="w-40 pt-4 text-base">Mark Doe</h5>
                                    </div>
                                    <div className="flex flex-col justify-start gap-1 max-w-157">
                                        <div className="flex justify-start items-center gap-6 sm:gap-3">
                                            <div className="flex gap-1">
                                                <img
                                                    src={`${import.meta.env.BASE_URL}icons/courseDetails/star2.svg`}
                                                    alt=""
                                                />
                                                <h5>5</h5>
                                            </div>
                                            <p className="text-sm">Reviewed on 22nd March, 2024</p>
                                        </div>
                                        <p className="text-xs mt-2 md:mt-0 md:text-[16px]">
                                            I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-start">
                            <button className="px-6 py-3 border border-[#0F172A] cursor-pointer rounded-lg">
                                <p className="text-sm text-[#0F172A]">View more Reviews</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* related courses */}
            <div className="px-5 md:px-10 lg:px-20 text-start py-25">
                <h4>More Courses Like This</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 py-5">
                    {relatedCourses.map((c, index) => (
                        <CourseCard key={index} course={c} role="user" />
                    ))}
                </div>
            </div>
        </div>
    )
}