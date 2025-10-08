
export const DashboardHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="font-medium text-[28px] text-[#202637]">Dashboard</h1>
            <div className="hidden sm:flex bg-white shadow w-12 h-12 border border-white rounded-4xl items-center justify-center">
                <div className="relative">
                    <img src={`${import.meta.env.BASE_URL}icons/alert.svg`} alt="Alert" className="" />
                    <span className="absolute top-1/30 -right-1/9 w-2 h-2 bg-red-600 border border-white rounded-full"></span>
                </div>
            </div>
        </div>
    )
}