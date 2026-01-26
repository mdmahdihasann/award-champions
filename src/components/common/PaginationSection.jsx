"use client";
import { Pagination } from "antd";

const PaginationSection = ({ current, total, pageSize, onChange }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">
        Total {total} items
      </span>

      <Pagination
        size="small"
        current={current || 0}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationSection;
