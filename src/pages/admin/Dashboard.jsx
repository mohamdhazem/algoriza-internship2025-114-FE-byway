import { atom } from "jotai"
import { DashboardCards } from "../../components/admin/dashboard/DashboardCards"
import { DashboardHeader } from "../../components/admin/dashboard/DashboardHeader"
import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { StatisticsChart } from "../../components/admin/dashboard/StatisticsChart"
import WalletChart from "../../components/admin/dashboard/WalletChart"
import { useEffect, useState } from "react"
import api from "../../api"
import { atomWithStorage } from "jotai/utils"
import { MobileNav } from "../../components/admin/dashboard/MobileNav"

export const clickedPageAtom = atomWithStorage("clickedPage", "dashboard");

export const Dashboard = () => {
    const [instructorsNumber, setInstructorsNumber] = useState(0);
    const [coursesNumber, setCoursesNumber] = useState(0);
    const [categoriesNumber, setCategoriesNumber] = useState(0);

    useEffect(() => {
        api.get("/Instructor/Count")
            .then(res => setInstructorsNumber(res.data.count));

        api.get("/Category/Count")
            .then(res => setCategoriesNumber(res.data.count));

        api.get("/Course/Count")
            .then(res => setCoursesNumber(res.data.count));
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
            {/* Sidebar */}
            <div className="hidden lg:block col-span-1 h-full w-full">
                <DashboardNav />
            </div>

            <div className="flex lg:hidden w-full h-20">
                <MobileNav />
            </div>

            {/* Main Content */}
            <div className="col-span-4 px-4 sm:px-6 md:px-8 lg:px-10 py-5 bg-custom-gray">
                <DashboardHeader />

                <hr className="text-gray-200 my-6 md:my-8" />

                {/* Cards Section */}
                <div className="mb-8">
                    <DashboardCards
                        instructorsNumber={instructorsNumber}
                        categoriesNumber={categoriesNumber}
                        coursesNumber={coursesNumber}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 my-6">
                    <div className="col-span-1 lg:col-span-3">
                        <WalletChart />
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <StatisticsChart
                            instructors={instructorsNumber}
                            categories={categoriesNumber}
                            courses={coursesNumber}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}