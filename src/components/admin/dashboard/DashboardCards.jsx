import { useEffect, useState } from "react"
import api from "../../../api"

export const DashboardCards = ({instructorsNumber, categoriesNumber, coursesNumber}) => {


    return (
        <div className="flex justify-between items-center w-full gap-4">
            <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-2xl flex-1">
                <div className="flex flex-row items-center justify-between gap-10 pt-4 px-5">
                    <h2 className="font-medium text-black">{instructorsNumber}</h2>
                    <div className="flex items-center justify-center rounded-xl bg-blue-50 w-10 h-10">
                        <img src={`${import.meta.env.BASE_URL}icons/usericon.png`} alt="" />
                    </div>
                </div>
                <p className="text-start px-5 pb-4 pt-1 font-semibold text-black">Instructors</p>
            </div>
            <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-2xl flex-1">
                <div className="flex flex-row items-center justify-between gap-10 pt-4 px-5">
                    <h2 className="font-medium text-black">{categoriesNumber}</h2>
                    <div className="flex items-center justify-center rounded-xl bg-blue-50 w-10 h-10">
                        <img src={`${import.meta.env.BASE_URL}icons/fileIcon.png`} alt="" />
                    </div>
                </div>
                <p className="text-start px-5 pb-4 pt-1 font-semibold text-black">Categories</p>
            </div>
            <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-2xl flex-1">
                <div className="flex flex-row items-center justify-between gap-10 pt-4 px-5">
                    <h2 className="font-medium text-black">{coursesNumber}</h2>
                    <div className="flex items-center justify-center rounded-xl bg-blue-50 w-10 h-10">
                        <img src={`${import.meta.env.BASE_URL}icons/folderIcon.png`} alt="" />
                    </div>
                </div>
                <p className="text-start px-5 pb-4 pt-1 font-semibold text-black">Courses</p>
            </div>
        </div>
    )
}