import { ArrowRightIcon, SearchIcon, Send } from "lucide-react"
import { NavBar } from "../../components/admin/login/NavBar"
import { LoginForm } from "../../components/shared/LoginForm"

export const AdminLogin = () => {
    return (
        <div className="h-screen overflow-hidden">
            <main>
                <NavBar></NavBar>
                <hr className="text-gray-200" />
                <LoginForm role={"admin"}></LoginForm>
            </main>
        </div>
    )
}