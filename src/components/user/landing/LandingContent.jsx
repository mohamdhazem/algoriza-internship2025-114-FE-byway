import { ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { CourseCard } from "../../shared/CourseCard"
import { useEffect, useState, useRef } from "react"
import { TopInstructorsSlider } from "./TopInstructorsSlider"
import { CustomerReviews } from "./CustormeReviews"
import { StatsSection } from "./StatsSection"
import api from "../../../Api"
import { isLoggedIn } from "../../../auth"

export const LandingContent = () => {

    const [topCourses, setTopCourses] = useState([]);
    const [topInstructors, setTopInstructors] = useState([]);
    const [topCategories, setTopCategories] = useState([]);


    useEffect(() => {
        api.get("/course/Top")
            .then(res => setTopCourses(res.data))
            .catch(err => console.log(err));

        api.get("/instructor/Top")
            .then(res => setTopInstructors(res.data))
            .catch(err => console.log(err));

        api.get("/category/Top")
            .then(res => setTopCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    const section1Ref = useRef(null);
    const section2Ref = useRef(null);

    useEffect(() => {
        const options = {
            threshold: 0.3, // trigger when 30% visible
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-up");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        if (section1Ref.current) observer.observe(section1Ref.current);
        if (section2Ref.current) observer.observe(section2Ref.current);

        return () => observer.disconnect();
    }, []);

    const main1Ref = useRef(null);
    const main2Ref = useRef(null);

    useEffect(() => {
        const options = { threshold: 0.3 };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("opacity-0", "translate-x-[-50px]", "translate-x-[50px]");
                    entry.target.classList.add("opacity-100", "translate-x-0");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        if (main1Ref.current) observer.observe(main1Ref.current);
        if (main2Ref.current) observer.observe(main2Ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className=" py-20 font-inter">
            {/* main content */}
            <div id="main" className="flex justify-between gap-35 px-20">
                <div
                    ref={main1Ref}
                    className="flex-1 flex flex-col justify-center text-start gap-5 opacity-0 translate-x-[-50px] transition-all duration-1200 ease-out">
                    <h2 className="font-bold text-gray-900 text-[40px] leading-11 w-[480px]">Unlock Your Potential with Byway</h2>
                    <p className="text-[16px] text-gray-700">
                        Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success.
                    </p>
                    {isLoggedIn() === true ? (<div />) : (
                        <Link
                         to={"/usercourses"}
                        className="cursor-pointer rounded-lg bg-[#3B82F6] text-white w-[165px] h-12 flex justify-center items-center">
                            Start your journey
                        </Link>
                    )}


                </div>
                <div
                    ref={main2Ref}
                    className="flex-1 flex flex-row relative gap-10 overflow-visible opacity-0 translate-x-[-50px] transition-all duration-1800 ease-out">
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="bg-[#F87171] rounded-full w-54 h-54 relative overflow-visible z-10">
                            <img
                                src="images/girl2.png"
                                className="absolute bottom-0 w-60 h-70 left-27 -translate-x-27 object-contain rounded-b-full"
                                alt=""
                            />
                            <div className="absolute -bottom-4 -left-4.5 w-62 h-30 border-t-0 border-1 border-[#CBD5E1] rounded-b-full z-0"></div>

                        </div>
                        <img src="images/Frame.png"
                            className="absolute -left-5 top-35"
                            alt=""
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-between items-start gap-10">
                        <div className="relative bg-[#60A5FA] rounded-full w-54 h-54 z-10">
                            <img
                                src="images/boy.png"
                                className="absolute bottom-0 w-60 h-65 left-27 -translate-x-27 object-contain rounded-b-full z-10"
                                alt=""
                            />
                            <div className="absolute bottom-1 -right-3 w-30 h-62 border-l-0 border-1 border-[#CBD5E1] rounded-r-full z-0 -rotate-[20deg]"></div>

                        </div>
                        <img src="images/Frame.png"
                            className="absolute left-67 top-0 rotate-[82deg]"
                            alt=""
                        />
                        <div className="relative bg-[#FACC15] rounded-full w-54 h-54">
                            <img
                                src="images/girl1.png"
                                className="absolute bottom-2 w-50 h-50 left-35 -translate-x-27 object-cover rounded-b-full z-10 scale-x-[-1]"
                                alt=""
                            />

                            <div className="absolute -bottom-15 -right-1 w-30 h-62 border-l-0 border-1 border-[#CBD5E1] rounded-r-full z-0 rotate-[40deg]"></div>

                            <span className="w-[170px] h-[100px] bg-white absolute -left-15 bottom-5 rounded-xl drop-shadow-lg flex flex-col gap-2 pt-2.5 px-1.5 z-20">
                                <div className="flex flex-row -space-x-3">
                                    <img src="images/community5.png" className="w-10 h-10 rounded-full" alt="" />
                                    <img src="images/community4.png" className="w-10 h-10 rounded-full" alt="" />
                                    <img src="images/community3.png" className="w-10 h-10 rounded-full" alt="" />
                                    <img src="images/community2.png" className="w-10 h-10 rounded-full" alt="" />
                                    <img src="images/community1.png" className="w-10 h-10 rounded-full" alt="" />
                                </div>
                                <div className="text-gray-900 font-semibold leading-4 text-sm text-start">
                                    Join our community of 1200+ Students
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* statistics */}
            <StatsSection />

            {/* Top categories */}
            <div className="px-20">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl">Top Categories</h2>
                    <div className="flex justify-between gap-5 w-30">
                        <button className="flex-1 py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer">
                            <ChevronLeft />
                        </button>
                        <button className="flex-1 py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
                <div className="flex justify-between gap-10 py-7">
                    {topCategories.map((cat, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center py-7 gap-1.5 border-gray-200 rounded-2xl shadow-blue-soft">
                            <div className="flex justify-center items-center w-25 h-25 bg-[#E0F2FE] rounded-full">
                                <img src={cat.imageUrl} alt="" />
                            </div>
                            <h4 className="text-xl font-semibold pt-1">{cat.name}</h4>
                            <p className="text-[16px] pt-1.5">{cat.coursesNumber} Courses</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top course */}
            <div className="px-20 my-10">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl">Top Courses</h2>
                    <Link
                        to={"/usercourses"}
                        className="text-[#3B82F6] -mr-3">
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-4 py-7 overflow-x-hidden">
                    {topCourses.map((c, index) => (
                        <CourseCard key={index} course={c} role="user" />
                    ))}
                </div>
            </div>

            {/* Top instructors */}
            <TopInstructorsSlider topInstructors={topInstructors} />

            {/* Reviews */}
            <CustomerReviews />

            {/* our services */}
            <div className="px-30 py-10">
                {/* Section 1 */}
                <div
                    ref={section1Ref}
                    className="flex justify-evenly items-center gap-20 opacity-0 translate-y-10 transition-all duration-700 ease-out"
                >
                    <div className="flex justify-center items-start">
                        <img
                            src="images/becomeInstructor.png"
                            className="w-100 h-105"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2.5 text-start">
                        <h2 className="text-xl font-semibold text-black">
                            Become an Instructor
                        </h2>
                        <p className="text-[16px] text-[#1D2939]">
                            Instructors from around the world teach millions of students on
                            Byway. <br /> We provide the tools and skills to teach what you
                            love.
                        </p>
                        <button className="bg-[#020617] text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg cursor-pointer">
                            <p className="text-white">Start Your Instructor Journey</p>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>

                {/* Section 2 */}
                <div
                    ref={section2Ref}
                    className="flex justify-evenly items-center gap-20 pt-15 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200"
                >
                    <div className="flex flex-col justify-center items-start gap-2.5 text-start">
                        <h2 className="text-xl font-semibold text-black">
                            Transform your life through education
                        </h2>
                        <p className="text-[16px] text-[#1D2939]">
                            Learners around the world are launching new careers, advancing in{" "}
                            <br /> their fields, and enriching their lives.
                        </p>
                        <Link
                            to={"/usercourses"}
                            className="bg-[#020617] text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg cursor-pointer">
                            <p className="text-white">Checkout Courses</p>
                            <ArrowRightIcon />
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src="images/becomeInstructor2.png"
                            className="w-118 h-95"
                            alt=""
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}