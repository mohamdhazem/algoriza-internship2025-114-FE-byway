import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { LogOut, SearchIcon, ShoppingBasket } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { courseSearchAtom } from "../../../store/courseSearchAtom"
import { isLoggedIn, logout } from "../../../auth"
import { LoggedIn, userAtom } from "../../../store/userAtom"
import { useEffect, useState } from "react"
import { cartCoursesCountAtom } from "../../../store/cartAtom"

export const NavBar = () => {
    const [search, setSearch] = useAtom(courseSearchAtom);
    const navigate = useNavigate();

    const userClaims = useAtomValue(userAtom);
    const setUser = useSetAtom(userAtom);

    const cartCoursesCount = useAtomValue(cartCoursesCountAtom);

    // const isLoggedIn = useAtomValue(LoggedIn);

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/userlogin");
    }

    return (
        <div id="nav" className="flex flex-row gap-5 items-center px-15 py-2.5 relative font-inter">
            <Link to="/Landing">
                <div className="flex items-center pr-17">
                    <img src="/icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png"
                        alt=""
                        className="h-10 min-w-10" />
                    <h3 className="text-gray-700 font-medium text-[16px]">Byway</h3>
                </div>
            </Link>
            <div className="flex items-center w-full max-w-155 px-3 py-2 border rounded-lg border-gray-200">
                <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses"
                    className="w-full outline-none bg-transparent font-inter font-medium text-sm leading-5 tracking-normal"
                />
            </div>

            <div>
                <h3 className="text-gray-700 font-inter font-medium text-sm leading-5 tracking-normal">Courses</h3>
            </div>

            {
                isLoggedIn() ? (
                    <div className="flex justify-between items-center gap-4.5 ml-auto">
                        <div className="flex justify-between items-center gap-4.5 pt-1.5">
                            <Link
                                to={"/cart"}
                                className="relative w-6 h-6">
                                <img src="/icons/nav/basket.svg" className="w-5 h-5" alt="" />
                                {cartCoursesCount > 0 && (
                                    <span className="absolute -top-[4px] -right-[1px] w-[14px] h-[14px] bg-red-600 border border-white rounded-full flex justify-center items-center">
                                        <p className="text-[9px] text-white font-semibold">{cartCoursesCount}</p>
                                    </span>
                                )}
                            </Link>
                            <div className="w-6 h-6">
                                <img src="/icons/nav/useralert.svg" className="w-[17.5px] h-[20px]" alt="" />
                            </div>
                            <div
                                onClick={handleLogout}
                                className="w-6 h-6 cursor-pointer">
                                <img src="/icons/nav/logout.svg" alt="" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center bg-[#334155] rounded-full w-10 h-10">
                            <p className="text-white font-medium">{userClaims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]?.charAt(0).toUpperCase() ?? "?"}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center gap-3 ml-auto">
                        <Link to={"/UserLogin"} className="flex items-center justify-center border rounded-lg border-gray-700 text-gray-700 w-20 h-10 hover:bg-gray-200 transition-colors duration-300 ease-in-out">Log In</Link>
                        <Link to={"/SignUp"} className="flex items-center justify-center border rounded-lg border-gray-700 bg-gray-700 text-white w-22 h-10">Sign Up</Link>
                    </div>
                )
            }
        </div>
    )
}