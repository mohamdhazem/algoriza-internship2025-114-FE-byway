import { SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="flex flex-row gap-5 items-center px-4 md:px-15 py-2.5 relative">
            <div className="flex items-center pr-17">
                <Link
                    className="flex items-center sm:pr-6 md:pr-17"
                    to="/landing">
                    <img src={`${import.meta.env.BASE_URL}icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png`}
                        alt=""
                        className="h-8 w-full md:h-10 md:w-10" />
                    <h3 className="text-gray-700 font-medium text-[18px] md:text-[16px] md:font-medium ml-0.5 md:m-0">Byway</h3>
                </Link>
            </div>
            <div className="hidden md:flex md:items-center md:w-full md:gap-4">
                <div className="flex items-center w-full order-3 md:order-none md:max-w-155 px-3 py-2 border rounded-lg border-gray-200 mt-2 md:mt-0">
                    <SearchIcon width={18} height={18} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search courses"
                        className="w-full outline-none bg-transparent font-inter font-medium text-sm leading-5 tracking-normal"
                    />
                </div>

                <h3 className="text-gray-700 font-inter font-medium text-sm leading-5 tracking-normal">
                    Courses
                </h3>
            </div>
        </div>
    )
}