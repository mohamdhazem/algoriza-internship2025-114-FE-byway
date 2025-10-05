import { useParams } from "react-router-dom"
import { CourseDetailsContent } from "../../components/user/courses/CourseDetailsContent"
import { Footer } from "../../components/user/shared/Footer"
import { NavBar } from "../../components/user/shared/NavBar"

export const CourseDetails = () => {
    const { id } = useParams();

    return (
        <div className="">
            <nav>
                <NavBar />
                <hr className="text-gray-200" />
            </nav>
            <main>
                <CourseDetailsContent id={id} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}