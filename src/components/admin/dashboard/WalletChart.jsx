import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis } from "recharts";

import { useEffect, useState } from "react";
import api from "../../../api";
import { showError } from "../../../utils/popup";

// static data
const staticData = {
    deposits: [1400, 600, 800, 1500],
    withdrawals: [1100, 500, 600, 1300],
};

const allMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function WalletCard() {
    const [data, setData] = useState([]);
    const [currentMonthDeposit, setCurrentMonthDeposit] = useState(0);

    // Get current month index
    const today = new Date();
    const currentMonthIndex = today.getMonth(); // 0 = Jan, 11 = Dec

    useEffect(() => {
        try {
            api.get("/order/Deposit")
                .then(res => setCurrentMonthDeposit(res.data));
        } catch (error) {
            const backendMsg = error.response?.data?.message || "Something went wrong";
            showError(backendMsg);
        }

        const result = [];

        for (let i = -2; i <= 2; i++) {
            const monthIndex = (currentMonthIndex + i + 12) % 12;
            const month = allMonths[monthIndex];

            if (i === 0) {
                result.push({ month, deposits: currentMonthDeposit, withdrawals: currentMonthDeposit - 300 });
            } else {
                const staticIndex = i < 0 ? i + 2 : i + 1;
                result.push({
                    month,
                    deposits: staticData.deposits[staticIndex],
                    withdrawals: staticData.withdrawals[staticIndex],
                });
            }
        }

        setData(result);
    }, [currentMonthDeposit]);

    return (
        <div className="bg-white shadow-md rounded-2xl py-5 px-3 sm:p-5 grid grid-rows-[auto,1fr] gap-5">
            {/* Header Row */}
            <div className="flex justify-between items-center">
                <h3 className="text-[#202637] text-lg font-semibold">Wallet</h3>
                <span className="flex justify-center gap-2 bg-gray-100 text-[#A3AED0] text-sm px-3 py-2 rounded-lg">
                    <img src={`${import.meta.env.BASE_URL}icons/calenderVector.png`} alt="" /> This month
                </span>
            </div>

            {/* Content Row */}
            <div className="grid sm:grid-cols-7">
                {/* Left */}
                <div className="col-span-2 flex flex-col text-start">
                    <div>
                        <p className="text-3xl font-bold text-[#2B3674]">
                            ${(currentMonthDeposit / 1000).toFixed(1) + "K"}
                        </p>
                        <p className="flex gap-1 text-[13px] text-gray-500 mt-1">
                            Wallet Balance
                            <span className="flex items-center text-[#05CD99] text-sm font-semibold">
                                <span className="pr-0.5">
                                    <img src={`${import.meta.env.BASE_URL}icons/upperVector.png`} alt="" />
                                </span>+2.45%
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-[#05CD99] font-medium my-4">
                        <span className="w-4 h-4 bg-[#05CD99] rounded-full flex items-center justify-center">
                            <img src={`${import.meta.env.BASE_URL}icons/trueVector.png`} alt="" className="w-2 h-2 text-white" />
                        </span>
                        On your account
                    </div>

                    <div className="flex flex-col gap-2 text-sm mt-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-[#4318FF] rounded-full"></span>
                            Deposits
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-[#6AD2FF] rounded-full"></span>
                            Withdrawals
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="col-span-5 h-48 flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} className="[&_*]:outline-none">
                            {/* Show months only at the bottom */}
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={({ x, y, payload, index }) => {
                                    // Shift first and last month labels inward
                                    const offset = index === 0 ? 20 : index === data.length - 1 ? -20 : 0;
                                    return (
                                        <text
                                            x={x + offset}
                                            y={y + 15}
                                            textAnchor="middle"
                                            fill="#A3AED0"
                                            fontSize={12}
                                        >
                                            {payload.value}
                                        </text>
                                    );
                                }}
                            />

                            {/* Hide Y axis completely */}
                            <YAxis
                                hide
                                domain={[0, Math.max(...data.map(d => Math.max(d.deposits, d.withdrawals))) * 1.8]}
                            />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="deposits"
                                stroke="#4318FF"
                                strokeWidth={3}
                                dot={(props) => {
                                    const { cx, cy, payload } = props;

                                    if (payload.month === allMonths[currentMonthIndex]) {
                                        const text = `$${payload.deposits.toFixed(2)}`;
                                        const paddingX = 8;
                                        const paddingY = 6;
                                        const fontSize = 6;
                                        const pointerSize = 6;

                                        const textWidth = text.length * (fontSize * 0.6);
                                        const extraWidth = 10;  // increase rectangle width
                                        const extraHeight = 6;  // increase rectangle height
                                        const rectWidth = textWidth + paddingX * 2 + extraWidth;
                                        const rectHeight = fontSize + paddingY * 2 + extraHeight;

                                        return (
                                            <>
                                                {/* Ring around the dot */}
                                                <circle
                                                    cx={cx}
                                                    cy={cy}
                                                    r={5}
                                                    className="stroke-blue-800 fill-none stroke-[3]"
                                                />

                                                {/* Tooltip rectangle */}
                                                <rect
                                                    x={cx - rectWidth / 2}
                                                    y={cy - rectHeight - pointerSize - 11}
                                                    width={rectWidth}
                                                    height={28}
                                                    rx={4}
                                                    ry={4}
                                                    className="fill-[#4318FF]"
                                                />

                                                {/* Triangle pointer */}
                                                <polygon
                                                    points={`
                                                        ${cx - pointerSize},${cy - 10 - pointerSize}
                                                        ${cx + pointerSize},${cy - 10 - pointerSize}
                                                        ${cx},${cy - 10}
                                                    `}
                                                    className="fill-[#4318FF]"
                                                />

                                                {/* Text */}
                                                <text
                                                    x={cx}
                                                    y={cy - rectHeight / 2 - pointerSize - 15 + paddingY / 2}
                                                    textAnchor="middle"
                                                    alignmentBaseline="middle"
                                                    className="fill-white text-white font-bold text-[12px]"
                                                >
                                                    {text}
                                                </text>
                                            </>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="withdrawals"
                                stroke="#6AD2FF"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}
