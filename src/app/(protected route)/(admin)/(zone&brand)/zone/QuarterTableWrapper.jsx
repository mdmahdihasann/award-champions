"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { UseAuth } from "@/hooks/UseAuth";
import ZoneTable from "@/app/(protected route)/(admin)/(zone&brand)/zone/ZoneTable";
import Pagination from "@/components/common/PaginationSection";
import { ContentLoading } from "@/components/Loading";

const QuaterTableWrapper = () => {
  const { selectedTeam } = UseAuth();

  const [zoneData, setZoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(zoneData?.data?.page);    
  const perPage = zoneData?.data?.per_page;  

  // Fetch API 
  useEffect(() => {
    if (!selectedTeam) return;

    const fetchPerformanceData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reports/performance?work_area_t=${selectedTeam?.data?.work_area_t}&designation_id=${selectedTeam?.data?.designation_id}&gm_code=${selectedTeam?.data?.gm_code}&page=${page || 1}&per_page=${perPage || 10}`
        );

        if (res.status === 200) {          
          setZoneData(res.data);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [selectedTeam, page]);

  // Loading skeleton
  if (loading) return <ContentLoading />;

  return (
    <div className="flex flex-col">
      {/* Table */}
      <div className="bg-white rounded-xl border overflow-auto">
        <ZoneTable zoneData={zoneData?.quarter} />
      </div>

      {/* Pagination */}
      <Pagination
        current={zoneData?.page || 1}
        total={zoneData?.total_items || 0}
        pageSize={zoneData?.per_page || perPage}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default QuaterTableWrapper;
