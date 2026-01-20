"use client";

import FirstPlace from "../../../public/price/1st-place.png"
import SecondPlace from "../../../public/price/2nd-place.png"
import ThirdPlace from "../../../public/price/3rd-place.png"
import Image from "next/image";
import { championshipData } from "../../database/championsData.js"
import { useSearchParams } from "next/navigation";

const ZoneTable = () => {
    const serachParams = useSearchParams();
    const teamCode = serachParams.get("team");
    const selectedTeam = championshipData.teams.find((team) => team.teamCode === teamCode);
    const zoneData = selectedTeam?.zones?.sort((a, b) => b.cumulativeRank - a.cumulativeRank);
    return (
        <div

            className="relative overflow-y-auto max-h-[400px] border border-gray-300"
        >
            <table className="min-w-full text-[12px] border-collapse w-full">
                <thead className="bg-[--primary-color] text-white sticky top-0">
                    <tr className="text-center">
                        <th className="px-1.5 py-2 font-semibold w-12">No.</th>
                        <th className="px-1.5 py-2 font-semibold w-16">Zone</th>
                        <th className="px-1.5 py-2 font-semibold">Rank Ach%</th>
                        <th className="px-1.5 py-2 font-semibold">Rank Over Avg Gr.%</th>
                        <th className="px-1.5 py-2 font-semibold">Cumulative Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        zoneData?.map((champion, index) => {
                            //top 3 row height light color
                            // let bgColor = "";
                            // if (index === 0) bgColor = "bg-yellow-100";
                            // else if (index === 1) bgColor = "bg-gray-100";
                            // else if (index === 2) bgColor = "bg-orange-100";

                            //top 3 toppy
                            const getPosition = () => {
                                if (index === 0) {
                                    return <Image src={FirstPlace} alt="1st Place" width={20} height={20} />;
                                } else if (index === 1) {
                                    return <Image src={SecondPlace} alt="2nd Place" width={20} height={20} />;
                                } else if (index === 2) {
                                    return <Image src={ThirdPlace} alt="3rd Place" width={20} height={20} />;
                                } else {
                                    return index + 1
                                }
                            }

                            return (
                                <tr key={index} className={`border text-center  hover:bg-gray-100 transition`}>
                                    <td className="px-3 py-2 border">
                                        <div className="min-h-[100%]">{getPosition()}</div>
                                    </td>
                                    <td className="px-2 py-2 border">{champion?.zoneName}</td>
                                    <td className="px-4 py-2 border">{champion?.achievementPercent}</td>
                                    <td className="px-4 py-2 border">{champion?.growthPercent}</td>
                                    <td className="px-4 py-2 border">{champion?.cumulativeRank}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ZoneTable