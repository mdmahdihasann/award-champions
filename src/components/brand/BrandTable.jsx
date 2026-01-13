"use client";

import FirstPlace from "../../../public/price/1st-place.png"
import SecondPlace from "../../../public/price/2nd-place.png"
import ThirdPlace from "../../../public/price/3rd-place.png"
import Image from "next/image";
import { championshipData } from "../../database/championsData.js"
import { useSearchParams } from "next/navigation";

const BrandTable = ({ SelectBrandData }) => {
    const serachParams = useSearchParams();
    const teamCode = serachParams.get("team");
    const selectedTeam = championshipData.teams.find((team) => team.teamCode === teamCode);
    return (
        <table className="min-w-full text-sm font-medium border-collapse">
            <thead className="bg-[--primary-color] text-white">
                <tr className="border text-center">
                    <th className="px-1.5 py-2 border-x w-28">Territory</th>
                    <th className="px-1.5 py-2 border-x">Rank Ach%</th>
                    <th className="px-1.5 py-2 border-x">Rank of Value</th>
                    <th className="px-1.5 py-2 border-x">Cumulative Rank</th>
                </tr>
            </thead>
            <tbody>
                {
                    SelectBrandData?.tableData?.map((branData, index) => {
                        //top 3 row height light color
                        let bgColor = "";
                        if (index === 0) bgColor = "bg-yellow-100";
                        else if (index === 1) bgColor = "bg-gray-100";
                        else if (index === 2) bgColor = "bg-orange-100";

                        //top 3 toppy
                        const getPosition = () => {
                            if (index === 0) {
                                return <Image src={FirstPlace} alt="1st Place" width={20} height={20} />;
                            } else if (index === 1) {
                                return <Image src={SecondPlace} alt="2nd Place" width={20} height={20} />;
                            } else if (index === 2) {
                                return <Image src={ThirdPlace} alt="3rd Place" width={20} height={20} />;
                            }
                        }

                        return (
                            <tr key={index} className={`border text-center ${bgColor} hover:bg-gray-100 transition`}>

                                <td className="px-1 py-2 border">
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="min-h-[100%]">{getPosition()}</div>
                                        <span>{branData?.territory}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border">{branData?.rankAchievement}</td>
                                <td className="px-4 py-2 border">{branData?.rankOverAvgGrowth}</td>
                                <td className="px-4 py-2 border">{branData?.cumulativeRank}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}

export default BrandTable