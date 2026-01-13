"use client"
import BrandButton from '@/components/brand/BrandButton'
import { useState } from 'react'
import { brandData } from '@/database/brandData.js'
import BrandTable from '@/components/brand/BrandTable'

const page = () => {
    const [activeBrand, setActiveBrand] = useState(null);
    const SelectBrandData = brandData.find((bc)=>bc.brandCode === activeBrand);
    
    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4 mt-2'>
                <div className='grid grid-cols-4 gap-2'>
                    <BrandButton setActiveBrand={setActiveBrand} activeBrand={activeBrand}/>
                </div>
            </section>
            <section className='wrapper max-w-screen-sm mx-auto p-2'>
                <div className="border rounded-lg p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                    <h2 className="text-2xl font-bold text-gray-800">{SelectBrandData?.brandName}</h2>

                    <div className="bg-white rounded-xl border overflow-auto">
                        <BrandTable SelectBrandData ={SelectBrandData} />
                    </div>

                </div>
            </section>
        </>
    )
}

export default page