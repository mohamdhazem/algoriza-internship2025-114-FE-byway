import { CoursesSearch } from "../../components/user/courses/CoursesSearch"
import { Footer } from "../../components/user/shared/Footer"
import { NavBar } from "../../components/user/shared/NavBar"

export const UserCourses = () => {
    return (
        <div className="font-inter">
            <nav>
                <NavBar/>
            </nav>
            <hr className="text-gray-200" />
            <main>
                <CoursesSearch/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}