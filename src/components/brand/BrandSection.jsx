"use client"
import BrandButton from '@/components/brand/BrandButton'
import { useEffect, useState } from 'react'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/ui/Pagination'
import { Space, Switch } from 'antd';
import { ContentLoading } from '@/components/Loading'
import useBrandData from '@/hooks/useBrandData'

const BrandSection = () => {
    const { brandData, loading, error } = useBrandData();
    const [activeBrand, setActiveBrand] = useState(null);

    const [isCheck, setIsCheck] = useState(false);

    const [page, setPage] = useState(1);
    const perPage = 10;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const selectBrandData = isCheck
        ? brandData?.data?.month?.[activeBrand]
        : brandData?.data?.quarter?.[activeBrand];


    const brandTableData = selectBrandData?.tableData?.slice(startIndex, endIndex) || [];

    useEffect(() => {
        if (activeBrand) {
            setPage(1);
            setIsCheck(false)
        }
    }, [activeBrand]);

    useEffect(()=>{
        if(isCheck){
            setPage(1)
        }
    },[isCheck])


    if (loading) return <ContentLoading />
    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <BrandButton setActiveBrand={setActiveBrand} activeBrand={activeBrand} brandData={brandData} />
                </div>
            </section>

            <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4'>
                <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-2xl font-semibold text-gray-800">{activeBrand} <span className='text-sm font-medium text-red-400'>({isCheck ? "Current Month" : "Quarter"})</span></h2>
                        <div>
                            <Space vertical >
                                <Switch checkedChildren="Month" unCheckedChildren="Quarter" defaultChecked checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                            </Space>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-xl border overflow-auto mb-3">
                            <BrandTable brandTableData={brandTableData} page={page} perPage={perPage} loading={loading} error={error} selectBrandData={selectBrandData} />
                            
                        </div>
                        <Pagination
                            current={page}
                            total={selectBrandData?.tableData?.length || 0}
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