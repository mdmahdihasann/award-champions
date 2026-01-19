"use client"
import DashboardStatCard from "./DashboardStatCard";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";



import { FaAward } from "react-icons/fa6";


export default function Intro() {
    return (
        <div className="p-4 bg-gray-100 border border-[--border-color] rounded-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <DashboardStatCard
                    title="Total Zones"
                    value="40"
                    change={"85.5%"}
                    changeType="up"
                    icon={<FaLocationDot />
                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Brand Champion"
                    value="40"
                    change={"85.5%"}
                    changeType="up"
                    icon={<FaAward />

                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Top MIOs"
                    value="40"
                    change={"85.5%"}
                    changeType="up"
                    icon={<FaUserTie />
                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Total Rewards"
                    value="40"
                    change={"85.5%"}
                    changeType="up"
                    icon={<TbCoinTakaFilled />

                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />

            </div>
        </div>
    )
}