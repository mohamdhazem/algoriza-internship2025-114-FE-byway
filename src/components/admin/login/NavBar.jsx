import { SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="flex flex-row gap-5 items-center px-15 py-2.5 relative">
            <div className="flex items-center pr-17">
                <Link
                    className="flex items-center pr-17"
                    to="/adminlogin">
                    <img src="icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png"
                        alt=""
                        className="h-10 min-w-10" />
                    <h3 className="text-gray-700 text-lg">Byway</h3>
                </Link>
            </div>
            <div className="flex items-center w-full max-w-155 px-3 py-2 border rounded-lg border-gray-200">
                <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search courses"
                    className="w-full outline-none bg-transparent font-inter font-medium text-sm leading-5 tracking-normal"
                />
            </div>

            <div>
                <h3 className="text-gray-700 font-inter font-medium text-sm leading-5 tracking-normal">Courses</h3>
            </div>
        </div>
    )
}