import { Footer } from "../../components/user/shared/Footer"
import { LandingContent } from "../../components/user/landing/LandingContent"
import { NavBar } from "../../components/user/shared/NavBar"

export const Landing = () => {

    return (
        <div className="">
            <NavBar></NavBar>
            <hr className="text-gray-200" />
            <main>
                <LandingContent></LandingContent>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}