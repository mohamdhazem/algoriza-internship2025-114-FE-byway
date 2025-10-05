import { atom } from "jotai"
import { DashboardCards } from "../../components/admin/dashboard/DashboardCards"
import { DashboardHeader } from "../../components/admin/dashboard/DashboardHeader"
import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { StatisticsChart } from "../../components/admin/dashboard/StatisticsChart"
import WalletChart from "../../components/admin/dashboard/WalletChart"
import { useEffect, useState } from "react"
import api from "../../api"
import { atomWithStorage } from "jotai/utils"

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
        <div className="grid grid-cols-5 h-screen">
            <div className="col-span-1 h-full w-full">
                <DashboardNav></DashboardNav>
            </div>
            <div className="col-span-4 px-10 py-5 bg-custom-gray">
                <DashboardHeader></DashboardHeader>
                <hr className="text-gray-200 my-8" />
                <DashboardCards instructorsNumber={instructorsNumber} categoriesNumber={categoriesNumber} coursesNumber={coursesNumber}></DashboardCards>
                <div className="grid grid-cols-5 my-10">
                    <div className="col-span-3 mr-8">
                        <WalletChart></WalletChart>
                    </div>
                    <div className="col-span-2 h-full">
                        <StatisticsChart
                            instructors={instructorsNumber}
                            categories={categoriesNumber}
                            courses={coursesNumber}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}