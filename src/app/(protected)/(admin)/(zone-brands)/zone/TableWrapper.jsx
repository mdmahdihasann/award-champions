"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Table from "@/app/(protected)/(admin)/(zone-brands)/zone/Table";
import Pagination from "@/components/ui/Pagination";
import { Space, Switch } from 'antd';

const MonthTableWrapper = () => {
  const { selectedTeam } = useAuth();
  const [isCheck, setIsCheck] = useState(false);

  const [zoneData, setZoneData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Quarter pagination
  const [Page, setPage] = useState(1);
  const quarterPerPage = isCheck === true ? zoneData?.per_page : zoneData?.per_page_m || 10;

  const tableData = isCheck === true ? zoneData?.quarter : zoneData?.month;


  // Reset when team changes
  useEffect(() => {
    if (selectedTeam) {
      setPage(1);
      setIsCheck(false)
    }
  }, [selectedTeam]);

  // Reset when month and current changes
  useEffect(()=>{
    if(isCheck){
      setPage(1)
    }
  },[isCheck])

  // Fetch data
  useEffect(() => {
    if (!selectedTeam) return;

    const fetchPerformanceData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reports/performance`,
          {
            params: {
              work_area_t: selectedTeam?.data?.work_area_t,
              designation_id: selectedTeam?.data?.designation_id,
              gm_code: selectedTeam?.data?.gm_code,

              page: Page,
              per_page: quarterPerPage,

              page_m: Page,
              per_page_m: quarterPerPage,
            },
          }
        );

        setZoneData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [selectedTeam, Page, quarterPerPage]);



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
            zoneData={tableData}
            page={Page}
            perPage={quarterPerPage}
            loading={loading}
          />
        </div>

        <Pagination
          current={Page || 0}
          total={zoneData?.total_items || 0}
          pageSize={quarterPerPage}
          onChange={setPage}
        />
      </div>
    </>
  );
};

export default MonthTableWrapper;
