import { ArrowRightIcon } from "lucide-react"
import api from "../../../api";
import { showError } from "../../../utils/popup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { refreshUserAtom, userAtom } from "../../../store/userAtom";

export const Registerform = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const setUser = useSetAtom(userAtom);
    const serRefreshUserAtom = useSetAtom(refreshUserAtom);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))

    }

    const validate = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.firstName.trim()) newErrors.firstName = "FirstName is required";
        if (!formData.lastName.trim()) newErrors.lastName = "LastName is required";
        if (!formData.userName.trim()) newErrors.userName = "UserName is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "ConfirmPassword is required";
        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            var res = await api.post("/Account/UserRegister", formData, {
                headers: { "Content-Type": "application/json" }
            });

            localStorage.setItem("token", res.data.token);
            serRefreshUserAtom();
            navigate("/Landing");
        } catch (error) {
            const backendMsg = error.response?.data?.message || "Something went wrong";
            console.log(error);
            showError(backendMsg);
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
        <div className="grid grid-cols-1 md:grid-cols-7">
            <div className="col-span-3 h-[40vh] md:h-full">
                <img
                    src={`${import.meta.env.BASE_URL}images/bg2.jpg`}
                    alt="Background"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-span-4 flex flex-col justify-center px-6 sm:px-10 md:h-screen mt-10 mb-15">
                <div>
                    <h1 className="font-inter font-semibold text-[24px] sm:text-[32px] leading-[130%] tracking-normal text-center">
                        Create Your Account
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="pt-4 w-full mx-auto"
                    noValidate
                >
                    <div className="pt-2 flex flex-col items-start w-full">
                        <label
                            htmlFor="email"
                            className="block mb-1 font-inter font-semibold md:text-lg leading-[160%]"
                        >
                            Full Name
                        </label>
                        <div className="flex sm:flex-row gap-3 sm:gap-10 w-full">
                            <div className="flex flex-col items-start flex-1">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    placeholder="First Name"
                                    className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs">{errors.firstName}</p>
                                )}
                            </div>
                            <div className="flex flex-col items-start flex-1">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    placeholder="Last Name"
                                    className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs">{errors.lastName}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col items-start w-full">
                        <label
                            htmlFor="username"
                            className="block mb-1 font-inter font-semibold md:text-lg leading-[160%]"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            required
                            placeholder="Username"
                            onChange={handleChange}
                            className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-xs">{errors.userName}</p>
                        )}
                    </div>

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
                            required
                            placeholder="Email ID"
                            onChange={handleChange}
                            className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row w-full sm:gap-10">
                        <div className="pt-4 flex-1 flex flex-col items-start">
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
                                required
                                placeholder="Enter Password"
                                onChange={handleChange}
                                className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs">{errors.password}</p>
                            )}
                        </div>
                        <div className="pt-4 flex-1 flex flex-col items-start">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-1 font-inter font-semibold md:text-lg leading-[160%]"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                className="bg-background w-full px-4 py-2 md:py-3 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-1 text-white text-sm font-semibold bg-gray-950 w-full py-3 sm:py-2.5 mt-8 md:mt-4 px-6 border rounded-4xl sm:rounded-lg border-gray-200 cursor-pointer sm:w-auto"
                    >
                        Create Account <ArrowRightIcon size={22} />
                    </button>
                </form>

                <div className="flex items-center my-6 w-full mx-auto">
                    <hr className="flex-grow border-[#94A3B8]" />
                    <span className="mx-3 text-sm text-gray-500">Sign Up with</span>
                    <hr className="flex-grow border-[#94A3B8]" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mx-auto">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer">
                        <img
                            src={`${import.meta.env.BASE_URL}icons/facebook.png`}
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                        <span className="text-sm text-blue-600">Facebook</span>
                    </button>

                    <button
                        onClick={googleHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer">
                        <img
                            src={`${import.meta.env.BASE_URL}icons/google.png`}
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-sm text-red-400">Google</span>
                    </button>

                    <button
                        onClick={microsoftHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:py-3 border rounded-4xl sm:rounded-lg border-[#B2B5C4] hover:bg-gray-50 cursor-pointer">
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

    )
}