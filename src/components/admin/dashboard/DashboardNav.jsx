import { useAtom } from "jotai";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { clickedPageAtom } from "../../../pages/admin/Dashboard";

export const DashboardNav = () => {
    const [clickedPage, setClickedPage] = useAtom(clickedPageAtom);
    const navigate = useNavigate();


    const handleClick = (page) => {
        setClickedPage(page);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/AdminLogin")
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-1/5 border-r border-r-gray-200">
            <div className="">
                <Link
                    className="flex items-center pt-3 pl-3"
                    to="/adminlogin">
                    <img src="/icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png"
                        alt=""
                        className="h-10 min-w-10" />
                    <p>Byway</p>
                </Link>
            </div>
            <div className="flex flex-col gap-1 pt-10 text-start px-8">
                <Link
                    to={"/Dashboard"}
                    onClick={() => handleClick("dashboard")}
                    className={
                        clickedPage === "dashboard"
                            ? "flex items-center gap-2.5 bg-[#EEF2FF] text-[#5879DC] p-3 rounded-xl transition-colors duration-500 ease-in-out"
                            : "flex items-center gap-2.5 p-3 transition-colors duration-500 ease-in-out"
                    }
                >
                    <img src={clickedPage === "dashboard" ? "/icons/homeBlue.svg" : "/icons/home.svg"} className="w-4.5 h-5" alt="" />
                    <p className="text-sm">Dashboard</p>
                </Link>
                <Link
                    to={"/Instructors"}
                    onClick={() => handleClick("instructor")}
                    className={clickedPage === "instructor"
                        ? "flex items-center gap-2.5 bg-[#EEF2FF] text-[#5879DC] p-3 rounded-xl transition-colors duration-500 ease-in-out"
                        : "flex items-center gap-2.5 p-3 transition-colors duration-500 ease-in-out"
                    }
                >
                    <img src={clickedPage === "instructor" ? "/icons/userBlue.svg" : "/icons/user.svg"} className="w-4.5 h-5" alt="" />
                    <p className="text-sm">Instructors</p>
                </Link>
                <Link
                    to={"/Courses"}
                    onClick={() => handleClick("course")}
                    className={clickedPage === "course"
                        ? "flex items-center gap-2.5 bg-[#EEF2FF] text-[#5879DC] p-3 rounded-xl transition-colors duration-500 ease-in-out"
                        : "flex items-center gap-2.5 p-3 transition-colors duration-500 ease-in-out"
                    }
                >
                    <img src={clickedPage === "course" ? "/icons/fileBlue.svg" : "/icons/file.svg"} className="w-4.5" alt="" />
                    <p className="text-sm">Courses</p>
                </Link>
                <hr className="flex-grow border-gray-200 my-2" />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 p-3 cursor-pointer">
                    <img src="/icons/log-out-03.png" alt="" />
                    <p className="text-gray-500 text-sm">Logout</p>
                </button>

            </div>
        </div>
    )
}