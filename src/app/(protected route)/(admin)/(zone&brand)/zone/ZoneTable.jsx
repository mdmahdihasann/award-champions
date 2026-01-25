"use client";

import FirstPlace from "../../../../../../public/price/1st-place.png"
import SecondPlace from "../../../../../../public/price/2nd-place.png"
import ThirdPlace from "../../../../../../public/price/3rd-place.png"
import Image from "next/image";


const ZoneTable = ({ zoneData }) => {

    return (
        <div

            className="relative overflow-y-auto max-h-[456px] border border-gray-300"
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
                        zoneData?.quarter?.map((champion, index) => {

                            //top 3 toppy
                            const serialNumber = ((zoneData?.page || 1) - 1) * (zoneData?.per_page || 10) + index + 1;

                            // Top 3 images
                            const getPosition = () => {
                                if (serialNumber === 1) return <Image src={FirstPlace} alt="1st Place" width={20} height={20} />;
                                if (serialNumber === 2) return <Image src={SecondPlace} alt="2nd Place" width={20} height={20} />;
                                if (serialNumber === 3) return <Image src={ThirdPlace} alt="3rd Place" width={20} height={20} />;
                                return serialNumber;
                            };


                            return (
                                <tr key={index} className={`border text-center  hover:bg-gray-100 transition`}>
                                    <td className="px-3 py-2 border">
                                        <div className="min-h-[100%]">{getPosition()}</div>
                                    </td>
                                    <td className="px-2 py-2 border">{champion?.zone}</td>
                                    <td className="px-4 py-2 border">{champion?.ach_rank}</td>
                                    <td className="px-4 py-2 border">{champion?.growth_rank}</td>
                                    <td className="px-4 py-2 border">{champion?.cum_rank}</td>
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