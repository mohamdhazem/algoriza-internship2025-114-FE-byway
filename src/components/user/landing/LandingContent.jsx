import { ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { CourseCard } from "../../shared/CourseCard"
import { useEffect, useState, useRef } from "react"
import { TopInstructorsSlider } from "./TopInstructorsSlider"
import { CustomerReviews } from "./CustormeReviews"
import { StatsSection } from "./StatsSection"
import { isLoggedIn } from "../../../auth"
import api from "../../../api"

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


    // Animate from right to left
    const toLeftSectionsRef = useRef([]);

    useEffect(() => {
        const options = { threshold: 0.3 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (window.innerWidth < 768) {
                        // Mobile
                        entry.target.classList.add("animate-fade-up");
                    } else {
                        // Desktop
                        entry.target.classList.add("animate-fade-left");
                    }
                }
            });
        }, options);

        toLeftSectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);


    // Animate from left to right
    const toRightSectionsRef = useRef([]);

    useEffect(() => {
        const options = { threshold: 0.3 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (window.innerWidth < 768) {
                        // Mobile
                        entry.target.classList.add("animate-fade-up");
                    } else {
                        // Desktop
                        entry.target.classList.add("animate-fade-right");
                    }
                }
            });
        }, options);

        toRightSectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="py-20 font-inter">
            {/* main content */}
            <div id="main" className="px-5 md:px-10 lg:px-20 gap-10 md:gap-5 lg:gap-35 grid grid-cols-1 md:grid-cols-2 items-center">
                <div
                    ref={main1Ref}
                    className="flex flex-col justify-center text-start gap-5 opacity-0 translate-x-[-50px] transition-all duration-1200 ease-out">
                    <h2 className="font-bold text-gray-900 text-4xl lg:text-[40px] md:text-3xl sm:text-2xl leading-snug w-full max-w-[480px]">
                        Unlock Your Potential with Byway
                    </h2>
                    <p className="text-[16px] text-gray-700 max-w-[500px]">
                        Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success.
                    </p>
                    {isLoggedIn() === true ? (
                        <div />
                    ) : (
                        <Link
                            to={"/usercourses"}
                            className="cursor-pointer rounded-lg bg-[#3B82F6] text-white w-full max-w-[165px] h-12 flex justify-center items-center">
                            Start your journey
                        </Link>
                    )}
                </div>

                <div
                    ref={main2Ref}
                    className="flex flex-row relative flex-wrap md:flex-nowrap gap-1 sm:gap-6 md:gap-5 overflow-visible opacity-0 translate-x-[-50px] transition-all duration-1800 ease-out">

                    <div className="flex-1 flex flex-col justify-center items-center min-w-[140px] sm:min-w-[180px] md:min-w-[200px]">
                        <div className="bg-[#F87171] rounded-full w-35 h-35 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-54 lg:h-54 relative overflow-visible z-10">
                            <img
                                src="images/girl2.webp"
                                className="absolute bottom-0 w-35 sm:w-36 md:w-44 lg:w-60 h-[130%] left-1/2 -translate-x-1/2 object-contain rounded-b-full"
                                alt=""
                            />
                            <div
                                className="absolute
                                        -bottom-[8%] left-1/2 -translate-x-1/2
                                        w-40 h-22 sm:w-42 sm:h-20 md:w-50 md:h-24 lg:w-60 lg:h-30
                                        border-t-0 border border-[#CBD5E1]
                                        rounded-b-[9999px] z-0">
                            </div>
                        </div>
                        <img
                            src="images/Frame.png"
                            className="absolute -left-4 top-24 sm:left-15 sm:top-20 md:top-[20%] md:-left-[5%] lg:-left-7 lg:top-35 w-18 md:w-22"
                            alt=""
                        />
                    </div>


                    {/* Second column */}
                    <div className="flex-1 flex flex-col justify-between items-start min-w-[140px] sm:min-w-[180px] md:min-w-[200px] mt-6 md:mt-0">

                        <div className="relative bg-[#60A5FA] rounded-full w-35 h-35 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-54 lg:h-54 z-10">
                            <img
                                src="images/boy.webp"
                                className="absolute bottom-0 w-35 sm:w-36 md:w-44 lg:w-60 h-[120%] left-1/2 -translate-x-1/2 object-contain rounded-b-full z-10"
                                alt=""
                            />
                            <div
                                className="absolute
                                    bottom-9 left-[25%] lg:bottom-15 lg:left-1/5 sm:bottom-10 sm:left-[25%] md:bottom-12
                                    w-40 h-22 sm:w-42 sm:h-21 md:w-50 md:h-24 lg:w-65 lg:h-32
                                    border-t-0 border border-[#CBD5E1]
                                    rounded-b-[9999px] z-0 -rotate-[105deg]">
                            </div>
                        </div>
                        <img
                            src="images/Frame.png"
                            className="absolute rotate-80 left-[43%] top-[5%] sm:left-[46%] sm:top-[7%] md:top-0 lg:left-[45%] lg:top-0 w-18 md:w-22"
                            alt=""
                        />

                        <span className="bg-gray-900 rounded-full w-[35px] h-[35px] flex items-center justify-center">
                            <div className="w-[15px] h-[15px] bg-white rotate-45">

                            </div>
                        </span>

                        <div className="relative bg-[#FACC15] rounded-full w-35 h-35 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-54 lg:h-54 mt-4 md:mt-0">
                            <img
                                src="images/girl1.webp"
                                className="absolute bottom-0 w-35 sm:w-36 md:w-44 lg:w-60 h-[95%] left-[50%] -translate-x-1/2 object-cover rounded-b-full z-10 scale-x-[-1]"
                                alt=""
                            />
                            <div
                                className="absolute
                                    bottom-0 left-[17%] lg:left-1/6 md:left-[15%]
                                    w-40 h-20 sm:w-40 sm:h-22 md:w-50 md:h-28 lg:w-60 lg:h-30
                                    border-t-0 border border-[#CBD5E1]
                                    rounded-b-[9999px] z-0 -rotate-[45deg]">
                            </div>
                            <span className="w-[110px] sm:w-[150px] md:w-[170px] h-auto min-h-[70px] sm:min-h-[80px] md:min-h-[100px] bg-white absolute -left-15 sm:-left-10 md:-left-20 bottom-3 sm:bottom-4 md:bottom-5 rounded-xl drop-shadow-lg flex flex-col gap-1.5 sm:gap-2 pt-2 px-1.5 z-20">
                                <div className="flex flex-row -space-x-2 sm:-space-x-3">
                                    <img src="images/community5.png" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt="" />
                                    <img src="images/community4.png" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt="" />
                                    <img src="images/community3.png" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt="" />
                                    <img src="images/community2.png" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt="" />
                                    <img src="images/community1.png" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt="" />
                                </div>
                                <div className="text-gray-900 font-semibold leading-4 text-[10px] sm:text-xs md:text-sm text-start">
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
            <div
                ref={(el) => (toRightSectionsRef.current[0] = el)}
                className="px-5 md:px-10 lg:px-20 gap-10 opacity-0 translate-y-10 md:-translate-x-10 transition-all duration-800 ease-out">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">Top Categories</h2>
                    <div className="hidden md:flex gap-3 sm:gap-5">
                        <button className="py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer">
                            <ChevronLeft />
                        </button>
                        <button className="py-1 px-3.5 bg-[#94A3B8] text-white rounded-lg cursor-pointer">
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-7">
                    {topCategories.map((cat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center py-6 px-4 gap-2 border border-gray-200 rounded-2xl shadow-blue-soft text-center"
                        >
                            <div className="flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24 md:w-25 md:h-25 bg-[#E0F2FE] rounded-full">
                                <img src={cat.imageUrl} alt={cat.name} className="w-10" />
                            </div>
                            <h4 className="text-base sm:text-lg md:text-xl font-semibold pt-1">{cat.name}</h4>
                            <p className="text-sm sm:text-[15px] md:text-[16px] pt-1.5">{cat.coursesNumber} Courses</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Top course */}
            <div
                ref={(el) => (toLeftSectionsRef.current[0] = el)}
                className="px-5 md:px-10 lg:px-20 gap-10 my-10 opacity-0 translate-y-10 md:translate-x-10 transition-all duration-800 ease-out">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-[18px] sm:text-xl md:text-2xl">Top Courses</h2>
                    <Link
                        to={"/usercourses"}
                        className="text-[#3B82F6] -mr-3">
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-7 overflow-x-hidden">
                    {topCourses.map((c, index) => (
                        <CourseCard key={index} course={c} role="user" />
                    ))}
                </div>
            </div>

            {/* Top instructors */}
            <div
                ref={(el) => (toRightSectionsRef.current[1] = el)}
                className=" opacity-0 translate-y-10 md:-translate-x-10 transition-all duration-800 ease-out"
            >
                <TopInstructorsSlider topInstructors={topInstructors} />
            </div>

            {/* Reviews */}
            <div
                ref={(el) => (toLeftSectionsRef.current[1] = el)}
                className=" opacity-0 translate-y-10 md:translate-x-10 transition-all duration-800 ease-out"
            >
                <CustomerReviews />
            </div>

            {/* our services */}
            <div className="px-6 md:px-30 py-10">
                {/* Section 1 */}
                <div
                    ref={section1Ref}
                    className="flex flex-col md:flex-row justify-evenly items-center gap-10 md:gap-20 opacity-0 translate-y-10 transition-all duration-800 ease-out"
                >
                    <div className="flex justify-center items-start">
                        <img
                            src="images/becomeInstructor.png"
                            className="w-60 h-60 md:w-100 md:h-105 object-contain"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2.5 text-start">
                        <h2 className="text-lg md:text-xl font-semibold text-black">
                            Become an Instructor
                        </h2>
                        <p className="text-sm md:text-[16px] text-[#1D2939] leading-relaxed">
                            Instructors from around the world teach millions of students on
                            Byway. <br className="hidden md:block" /> We provide the tools and
                            skills to teach what you love.
                        </p>
                        <button className="bg-[#020617] text-white flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-lg cursor-pointer text-sm md:text-base">
                            <p className="text-white">Start Your Instructor Journey</p>
                            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>

                {/* Section 2 */}
                <div
                    ref={section2Ref}
                    className="flex flex-col-reverse md:flex-row justify-evenly items-center gap-10 md:gap-20 pt-15 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200"
                >
                    <div className="flex flex-col justify-center items-start gap-2.5 text-start">
                        <h2 className="text-lg md:text-xl font-semibold text-black">
                            Transform your life through education
                        </h2>
                        <p className="text-sm md:text-[16px] text-[#1D2939] leading-relaxed">
                            Learners around the world are launching new careers, advancing in{" "}
                            <br className="hidden md:block" /> their fields, and enriching their lives.
                        </p>
                        <Link
                            to={"/usercourses"}
                            className="bg-[#020617] text-white flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-lg cursor-pointer text-sm md:text-base"
                        >
                            <p className="text-white">Checkout Courses</p>
                            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src="images/becomeInstructor2.png"
                            className="w-60 h-60 md:w-118 md:h-95 object-contain"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}