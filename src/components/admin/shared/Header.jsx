import { useAtom } from "jotai"
import { userAtom } from "../../../store/userAtom"


export const Header = ({ type }) => {
    const [userClaims] = useAtom(userAtom);

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-baseline-last">
                <h1 className="font-ibm font-medium  text-3xl text-[#202637] pr-2">{type}</h1>
                <p className="text-[#626C83] text-xs">
                    <span className="font-bold mr-1">Dashboard
                    </span>
                    / {type}
                </p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="bg-white shadow w-12 h-12 border border-white rounded-4xl flex items-center justify-center">
                    <div className="relative ">
                        <img src="/icons/alert.svg" alt="Alert" className="" />
                        <span className="absolute top-1/30 -right-1/9 w-2 h-2 bg-red-600 border border-white rounded-full"></span>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-[#334155] rounded-full w-10.5 h-10.5">
                    <p className="text-white font-medium">{userClaims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]?.charAt(0).toUpperCase() ?? "?"}</p>
                </div>
            </div>
        </div>
    )
}