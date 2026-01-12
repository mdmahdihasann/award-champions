"use client"
import { brandData } from '@/database/brandData.js'
import Button from '../common/Button'

const BrandButton = ({ setActiveBrand }) => {

    return (
        <>
            {
                brandData?.map((data) => (
                    <Button key={data.brandCode} onClick={() => setActiveBrand(data?.brandCode)} className='text-sm px-1 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition'>{data.brandName}</Button>
                ))
            }
        </>

    )
}

export default BrandButton