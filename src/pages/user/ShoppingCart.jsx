import { CartCourses } from "../../components/user/cart/CartCourses"
import { Footer } from "../../components/user/shared/Footer"
import { NavBar } from "../../components/user/shared/NavBar"

export const ShoppingCart = () => {
    return (
        <div className="">
            <nav>
                <NavBar />
                <hr className="text-gray-200" />
            </nav>
            <main>
                <CartCourses />
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}