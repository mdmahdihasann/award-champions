"use client"
import DashboardStatCard from "./DashboardStatCard";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";

import { FaAward } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContentLoading } from "../Loading";


export default function Intro() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dashData, setDashData] = useState(null);

    useEffect(() => {
        const fetchDashData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reports/admin-dashboard`);
                if (res.status === 200) {
                    setDashData(res.data);
                }
            } catch (err) {
                console.error(err);
                setError("Data not found");
            } finally {
                setLoading(false);
            }
        };

        fetchDashData();
    }, []);


    if (loading) return <ContentLoading />
    if (error) return <div>Data not found</div>
    return (
        <div className="p-4 bg-gray-100 border border-[--border-color] rounded-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <DashboardStatCard
                    title="Total Zone"
                    value={dashData?.data?.total_zone}
                    icon={<FaLocationDot />
                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Total Team"
                    value={dashData?.data?.total_team}
                    icon={<HiMiniUserGroup />

                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Total Territory"
                    value={dashData?.data?.total_territory}
                    icon={<FaUserTie />
                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />
                <DashboardStatCard
                    title="Total Reward"
                    value={dashData?.data?.total_reward}
                    icon={<FaAward />

                    }
                    iconColor="text-white"
                    bgColor="bg-[--primary-color]"
                />

            </div>
        </div>
    )
}