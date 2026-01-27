"use client"
import Button from '../common/Button'
import { useEffect } from 'react'

const BrandButton = ({ setActiveBrand, activeBrand, brandDatas }) => {

    useEffect(() => {
        if (brandDatas?.data?.brands?.length) {
            setActiveBrand(brandDatas?.data?.brands[0])
        }
    }, [brandDatas?.data?.brands?.length])

    return (
        <>
            {
                brandDatas?.data?.brands?.map((brand) => (
                    <Button key={brand} onClick={() => setActiveBrand(brand)} className={`text-sm px-1 ${activeBrand === brand ? "bg-[--primary-color] text-white" : "bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center"}  transition`}>{brand}</Button>
                ))
            }
        </>

    )
}

export default BrandButton