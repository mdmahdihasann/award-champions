"use client"
import { brandData } from '@/database/brandData.js'
import Button from '../common/Button'
import { useEffect } from 'react'

const BrandButton = ({ setActiveBrand, activeBrand }) => {

    useEffect(()=>{
        if(brandData?.length){
            setActiveBrand(brandData[0].brandCode)
        }
    },[])

    return (
        <>
            {
                brandData?.map((data) => (
                    <Button key={data.brandCode} onClick={() => setActiveBrand(data?.brandCode)} className={`text-sm px-1 ${activeBrand === data.brandCode ? "bg-[--primary-color] text-white" : "bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center"}  transition`}>{data.brandName}</Button>
                ))
            }
        </>

    )
}

export default BrandButton