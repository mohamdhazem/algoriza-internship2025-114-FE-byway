import { useParams } from "react-router-dom";
import { CourseForm } from "../../components/admin/course/CourseForm"
import { DashboardNav } from "../../components/admin/dashboard/DashboardNav"
import { Header } from "../../components/admin/shared/Header"
import { MobileNav } from "../../components/admin/dashboard/MobileNav";

export const EditCourse = () => {
    const { id } = useParams();

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
                <CourseForm mode={"edit"} courseId={id}></CourseForm>
            </div>
        </div>
    )
}
