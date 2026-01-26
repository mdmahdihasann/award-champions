"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UseAuth } from "@/hooks/UseAuth";
import Table from "@/app/(protected route)/(admin)/(zone&brand)/zone/Table";
import Pagination from "@/components/common/PaginationSection";

const MonthTableWrapper = () => {
  const { selectedTeam } = UseAuth();

  const [zoneData, setZoneData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = zoneData?.data?.per_page || 10;

  // Reset page when zoneData selectedTeam
  useEffect(() => {
    if (selectedTeam) {
      setPage(1);
      setZoneData(null);
    }
  }, [selectedTeam]);

  // Fetch Performance Data
  useEffect(() => {
    if (!selectedTeam) return;

    const fetchPerformanceData = async () => {
      setLoading(true);
      try {
        const { data, status } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reports/performance`,
          {
            params: {
              work_area_t: selectedTeam?.data?.work_area_t,
              designation_id: selectedTeam?.data?.designation_id,
              gm_code: selectedTeam?.data?.gm_code,
              page,
              per_page: perPage,
            },
          }
        );

        if (status === 200) {
          console.log(data);
          
          setZoneData(data);
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [selectedTeam, page, perPage]);

  //Table + Pagination section
  const renderTableSection = (title, data) => (


    <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
      
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex flex-col">
        {/* Table */}
        <div className="bg-white rounded-xl border overflow-auto">
          <Table zoneData={data} page={zoneData?.page} perPage={zoneData?.per_page} loading={loading} />
        </div>

        {/* Pagination */}
        <Pagination
          current={zoneData?.page || 0}
          total={zoneData?.total_items || 0}
          pageSize={zoneData?.per_page || 10}
          onChange={setPage}
        />
      </div>
    </div>
  );

  return (
    <>
      {renderTableSection("Zone Performance (Quarter)", zoneData?.quarter)}
      {renderTableSection("Zone Performance (Current Month)", zoneData?.month)}
    </>
  );
};

export default MonthTableWrapper;
