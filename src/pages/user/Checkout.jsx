import { PaymentDetails } from "../../components/user/Order/PaymentDetails"
import { Footer } from "../../components/user/shared/Footer"
import { NavBar } from "../../components/user/shared/NavBar"

export const Checkout = () => {
    return (
        <div className="">
            <nav>
                <NavBar />
                <hr className="text-gray-200" />
            </nav>
            <main>
                <PaymentDetails />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}