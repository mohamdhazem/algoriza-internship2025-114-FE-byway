import { LoginForm } from "../../components/shared/LoginForm"
import { NavBar } from "../../components/user/shared/NavBar"

export const UserLogin = () => {
    return (
        <div className="h-screen overflow-hidden font-inter">
            <main>
                <NavBar></NavBar>
                <hr className="text-gray-200" />
                <LoginForm role={"user"}></LoginForm>
            </main>
        </div>
    )
}