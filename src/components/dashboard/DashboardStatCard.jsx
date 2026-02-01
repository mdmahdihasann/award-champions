const DashboardStatCard = ({
  title,
  value,
  icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div
      className={`bg-white p-3 rounded-xl shadow-sm transition transform text-white border border-white hover:border-[--border-color]`}
    >
      <div className="flex justify-between">
        <div>
          <div className={`flex justify-center items-center text-[16px] opacity-90 mb-2 ${iconColor} ${bgColor} w-[36px] h-[36px] rounded-lg p-[8px]`}>
            {icon}
          </div>
          <h3 className="text-sm font-normal text-gray-600 capitalize tracking-wide opacity-80">
            {title}
          </h3>
          <p className="text-2xl text-black font-semibold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;