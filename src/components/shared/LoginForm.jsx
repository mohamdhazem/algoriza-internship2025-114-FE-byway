import { ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../../auth";
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

    // Login if token was saved before
    useEffect(() => {
        if (isLoggedIn() && role === "admin" && getUserRole().toLowerCase() === "admin")
            navigate("/dashboard");
    }, [])

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
                    serRefreshUserAtom();
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
        if (role.toLowerCase() !== "user")
            return;
        
        try {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/Account/Google-Login`;

        } catch (error) {
            console.log(error);
        }
    }

    const microsoftHandler = async () => {
        if (role.toLowerCase() !== "user")
            return;

        try {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/Account/Microsoft-Login`;

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-7 min-h-screen">
            <div className="col-span-3 order-1 md:order-2 h-[40vh] md:h-screen">
                <img
                    src={`${import.meta.env.BASE_URL}images/bg1.jpg`}
                    alt="Background"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-span-4 order-2 md:order-1 flex flex-col justify-center px-6 sm:px-10 py-8 md:py-0 h-auto md:h-screen mt-10 md:mt-0">
                <div>
                    <h1 className="font-inter font-semibold text-[24px] sm:text-[32px] leading-[130%] tracking-normal text-center">
                        Sign in to your account
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="pt-4 w-full mx-auto" noValidate>
                    <div className="pt-2 flex flex-col items-start w-full">
                        <label
                            htmlFor="email"
                            className="block mb-1 font-inter font-semibold md:text-lg leading-[160%]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Username or Email ID"
                            className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                    </div>

                    <div className="pt-4 flex flex-col items-start w-full">
                        <label
                            htmlFor="password"
                            className="block mb-1 font-inter font-semibold md:text-lg leading-[160%]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Password"
                            className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-1 text-white text-sm font-semibold bg-gray-950 w-full py-3 sm:py-2.5 mt-8 md:mt-4 px-6 border rounded-4xl sm:rounded-lg border-gray-200 cursor-pointer sm:w-auto"
                    >
                        Sign In <ArrowRightIcon size={22} />
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>

                {/* Divider */}
                <div className="flex items-center my-6 w-full mx-auto">
                    <hr className="flex-grow border-[#94A3B8]" />
                    <span className="mx-3 text-sm text-gray-500">Sign in with</span>
                    <hr className="flex-grow border-[#94A3B8]" />
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full mx-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer">
                        <img
                            src={`${import.meta.env.BASE_URL}icons/facebook.png`}
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                        <span className="text-sm text-blue-600">Facebook</span>
                    </button>

                    <button
                        onClick={googleHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}icons/google.png`}
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-sm text-red-400">Google</span>
                    </button>

                    <button
                        onClick={microsoftHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}icons/microsoft.png`}
                            alt="Microsoft"
                            className="w-5 h-5"
                        />
                        <span className="text-sm">Microsoft</span>
                    </button>
                </div>
            </div>
        </div>
    );
}