import { NavBar } from "../../components/user/shared/NavBar"
import { Signupform } from "../../components/user/Login/Signupform"

export const SignUp = () => {
    return (
        <div className="h-screen overflow-hidden">
            <NavBar></NavBar>
            <hr className="text-gray-200" />
            <Signupform></Signupform>
        </div>
    )
}