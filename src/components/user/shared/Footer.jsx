import { Link } from "react-router-dom"


export const Footer = () => {
    return (
        <div className="px-6 sm:px-10 lg:px-20 py-10 lg:py-20 bg-[#1E293B] font-inter">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                {/* Logo + Description */}
                <div className="flex flex-col justify-center items-start gap-3 w-full lg:w-1/3">
                    <a
                        href="#nav"
                        className="flex items-center -ml-2">
                        <img
                            src="/icons/37c5de785384c3fafe195a0ef1d99825e88d3fdf.png"
                            alt=""
                            className="h-10 min-w-10"
                        />
                        <h4 className="text-gray-100 text-xl font-medium">Byway</h4>
                    </a>
                    <div className="text-start">
                        <p className="text-sm text-[#CBD5E1]">
                            Empowering learners through accessible and engaging online education. <br />
                            Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.
                        </p>
                    </div>
                </div>

                {/* Get Help */}
                <div className="flex flex-col items-start gap-1 w-full sm:w-1/2 lg:w-auto">
                    <h5 className="text-gray-100 pb-1">Get Help</h5>
                    <p className="text-gray-300">Contact Us</p>
                    <p className="text-gray-300">Latest Articles</p>
                    <p className="text-gray-300">FAQ</p>
                </div>

                {/* Programs */}
                <div className="flex flex-col items-start gap-1 w-full sm:w-1/2 lg:w-auto">
                    <h5 className="text-gray-100 pb-1">Programs</h5>
                    <p className="text-gray-300">Art & Design</p>
                    <p className="text-gray-300">Business</p>
                    <p className="text-gray-300">IT & Software</p>
                    <p className="text-gray-300">Languages</p>
                    <p className="text-gray-300">Programming</p>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-start gap-1 w-full lg:w-auto">
                    <h5 className="text-gray-100 pb-1">Contact Us</h5>
                    <p className="text-gray-300">Address: 123 Main Street, Anytown, CA 12345</p>
                    <p className="text-gray-300">Tel: +(123) 456-7890</p>
                    <p className="text-gray-300">Mail: bywayedu@webkul.in</p>

                    <div className="flex flex-wrap justify-start items-center gap-4 pt-4">
                        <img src="/icons/social/facebook.svg" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1.5 cursor-pointer bg-white" alt="facebook" />
                        <img src="/icons/social/github.svg" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1.5 cursor-pointer bg-white" alt="github" />
                        <img src="/icons/social/google.svg" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1.5 cursor-pointer bg-white" alt="google" />
                        <img src="/icons/social/x.svg" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1.5 cursor-pointer bg-white" alt="x" />
                        <img src="/icons/social/microsoft.svg" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1.5 cursor-pointer bg-white" alt="microsoft" />
                    </div>
                </div>
            </div>
        </div>
    )
}