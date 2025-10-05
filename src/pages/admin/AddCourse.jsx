import { CourseForm } from "../../components/admin/course/CourseForm"
import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { Header } from "../../components/admin/shared/Header"

export const AddCourse = () => {
    return (
        <div className="grid grid-cols-5 h-screen">
            <div className="col-span-1 h-screen w-full">
                <DashboardNav></DashboardNav>
            </div>
            <div className="col-span-4 px-10 py-5 bg-custom-gray">
                <Header type={"Course"}></Header>
                <hr className="text-gray-200 my-8" />
                <CourseForm mode={"add"}></CourseForm>
            </div>
        </div>
    )
}