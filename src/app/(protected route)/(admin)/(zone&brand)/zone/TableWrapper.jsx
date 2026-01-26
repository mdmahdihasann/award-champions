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

  // Quarter pagination
  const [quarterPage, setQuarterPage] = useState(1);
  const quarterPerPage = zoneData?.per_page || 10;

  // Month pagination
  const [monthPage, setMonthPage] = useState(1);
  const monthPerPage = zoneData?.per_page_m || 10;

  // Reset when team changes
  useEffect(() => {
    if (selectedTeam) {
      setQuarterPage(1);
      setMonthPage(1);
      setZoneData(null);
    }
  }, [selectedTeam]);

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

              page: quarterPage,
              per_page: quarterPerPage,

              page_m: monthPage,
              per_page_m: monthPerPage,
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
  }, [selectedTeam, quarterPage, monthPage]);

  // reusable section
  const renderTableSection = ({
    title,
    rows,
    page,
    setPage,
    perPage,
    total,
  }) => (
    <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <div className="bg-white rounded-xl border overflow-auto">
        <Table
          zoneData={rows}
          page={page}
          perPage={perPage}
          loading={loading}
        />
      </div>

      <Pagination
        current={page}
        total={total}
        pageSize={perPage}
        onChange={setPage}
      />
    </div>
  );

  return (
    <>
      {renderTableSection({
        title: "Zone Performance (Quarter)",
        rows: zoneData?.quarter,
        page: quarterPage,
        setPage: setQuarterPage,
        perPage: quarterPerPage,
        total: zoneData?.total_items || 0,
      })}

      {renderTableSection({
        title: "Zone Performance (Current Month)",
        rows: zoneData?.month,
        page: monthPage,
        setPage: setMonthPage,
        perPage: monthPerPage,
        total: zoneData?.total_items_m || 0,
      })}
    </>
  );
};

export default MonthTableWrapper;
