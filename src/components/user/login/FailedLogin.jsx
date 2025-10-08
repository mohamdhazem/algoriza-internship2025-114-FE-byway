import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function FailedLogin({ provider }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC] px-6 text-center">
            <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="text-red-500 w-14 h-14" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Login Failed
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Oops! Something went wrong while signing in with {provider}.
                    <br />
                    Please try again or use a different login method.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/userlogin")}
                        className="bg-[#2563EB] hover:bg-[#1E40AF] text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/landing")}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-100 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
