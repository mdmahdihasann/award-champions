"use client";

import { useAuth } from "@/hooks/useAuth";
import Medal from "../../../public/price/medal.png";
import Image from "next/image";
import { ContentLoading } from "../Loading";

const BrandTable = ({ brandTableData, page, perPage, loading, error, selectBrandData }) => {
    const { auth } = useAuth();

    // user postion number
    const userData = selectBrandData?.tableData?.find(data => data.territory === auth?.data?.work_area_t);
    const userPosition = selectBrandData?.tableData?.findIndex(data => data.territory === auth?.data?.work_area_t) + 1;
    

    const userTerritory = auth?.data?.work_area_t;
    const isUserInCurrentPage = brandTableData.some((data)=> data.territory === userTerritory)

    if (loading) return <ContentLoading />;
    if (error) return <div className="p-4 text-center text-red-400">Failed to load data</div>;

    return (
        <div
            className="relative overflow-y-auto border border-gray-300"
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
                        const serialNumber = ((page || 1) - 1) * (perPage || 10) + index + 1;

                        const getPosition = () => {
                            if (brandData?.medal) return <Image src={Medal} alt="1st Place" width={20} height={20} />;
                            return serialNumber;
                        };

                        const isUser = brandData?.territory === auth?.data?.work_area_t;

                        return (
                            <tr
                                key={index}
                                className={`text-center border hover:bg-gray-100 transition ${isUser ? 'bg-[#8BA8C4] text-white hover:text-black font-bold' : ''}`}
                            >
                                <td className="px-3 py-2 border">{getPosition()}</td>
                                <td className="px-3 py-2 border">{brandData?.territory}</td>
                                <td className="px-3 py-2 border">{brandData?.ach_rank}</td>
                                <td className="px-3 py-2 border">{brandData?.sales_rank}</td>
                                <td className="px-3 py-2 border">{brandData?.cum_rank}</td>
                            </tr>
                        );
                    })}

                    {/* Logged-in user's position row  */}
                    {userData && !isUserInCurrentPage && (
                        <tr className="text-center border bg-[#8BA8C4] text-white font-bold sticky bottom-[-1] z-10">
                            <td className="px-3 py-2 border">
                                {userData?.medal ? <Image src={Medal} alt="1st Place" width={20} height={20} /> : userPosition}
                            </td>
                            <td className="px-3 py-2 border">{userData?.territory}</td>
                            <td className="px-3 py-2 border">{userData?.ach_rank}</td>
                            <td className="px-3 py-2 border">{userData?.sales_rank}</td>
                            <td className="px-3 py-2 border">{userData?.cum_rank}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BrandTable;
