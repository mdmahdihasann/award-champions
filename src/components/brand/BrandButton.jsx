"use client"
import Button from '../ui/Button'
import { useEffect } from 'react'

const BrandButton = ({ setActiveBrand, activeBrand, brandData }) => {

    useEffect(() => {
        if (brandData?.data?.brands?.length) {
            setActiveBrand(brandData?.data?.brands[0])
        }
    }, [brandData?.data?.brands?.length])

    return (
        <>
            {
                brandData?.data?.brands?.map((brand) => (
                    <Button key={brand} onClick={() => setActiveBrand(brand)} className={`text-sm px-1 ${activeBrand === brand ? "bg-[--primary-color] text-white" : "bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center"}  transition`}>{brand}</Button>
                ))
            }
        </>

    )
}

export default BrandButton