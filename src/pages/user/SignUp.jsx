import { Registerform } from "../../components/user/login/Registerform"
import { NavBar } from "../../components/user/shared/NavBar"

export const SignUp = () => {
    return (
        <div className="h-screen overflow-hidden">
            <NavBar></NavBar>
            <hr className="text-gray-200" />
            <Registerform></Registerform>
        </div>
    )
}