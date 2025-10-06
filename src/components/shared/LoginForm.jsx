import { ArrowRightIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../auth";
import { jwtDecode } from "jwt-decode";
import { refreshUserAtom, userAtom } from "../../store/userAtom";
import { useAtom, useSetAtom } from "jotai";
import { cartCoursesCountAtom, refreshCartCoursesCountAtom } from "../../store/cartAtom";
import api from "../../api";

// based on role will call the suitable login api
export const LoginForm = ({ role }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [, refreshCartCount] = useAtom(refreshCartCoursesCountAtom);

    const serRefreshUserAtom = useSetAtom(refreshUserAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            try {
                if (role === "admin") {
                    const res = await api.post("/account/AdminLogin", {
                        email,
                        password,
                    });

                    localStorage.setItem("token", res.data.token);
                    navigate("/dashboard");
                }
                else {
                    const res = await api.post("/account/UserLogin", {
                        email,
                        password,
                    });

                    localStorage.setItem("token", res.data.token);
                    serRefreshUserAtom();

                    try {
                        refreshCartCount();
                    } catch (countErr) {
                        console.error("Failed to load cart count:", countErr);
                    }

                    navigate("/Landing");
                }

            } catch (err) {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Invalid email or password");
        }
    }

    const googleHandler = async () => {
        try {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/Account/Google-Login`;

        } catch (error) {
            console.log(error);
        }
    }

    const microsoftHandler = async () => {
        try {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/Account/Microsoft-Login`;

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="grid grid-cols-7 ">
            <div className="col-span-4 flex flex-col justify-center px-10 h-screen">
                <div>
                    <h1 className="font-inter font-semibold text-[32px] leading-[130%] tracking-normal text-center">Sign in to your account</h1>
                </div>
                <form onSubmit={handleSubmit}
                    className="py-4"
                >
                    <div className="pt-2 flex flex-col items-start">
                        <label
                            htmlFor="email"
                            className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                        >
                            Email
                        </label>
                        <input type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Username or Email ID"
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                    </div>
                    <div className="pt-4 flex flex-col items-start">
                        <label
                            htmlFor="name"
                            className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                        >
                            Password
                        </label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Password"
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-1 text-white text-sm font-semibold bg-gray-950 py-2 mt-4 px-6 border rounded-lg border-gray-200 cursor-pointer"
                    >
                        Sign In <ArrowRightIcon size={22}></ArrowRightIcon>
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </form>

                {/* Divider */}
                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-sm text-gray-500">Sign in with</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-3 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <img src={`${import.meta.env.BASE_URL}icons/facebook.png`} alt="Facebook" className="w-5 h-5" />
                        <span className="text-sm text-blue-600">Facebook</span>
                    </button>

                    <button
                        onClick={googleHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <img src={`${import.meta.env.BASE_URL}icons/google.png`} alt="Google" className="w-5 h-5" />
                        <span className="text-sm text-red-400 ">Google</span>
                    </button>

                    <button
                        onClick={microsoftHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <img src={`${import.meta.env.BASE_URL}icons/microsoft.png`} alt="Microsoft" className="w-5 h-5" />
                        <span className="text-sm ">Microsoft</span>
                    </button>
                </div>


            </div>
            <div className="col-span-3 h-screen">
                <img
                    src={`${import.meta.env.BASE_URL}images/bg1.jpg`}
                    alt="Background"
                    className="h-full object-cover"
                />
            </div>
        </div>
    )
}