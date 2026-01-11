"use client"
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";


const ZoneCard = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm flex items-center justify-between transition transform text-white`}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div
              className={`text-2xl opacity-90 mb-2 ${iconColor} ${bgColor} w-[44px] h-[44px] rounded-full p-[10px]`}
            >
              {icon}
            </div>
            <h3 className="text-lg text-gray-500 font-normal capitalize tracking-wide opacity-80">
              {title}
            </h3>
            <p className="text-3xl text-black font-semibold mt-1">{value}</p>
          </div>
          <div className="text-2xl opacity-90 mb-2 text-gray-800 w-[44px] h-[44px] bg-gray-200 rounded-full p-[10px] hover:bg-gray-300 transition">
            <FiArrowUpRight />
          </div>
        </div>
        <div
          className={` bg-[#e3e6fe] w-full p-2 rounded mt-4 text-center flex items-center justify-center `}
        >
          <span className="text-[16px] mr-4 text-black">13k Last Week</span>{" "}
          <span
            className={`flex gap-2 items-center ${
              changeType === "up" ? "text-red-700" : "text-blue-500"
            }`}
          >
            {changeType === "up" ? <FaArrowTrendUp /> : <FaArrowTrendDown />}{" "}
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ZoneCard;