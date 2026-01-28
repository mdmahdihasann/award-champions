"use client";

import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import FirstPlace from "../../../public/price/medal.png";
import Image from "next/image";
import { ContentLoading } from "../Loading";

const BrandTable = ({ brandTableData, page, perPage, loading, error }) => {
    const { auth } = useAuth();
    const containerRef = useRef(null);
    const rowRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !rowRef.current) return;

            const container = containerRef.current;
            const row = rowRef.current;

            const containerRect = container.getBoundingClientRect();
            const rowRect = row.getBoundingClientRect();

            if (rowRect.bottom > containerRect.bottom) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        const container = containerRef.current;
        container?.addEventListener("scroll", handleScroll);

        return () => container?.removeEventListener("scroll", handleScroll);
    }, []);

    if(loading) return <ContentLoading/>
    if(error) return <div className="p-4 text-center text-red-400">Failed to load data</div>
    return (
        <div
            ref={containerRef}
            className="relative  overflow-y-auto max-h-[400px] border border-gray-300"
        >
            <table className="min-w-full text-[12px] border-collapse w-full">
                <thead className="bg-[--primary-color] text-white sticky top-0">
                    <tr className="text-center">
                        <th className="px-1.5 py-3 font-semibold w-12">No.</th>
                        <th className="px-1.5 py-3 font-semibold w-16">Territory</th>
                        <th className="px-1.5 py-3 font-semibold">Rank Ach%</th>
                        <th className="px-1.5 py-3 font-semibold">Rank of Value</th>
                        <th className="px-1.5 py-3 font-semibold">Cumulative Rank</th>
                    </tr>
                </thead>

                <tbody>
                    {brandTableData?.map((brandData, index) => {

                        // siriyal number
                        const serialNumber = ((page || 1) - 1) * (perPage || 10) + index + 1;

                        // Madel icon
                        const getPosition = () => {
                            if (brandData?.medal === true) return <Image src={FirstPlace} alt="1st Place" width={20} height={20} />;
                            return serialNumber;
                        };

                        // Special row for mio
                        if (brandData.territory === auth?.data?.work_area_t) {
                            return (
                                <tr
                                    key={index}
                                    ref={rowRef}
                                    className={`border text-center bg-green-200 font-bold ${isSticky ? "sticky bottom-0 z-40" : ""
                                        }`}
                                >
                                    <td className="px-3 py-2 border">{getPosition()}</td>
                                    <td className="px-4 py-2 border">{brandData?.territoryId}</td>
                                    <td className="px-4 py-2 border">{brandData?.rankAchievement}</td>
                                    <td className="px-4 py-2 border">{brandData?.rankOverAvgGrowth}</td>
                                    <td className="px-4 py-2 border">{brandData?.cumulativeRank}</td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index} className={`border text-center hover:bg-gray-100 transition`}>
                                <td className="px-3 py-2 border">{getPosition()}</td>
                                <td className="px-4 py-2 border">{brandData?.territory}</td>
                                <td className="px-4 py-2 border">{brandData?.ach_rank}</td>
                                <td className="px-4 py-2 border">{brandData?.sales_rank}</td>
                                <td className="px-4 py-2 border">{brandData?.cum_rank}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BrandTable;
