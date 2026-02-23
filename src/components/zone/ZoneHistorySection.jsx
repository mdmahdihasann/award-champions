"use client"

import Button from "@/components/ui/Button";
import HistoryModal from "@/components/ui/HistoryModal";
import Pagination from "@/components/ui/Pagination";
import Table from '@/components/zone/Table';
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";

const ZoneHistorySection = () => {
    const { selectedTeam, auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState(null);

    const sourceData = selectedTeam ? selectedTeam : auth;

    const [isOpen, setIsOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [filters, setFilters] = useState({
        year: null,
        quarter: null,
    });
    // console.log("filters", filters);


    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const history = historyData?.data?.zone_performance?.slice(startIndex, endIndex) || [];


    useEffect(() => {
        const fetchHistoryData = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/reports/zone-history`,
                    {
                        params: {
                            gm_code: sourceData?.data?.gm_code,
                            team: sourceData?.data?.group_name,
                            year: filters.year,
                            quarter: filters.quarter,
                        },
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setHistoryData(response.data);
                }
                else if (response.status === 204) {
                    // FRONTEND FALLBACK
                    setHistoryData({
                        data: {
                            selected_year: filters.year,
                            selected_quarter: filters.quarter,
                            zone_performance: [],
                            available_years: historyData?.data?.available_years || [],
                            available_quarters: historyData?.data?.available_quarters || [],
                        }
                    });
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryData();

    }, [selectedTeam, page, perPage, filters]);

    return (
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{historyData?.data?.selected_year} <span className='text-sm font-medium text-red-400'>({historyData?.data?.selected_quarter})</span></h2>

                <Button onClick={() => setIsOpen(true)} className={`flex gap-2 justify-center px-2 bg-[--primary-color] hover:bg-gray-700 w-10 border items-center transition text-white `}><LuSlidersHorizontal className="text-lg" />
                </Button>

                {/* history Modal */}
                <HistoryModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    historyData={historyData?.data}
                    selectedYear={filters.year}
                    selectedQuarter={filters.quarter}
                    onApply={(values) => {
                        setFilters(values)
                    }}
                />

            </div>

            <div className="bg-white rounded-xl border overflow-auto">
                <Table
                    zoneData={history}
                    page={page}
                    perPage={perPage}
                    loading={loading}
                />
                {/* Show message when no data */}
                {!loading && history.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        {historyData?.data?.data ?
                            "No zone performance data available for selected filters" :
                            "No data available"}
                    </div>
                )}
            </div>

            <Pagination
                current={page || 0}
                total={historyData?.data?.zone_performance?.length || 0}
                pageSize={perPage}
                onChange={(p) => setPage(p)}
                onPageSizeChange={setPerPage}
            />
        </div>

    )
}

export default ZoneHistorySection