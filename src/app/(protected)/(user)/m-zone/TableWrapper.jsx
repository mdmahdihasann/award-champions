"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Table from "@/components/zone/Table";
import Pagination from "@/components/ui/Pagination";
import { Space, Switch } from 'antd';

const TableWrapper = () => {
  const { auth } = useAuth();
  const [isCheck, setIsCheck] = useState(false);

  const [zoneData, setZoneData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  // Quarter pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const zoneTableData = isCheck === true ? zoneData?.month : zoneData?.quarter;
  const selectedZoneData = zoneTableData?.slice(startIndex, endIndex) || [];

  // Reset when month and current changes
  useEffect(() => {
    if (isCheck) {
      setPage(1)
      setPerPage(10)
    } else {
      setPage(1)
      setPerPage(10)
    }
  }, [isCheck])


  // Fetch data
  useEffect(() => {
    if (!auth) return null;

    const fetchPerformanceData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reports/performance`,
          {
            params: {
              work_area_t: auth?.data?.work_area_t,
              designation_id: auth?.data?.designation_id,
              gm_code: auth?.data?.gm_code,
              team: auth?.data?.group_name
            },
          }
        );
        setZoneData(data);
      } catch (err) {
        setError("Data Not Found")
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [page, perPage]);


  if (error) return <div className="p-4 text-center text-red-400">Failed to load data</div>;
  return (
    <>
      <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Zone Performance <span className='text-sm font-medium text-red-400'>({isCheck ? "Current Month" : "Quarter"})</span></h2>
          <div>
            <Space vertical>
              <Switch checkedChildren="Quarter" unCheckedChildren="Month" defaultChecked checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
            </Space>
          </div>
        </div>


        <div className="bg-white rounded-xl border overflow-auto">
          <Table
            zoneData={selectedZoneData}
            page={page}
            perPage={perPage}
            loading={loading}
          />
        </div>

        <Pagination
          current={page}
          total={zoneTableData?.length || 0}
          pageSize={perPage}
          onChange={(p) => setPage(p)}
          onPageSizeChange={setPerPage}
        />
      </div>
    </>
  );
};

export default TableWrapper;
