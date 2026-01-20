"use client";

import { useRef, useEffect, useState } from "react";
import { UseAuth } from "@/hooks/UseAuth";
import FirstPlace from "../../../public/price/1st-place.png";
import SecondPlace from "../../../public/price/2nd-place.png";
import ThirdPlace from "../../../public/price/3rd-place.png";
import Image from "next/image";

const BrandTable = ({ SelectBrandData }) => {
    const { auth } = UseAuth();
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
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

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
                    {SelectBrandData?.map((brandData, index) => {


                        // Madel icon
                        const getPosition = () => {
                            if (index === 0) return <Image src={FirstPlace} alt="1st Place" width={20} height={20} />;
                            if (index === 1) return <Image src={SecondPlace} alt="2nd Place" width={20} height={20} />;
                            if (index === 2) return <Image src={ThirdPlace} alt="3rd Place" width={20} height={20} />;
                            return index + 1;
                        };

                        // Special row for mio
                        if (brandData.territoryId === auth?.data?.work_area_t) {
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
                                <td className="px-4 py-2 border">{brandData?.territoryId}</td>
                                <td className="px-4 py-2 border">{brandData?.rankAchievement}</td>
                                <td className="px-4 py-2 border">{brandData?.rankOverAvgGrowth}</td>
                                <td className="px-4 py-2 border">{brandData?.cumulativeRank}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BrandTable;
