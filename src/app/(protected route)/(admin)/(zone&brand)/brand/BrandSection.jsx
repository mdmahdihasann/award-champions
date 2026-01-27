"use client"
import BrandButton from '@/components/brand/BrandButton'
import { useEffect, useState } from 'react'
import { brandData } from '@/database/brandData.js'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/common/PaginationSection'
import axios from 'axios'
import { UseAuth } from '@/hooks/UseAuth'

const BrandSection = () => {
    const { selectedTeam, loading, setLoading } = UseAuth();
    const [brandDatas, setBrandDatas] = useState(null);
    const [activeBrand, setActiveBrand] = useState(null);

    const [page, setPage] = useState(1);
    const perPage = 10;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const SelectBrandData = brandDatas?.data?.month?.[activeBrand];
    const paginatedData = SelectBrandData?.slice(startIndex, endIndex) || [];


    useEffect(() => {
        if (activeBrand) {
            setPage(1)
        }

    }, [])
    useEffect(() => {
        const brandData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reports/territory-performance`,
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
                    setBrandDatas(res.data)
                }
            } catch (error) {
                console.log(error);

            }

        }
        brandData();
    }, [])

    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <BrandButton setActiveBrand={setActiveBrand} activeBrand={activeBrand} brandDatas={brandDatas} />
                </div>
            </section>

            <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4'>
                <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                    <h2 className="text-2xl font-semibold text-gray-800">{activeBrand}</h2>

                    <div>
                        <div className="bg-white rounded-xl border overflow-auto mb-3">
                            <BrandTable SelectBrandData={paginatedData} page={page} perPage={perPage} />
                        </div>
                        <Pagination
                            current={page}
                            total={SelectBrandData?.length || 0}
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