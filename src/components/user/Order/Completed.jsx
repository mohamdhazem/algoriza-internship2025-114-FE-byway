import { Link } from "react-router-dom"

export const Completed = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 py-23">
            <div className="w-40 h-40 md:w-50 md:h-50 rounded-full bg-[#16A34A] flex justify-center items-center">
                <img src={`${import.meta.env.BASE_URL}icons/payment/trueVector.svg`} alt="" />
            </div>
            <h1 className="text-3xl md:text-[40px]">Purchase Complete</h1>
            <h3 className="text-xl md:text-[24px] text-[#595959] md:-mt-2">You Will Receive a confirmation email soon! </h3>
            <Link
                to={"/Landing"}
                className="bg-[#020617] rounded-lg cursor-pointer text-white h-[50px] w-[277px] text-[16px] mt-2 flex items-center justify-center">
                Back to home
            </Link>
        </div>
    )
}