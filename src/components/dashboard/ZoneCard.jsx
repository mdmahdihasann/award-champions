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
      className={`bg-white p-4 rounded-xl shadow-sm flex items-center justify-between transition transform text-white border border-white hover:border-[--border-color]`}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div
              className={`text-[20px] opacity-90 mb-2 ${iconColor} ${bgColor} w-[40px] h-[40px] rounded-lg p-[10px]`}
            >
              {icon}
            </div>
            <h3 className="text-sm text-gray-600 font-normal capitalize tracking-wide opacity-80">
              {title}
            </h3>
            <p className="text-2xl text-black font-semibold mt-1">{value}</p>
          </div>
        </div>
        <div
          className={` bg-[#e3e6fe] w-full p-1 rounded mt-2 flex justify-between`}
        >
          <span className="text-[12px] text-black">13k Last Week</span>{" "}
          <span
            className={`flex gap-2 text-[12px] items-center ${
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