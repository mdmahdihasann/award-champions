"use client";

import { AiOutlineArrowUp } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import FirstPlace from "../../../../public/price/gold-medal.png"
import SecondPlace from "../../../../public/price/2nd-place.png"
import ThirdPlace  from "../../../../public/price/3rd-place.png"
import Image from "next/image";

const leaders = [
  {
    id: "0305943",
    achievement: "Top Performer",
    growth: "12%",
    community: "Alpha Community",
  },
  {
    id: "0305921",
    achievement: "High Achiever",
    growth: "8%",
    community: "Beta Community",
  },
  {
    id: "0305987",
    achievement: "Consistent Performer",
    growth: "5%",
    community: "Gamma Community",
  },
  {
    id: "0305905",
    achievement: "Rising Star",
    growth: "3%",
    community: "Delta Community",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen max-w-screen-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Leaderboard</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Achievement</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Growth</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Community</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {leaders.map((leader, index) => {
              // Top 3 row highlight colors
              let bgColor = "";
              if (index === 0) bgColor = "bg-yellow-100";
              else if (index === 1) bgColor = "bg-gray-200";
              else if (index === 2) bgColor = "bg-orange-100";

              // Top 3 trophy icons
              const getPosition = () => {
                if (index === 0)
                  return <Image src={FirstPlace} className="absulate top-0" alt="1st Place" width={300} height={300} />;
                else if (index === 1)
                  return <Image src={SecondPlace} className="absulate top-0" alt="2nd Place" width={300} height={300} />;
                else if (index === 2)
                  return <Image src={ThirdPlace} className="absulate top-0" alt="3rd Place" width={300} height={300} />;
                else return index + 1;
              };


              return (
                <tr key={leader.id} className={`${bgColor} hover:bg-gray-50 transition`}>
                  {/* Position / Index Number / Trophy */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative text-gray-900">
                    {getPosition()}
                  </td>

                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center gap-2">
                    <FaUserAlt className="text-gray-500" /> {leader.id}
                  </td>

                  {/* Achievement */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {leader.achievement}
                  </td>

                  {/* Growth */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center gap-1">
                    <AiOutlineArrowUp className="text-green-500" />
                    {leader.growth}
                  </td>

                  {/* Community */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {leader.community}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
