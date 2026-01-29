"use client";
import { Pagination } from "antd";

const PaginationPage = ({ current, total, pageSize, onChange }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">
        Total {total} items
      </span>

      <Pagination
        size="small"
        current={current || 1}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationPage;
