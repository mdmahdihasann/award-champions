"use client"
import BrandButton from '@/components/brand/BrandButton'
import { useState } from 'react'
import { brandData } from '@/database/brandData.js'
import BrandTable from '@/components/brand/BrandTable'
import Pagination from '@/components/common/Pagination'

const BrandSection = () => {
    const [activeBrand, setActiveBrand] = useState(null);
    const SelectBrand = brandData.find((bc) => bc.brandCode === activeBrand);
    const SelectBrandData = SelectBrand?.tableData?.sort((a, b) => b.cumulativeRank - a.cumulativeRank);

    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <BrandButton setActiveBrand={setActiveBrand} activeBrand={activeBrand} />
                </div>
            </section>

            <section className='wrapper max-w-screen-sm mx-auto pt-2 pb-4'>
                <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                    <h2 className="text-2xl font-semibold text-gray-800">{SelectBrand?.brandName}</h2>

                    <div>
                        <div className="bg-white rounded-xl border overflow-auto">
                            <BrandTable SelectBrandData={SelectBrandData} />
                        </div>
                        <Pagination />
                    </div>

                </div>
            </section>
        </>
    )
}

export default BrandSection