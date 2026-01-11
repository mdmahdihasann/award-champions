"use client"
import ZoneCard from "./ZoneCard";
import { AiOutlineDollar } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
export default function Intro() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ZoneCard
                    title="Total Sales"
                    value="40"
                    change={"85.5%"}
                    changeType="up"
                    icon={<AiOutlineDollar />}
                    iconColor="text-white"
                    bgColor="bg-yellow-500"
                />
                
            </div>
        </div>
    )
}