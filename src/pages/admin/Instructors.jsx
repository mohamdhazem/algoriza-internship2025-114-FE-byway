import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { Header } from "../../components/admin/shared/Header"
import { InstructorsTable } from "../../components/admin/instructor/InstructorsTable"
import { MobileNav } from "../../components/admin/dashboard/MobileNav"

export const Instructors = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 h-screen">
            <div className="hidden lg:block lg:col-span-1 lg:h-full lg:w-full">
                <DashboardNav/>
            </div>
            <div className="lg:col-span-4 lg:px-10 lg:py-5 bg-custom-gray">
                <div className="flex lg:hidden w-full h-20">
                    <MobileNav />
                </div>
                <Header type={"Instructor"}/>
                <hr className="text-gray-200 my-8" />
                <InstructorsTable/>
            </div>
        </div>
    )
}