'use client'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/common/PaginationSection'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useBrandData from '@/hooks/useBrandData'
import { Space, Switch } from 'antd';

const MioBrandPage = () => {
    const { auth } = useAuth();
    const [isCheck, setIsCheck] = useState(false);
    const { brandData, loading, error } = useBrandData();

    const [page, setPage] = useState(1);
    const perPage = 10;
    
    const MioData = isCheck
        ? brandData?.data?.month?.Coralcal?.tableData
        : brandData?.data?.quarter?.Coralcal?.tableData;
    
    // const BrandData = brandData.find((bc) => bc?.brandCode === auth?.brandCode);




    return (
        <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4 mt-2'>
            <div className='mb-4 flex justify-end'>
                <Space vertical>
                    <Switch checkedChildren="Month" unCheckedChildren="Quarter" defaultChecked checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                </Space>
            </div>
            <div className="bg-white rounded-xl border overflow-auto mb-3">
                <BrandTable brandTableData={MioData}  page={page} perPage={perPage} loading={loading} error={error}/>

            </div>
            <Pagination
                current={page}
                pageSize={perPage}
                total={MioData?.length || 0}
                onChange={(p) => setPage(p)}
            />
        </section>
    )
}

export default MioBrandPage