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
    const { selectedTeam } = useAuth();
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [filters, setFilters] = useState({
        year: null,
        quarter: null,
    });
    

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const history = historyData?.data?.zone_performance?.slice(startIndex, endIndex);
    


    useEffect(() => {
        const fetchHistoryData = async () => {
            setLoading(true)
            try {
                const { data, status } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/reports/zone-history`,
                    {
                        params: {
                            gm_code: selectedTeam?.data?.gm_code,
                            team: selectedTeam?.data?.group_name,
                            year: filters.year,
                            quarter: filters.quarter,
                        }
                    }
                )
                if (status === 200 && data?.data?.zone_performance?.length > 0) {
                    setHistoryData(data)
                }else if(status === 204){
                    setHistoryData(data)
                }

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        fetchHistoryData()
    }, [selectedTeam, page, perPage, filters])

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
                    onApply={(values)=>{
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