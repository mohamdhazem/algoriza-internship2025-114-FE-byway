import { Completed } from "../../components/user/Order/Completed"
import { Footer } from "../../components/user/shared/Footer"
import { NavBar } from "../../components/user/shared/NavBar"

export const CompletedOrder = () => {
    return (
        <div className="">
            <NavBar></NavBar>
            <hr className="text-gray-200" />
            <main>
                <Completed />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}