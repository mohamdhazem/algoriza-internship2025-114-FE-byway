import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { Header } from "../../components/admin/shared/Header"
import { InstructorsTable } from "../../components/admin/instructor/InstructorsTable"

export const Instructors = () => {
    return (
        <div className="grid grid-cols-5 h-screen">
            <div className="col-span-1 h-full w-full">
                <DashboardNav></DashboardNav>
            </div>
            <div className="col-span-4 px-10 py-5 bg-custom-gray">
                <Header type={"Instructor"}></Header>
                <hr className="text-gray-200 my-8" />
                <InstructorsTable></InstructorsTable>
            </div>
        </div>
    )
}