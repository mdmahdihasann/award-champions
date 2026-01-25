import { Pagination } from "antd";

const showTotal = (total) => `Total ${total} items`;

const PaginationSection = () => {
  return (
    <div className="flex justify-between items-center w-full mt-4">
      <div className="text-gray-700 text-sm">
        {showTotal(30)}
      </div>

      <Pagination
        size="small"
        total={30}
        className="pagination-custom"
      />
    </div>
  );
};

export default PaginationSection;
