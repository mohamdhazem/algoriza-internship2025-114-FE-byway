import { useAtom } from "jotai";
import { userAtom } from "../../../store/userAtom"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { clickedPageAtom } from "../../../pages/admin/Dashboard";
import { Menu, X } from "lucide-react"; // icons for open/close

export const MobileNav = () => {
    const [clickedPage, setClickedPage] = useAtom(clickedPageAtom);
    const navigate = useNavigate();

    const [userClaims] = useAtom(userAtom);

    const [isopen, setIsOpen] = useState(false);

    const handleClick = (page) => {
        setClickedPage(page);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Landing")
    }
    return (
        <>
            <div className="flex justify-between items-center fixed w-full bg-white border-b border-gray-200 shadow-xs z-50 p-3">
                <div className="flex items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png`}
                        alt="logo"
                        className="h-10 min-w-10"
                    />
                    <p className="ml-2 font-semibold text-lg text-gray-700">Byway</p>
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                    <div className="flex sm:hidden items-center justify-between gap-4">
                        <div className="bg-white shadow w-9 h-9 border border-white rounded-4xl flex items-center justify-center">
                            <div className="relative ">
                                <img src={`${import.meta.env.BASE_URL}icons/alert.svg`} alt="Alert" className="" />
                                <span className="absolute top-1/30 -right-1/9 w-2 h-2 bg-red-600 border border-white rounded-full"></span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center bg-[#334155] rounded-full w-9 h-9">
                            <p className="text-white font-medium">{userClaims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]?.charAt(0).toUpperCase() ?? "?"}</p>
                        </div>
                    </div>

                    <button
                        className="bg-white p-2 rounded-md shadow-md border border-gray-200 w-10 h-10 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsOpen(!isopen)}
                    >
                        {isopen ? (
                            <X className="w-5 h-5 text-gray-700" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-15 h-screen w-4/5 sm:w-2/5 lg:w-1/5 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40
                    ${isopen ? "translate-x-0 pt-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >

                <div className="flex flex-col gap-1 pt-4 text-start px-4">
                    <Link
                        to="/Dashboard"
                        onClick={() => handleClick("dashboard")}
                        className={`flex items-center gap-2.5 p-3 rounded-xl transition-colors duration-300 ${clickedPage === "dashboard"
                            ? "bg-[#EEF2FF] text-[#5879DC]"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <img
                            src={
                                clickedPage === "dashboard"
                                    ? `${import.meta.env.BASE_URL}icons/homeBlue.svg`
                                    : `${import.meta.env.BASE_URL}icons/home.svg`
                            }
                            className="w-5 h-5"
                            alt=""
                        />
                        <p className="text-sm">Dashboard</p>
                    </Link>

                    <Link
                        to="/Instructors"
                        onClick={() => handleClick("instructor")}
                        className={`flex items-center gap-2.5 p-3 rounded-xl transition-colors duration-300 ${clickedPage === "instructor"
                            ? "bg-[#EEF2FF] text-[#5879DC]"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <img
                            src={
                                clickedPage === "instructor"
                                    ? `${import.meta.env.BASE_URL}icons/userBlue.svg`
                                    : `${import.meta.env.BASE_URL}icons/user.svg`
                            }
                            className="w-5 h-5"
                            alt=""
                        />
                        <p className="text-sm">Instructors</p>
                    </Link>

                    <Link
                        to="/Courses"
                        onClick={() => handleClick("course")}
                        className={`flex items-center gap-2.5 p-3 rounded-xl transition-colors duration-300 ${clickedPage === "course"
                            ? "bg-[#EEF2FF] text-[#5879DC]"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <img
                            src={
                                clickedPage === "course"
                                    ? `${import.meta.env.BASE_URL}icons/fileBlue.svg`
                                    : `${import.meta.env.BASE_URL}icons/file.svg`
                            }
                            className="w-5 h-5"
                            alt=""
                        />
                        <p className="text-sm">Courses</p>
                    </Link>

                    <hr className="border-gray-200 my-3" />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 p-3 cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}icons/log-out-03.png`}
                            alt=""
                            className="w-5 h-5"
                        />
                        <p className="text-sm">Logout</p>
                    </button>
                </div>
            </div>
        </>
    );
}