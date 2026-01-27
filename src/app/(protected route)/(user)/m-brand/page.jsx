'use client'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/common/PaginationSection'
import React from 'react'
import { brandData } from '@/database/brandData.js'
import { UseAuth } from '@/hooks/UseAuth'

const MioBrandPage = () => {
    const { auth } = UseAuth();
    const BrandData = brandData.find((bc) => bc?.brandCode === auth?.brandCode);
    const SelectBrandData = BrandData?.tableData?.sort((a, b) => b.cumulativeRank - a.cumulativeRank);
 
    

    return (
        <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4 mt-2'>
            <div className="bg-white rounded-xl border overflow-auto">
                <BrandTable SelectBrandData={SelectBrandData} />
            </div>
            <Pagination />
        </section>
    )
}

export default MioBrandPage