import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <p className="text-gray-400 text-xs">Showing 1 to of 20 Entries</p>
      </div>
      <nav className="inline-flex space-x-2">
        {/* Previous Arrow */}
        <button className="w-6 h-6 px-1.5 text-[11px] rounded-md border border-gray-300 text-gray-500 hover:bg-white hover:text-gray-700 transition">
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}
        <button className="w-6 h-6 text-sm rounded-md bg-[--primary-color] text-white font-medium hover:bg-[--primary-color-hover] transition">
          1
        </button>

        {/* Next Arrow */}
        <button className="w-6 h-6 px-1.5 text-[11px] rounded-md border border-gray-300 text-gray-500 hover:bg-white hover:text-gray-700 transition">
          <FaChevronRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
