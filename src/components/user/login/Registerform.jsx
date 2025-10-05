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
            showError(backendMsg);
        }
    }

    return (
        <div className="grid grid-cols-7 ">
            <div className="col-span-3 h-screen">
                <img
                    src="/images/bg2.jpg"
                    alt="Background"
                    className="h-full object-cover"
                />
            </div>
            <div className="col-span-4 flex flex-col justify-center px-10 h-screen -mt-6">
                <div>
                    <h1 className="font-inter font-semibold text-[32px] leading-[130%] tracking-normal text-center">Create Your Account</h1>
                </div>
                <form onSubmit={handleSubmit}
                    className="pt-4"
                    noValidate
                >
                    <div className="pt-2 flex flex-col items-start">
                        <label
                            htmlFor="email"
                            className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                        >
                            Full Name
                        </label>
                        <div className="flex flex-row gap-10 w-full">
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    placeholder="First Name"
                                    className="bg-background flex-1 px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

                            </div>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    placeholder="Last Name"
                                    className="bg-background flex-1 px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 flex flex-col items-start">
                        <label
                            htmlFor="username"
                            className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                        >
                            Username
                        </label>
                        <input type="text" id="userName" name="userName" required
                            placeholder="Username"
                            onChange={handleChange}
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                        {errors.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
                    </div>
                    <div className="pt-2 flex flex-col items-start">
                        <label
                            htmlFor="email"
                            className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                        >
                            Email
                        </label>
                        <input type="email" id="email" name="email" required
                            placeholder="Email ID"
                            onChange={handleChange}
                            className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="flex w-full gap-10">
                        <div className="pt-4 flex-1 flex flex-col items-start">
                            <label
                                htmlFor="password"
                                className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                            >
                                Password
                            </label>
                            <input type="password" id="password" name="password" required
                                placeholder="Enter Password"
                                onChange={handleChange}
                                className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                        </div>
                        <div className="pt-4 flex-1 flex flex-col items-start">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-1 font-inter font-semibold text-lg leading-[160%] tracking-normal"
                            >
                                Confirm Password
                            </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                className="bg-background w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-950"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-1 text-white text-sm font-semibold bg-gray-950 py-2 mt-4 px-6 border rounded-lg border-gray-200 cursor-pointer"
                    >
                        Create Account <ArrowRightIcon size={22}></ArrowRightIcon>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-sm text-gray-500">Sign in with</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50">
                        <img src="icons/facebook.png" alt="Facebook" className="w-5 h-5" />
                        <span className="text-sm text-blue-600">Facebook</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50">
                        <img src="icons/google.png" alt="Google" className="w-5 h-5" />
                        <span className="text-sm text-red-400 ">Google</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg border-gray-200 hover:bg-gray-50">
                        <img src="icons/microsoft.png" alt="Microsoft" className="w-5 h-5" />
                        <span className="text-sm ">Microsoft</span>
                    </button>
                </div>
            </div>
        </div>
    )
}