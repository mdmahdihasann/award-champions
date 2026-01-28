"use client"
import BrandButton from '@/components/brand/BrandButton'
import { useEffect, useState } from 'react'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/common/PaginationSection'
import { Space, Switch } from 'antd';
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { ContentLoading } from '@/components/Loading'

const BrandSection = () => {
    const { selectedTeam } = useAuth();
    const [brandDatas, setBrandDatas] = useState(null);
    const [activeBrand, setActiveBrand] = useState(null);
    
    const [isCheck, setIsCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const perPage = 10;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const SelectBrandData = isCheck
        ? brandDatas?.data?.month?.[activeBrand]
        : brandDatas?.data?.quarter?.[activeBrand];


    const brandTableData = SelectBrandData?.tableData?.slice(startIndex, endIndex) || [];

    useEffect(() => {
        if (activeBrand) {
            setPage(1);
            setIsCheck(false)
        }
    }, [activeBrand]);

    useEffect(() => {
        if (!selectedTeam) return;

        const brandData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/reports/territory-performance`,
                    {
                        params: {
                            work_area_t: selectedTeam?.data?.work_area_t,
                            designation_id: selectedTeam?.data?.designation_id,
                            gm_code: selectedTeam?.data?.gm_code,
                            team: selectedTeam?.data?.group_name,
                        }
                    }
                );

                if (res.status === 200) {
                    setBrandDatas(res.data);
                }
            } catch (err) {
                setError(err.message);
                console.log(err);
                
            } finally {
                setLoading(false);
            }
        };

        brandData();
    }, [selectedTeam]);

if(loading) return <ContentLoading/>
    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <BrandButton setActiveBrand={setActiveBrand} activeBrand={activeBrand} brandDatas={brandDatas} />
                </div>
            </section>

            <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4'>
                <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                        <div className='flex items-center justify-between'>
                            <h2 className="text-2xl font-semibold text-gray-800">{activeBrand} <span className='text-sm font-medium text-red-400'>({isCheck ? "Current Month" : "Quarter"})</span></h2>
                            <div>
                                <Space vertical>
                                    <Switch checkedChildren="Month" unCheckedChildren="Quarter" defaultChecked checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                                </Space>
                            </div>
                        </div>

                    <div>
                        <div className="bg-white rounded-xl border overflow-auto mb-3">
                            <BrandTable brandTableData={brandTableData} page={page} perPage={perPage} loading={loading} error={error}/>

                        </div>
                        <Pagination
                            current={page}
                            total={SelectBrandData?.tableData?.length || 0}
                            pageSize={perPage}
                            onChange={(p) => setPage(p)}
                        />

                    </div>

                </div>
            </section>
        </>
    )
}

export default BrandSection