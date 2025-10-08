import { CourseForm } from "../../components/admin/course/CourseForm"
import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { MobileNav } from "../../components/admin/dashboard/MobileNav"
import { Header } from "../../components/admin/shared/Header"

export const AddCourse = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 h-screen">
            <div className="hidden lg:block lg:col-span-1 lg:h-full lg:w-full">
                <DashboardNav></DashboardNav>
            </div>
            <div className="lg:col-span-4 lg:px-10 lg:py-5 bg-custom-gray">
                <div className="flex lg:hidden w-full h-20">
                    <MobileNav />
                </div>
                <Header type={"Course"}></Header>
                <hr className="text-gray-200 my-8" />
                <CourseForm mode={"add"}></CourseForm>
            </div>
        </div>

    )
}