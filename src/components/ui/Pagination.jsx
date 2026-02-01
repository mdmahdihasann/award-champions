"use client";
import { Pagination } from "antd";

const PaginationPage = ({
  current,
  total,
  pageSize,
  onChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-600">
        Total {total}
      </span>
      <Pagination
        size="small"
        current={current || 1}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
        pageSizeOptions={["10", "20", "50", "100"]}
      />
    </div>
  );
};

export default PaginationPage;
