"use client"

import BrandButton from "@/components/brand/BrandButton";
import BrandHistoryTable from "@/components/brand/BrandHistoryTable";
import Button from "@/components/ui/Button";
import HistoryModal from "@/components/ui/HistoryModal";
import Pagination from "@/components/ui/Pagination";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import BackButton from "../ui/BackButton";
import { usePathname } from "next/navigation";

const BrandHistorySection = () => {
    const pathname = usePathname();
    const { selectedTeam, auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [historyData, setHistoryData] = useState(null);

    const sourceData = selectedTeam ? selectedTeam : auth;

    const [activeBrand, setActiveBrand] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [filters, setFilters] = useState({
        year: null,
        quarter: null,
    });

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const historySelectedBrand = historyData?.data?.data?.[activeBrand];

    const historyTableData = historySelectedBrand?.tableData?.slice(startIndex, endIndex) || [];

    const hasBrands =
        historyData?.data?.data &&
        Object.keys(historyData.data.data).length > 0;

    useEffect(() => {
        const fetchHistoryData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/reports/territory-history`,
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
                    setHistoryData({
                        data: {
                            selected_year: filters.year,
                            selected_quarter: filters.quarter,
                            data: {},
                            available_years: historyData?.data?.available_years || [],
                            available_quarters: historyData?.data?.available_quarters || [],
                        }
                    });
                }

            } catch (error) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryData();

    }, [selectedTeam, filters]);

    return (
        <>
            {/* Back Button */}
            {pathname !== "/m-brand-history" &&
                auth?.work_area_t !== "admin" && (
                    <div className="mb-5 mt-2">
                        <BackButton />
                    </div>
                )}

            {/* Brand Buttons */}
            {hasBrands && (
                <div className="grid grid-cols-4 gap-2">
                    <BrandButton
                        setActiveBrand={setActiveBrand}
                        activeBrand={activeBrand}
                        brandData={historyData}
                    />
                </div>
            )}


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
                    <BrandHistoryTable historyTableData={historyTableData} page={page} perPage={perPage} loading={loading} error={error} historySelectedBrand={historySelectedBrand} />

                    {/* Show message when no data */}
                    {!loading && historyTableData.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            {historyTableData?.data?.data ?
                                "No zone performance data available for selected filters" :
                                "No data available"}
                        </div>
                    )}
                </div>

                <Pagination
                    current={page || 0}
                    total={historySelectedBrand?.tableData?.length || 0}
                    pageSize={perPage}
                    onChange={(p) => setPage(p)}
                    onPageSizeChange={setPerPage}
                />
            </div>
        </>

    )
}

export default BrandHistorySection