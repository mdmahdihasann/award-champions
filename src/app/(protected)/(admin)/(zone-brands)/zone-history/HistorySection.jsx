"use client"

import Pagination from "@/components/ui/Pagination";
import Table from '@/components/zone/Table';
import { useAuth } from "@/hooks/useAuth";
import { Select } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";

const MAX_COUNT = 2;
const HistorySection = () => {
    const { selectedTeam } = useAuth();
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const history = historyData?.data?.zone_perfomance?.slice(startIndex, endIndex);
    

    const handleChange = value => {
        console.log(`selected ${value}`);
    };


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
                            year: null,
                            quarter: null,
                        }
                    }
                )
                if (status === 200) {
                    setHistoryData(data)
                }

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        fetchHistoryData()
    }, [selectedTeam, page, perPage])

    return (
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{historyData?.data?.selected_year} <span className='text-sm font-medium text-red-400'>({historyData?.data?.selected_quarter})</span></h2>
                <Select
                    mode="multiple"
                    maxCount={MAX_COUNT}
                    style={{ width: 130 }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={[
                        {
                            label: <span>Year</span>,
                            title: 'year',
                            options: [
                                { label: <span>2025</span>, value: '2025' },
                                { label: <span>2026</span>, value: '2026' },
                            ],
                        },
                        {
                            label: <span>Quater</span>,
                            title: 'quater',
                            options: [
                                { label: <span>Q1</span>, value: 'q1' },
                                { label: <span>Q2</span>, value: 'q2' },
                                { label: <span>Q3</span>, value: 'q3' },
                                { label: <span>Q4</span>, value: 'q4' },
                            ],
                        },
                    ]}
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
                total={historyData?.data?.zone_perfomance?.length || 0}
                pageSize={perPage}
                onChange={(p) => setPage(p)}
                onPageSizeChange={setPerPage}
            />
        </div>

    )
}

export default HistorySection