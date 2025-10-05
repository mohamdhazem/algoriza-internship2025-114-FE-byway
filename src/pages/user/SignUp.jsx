import { SignUpForm } from "../../components/user/Login/SignUpForm"
import { NavBar } from "../../components/user/shared/NavBar"

export const SignUp = () => {
    return (
        <div className="h-screen overflow-hidden">
            <NavBar></NavBar>
            <hr className="text-gray-200" />
            <SignUpForm></SignUpForm>
        </div>
    )
}