import BrandHistorySection from '@/components/brand/BrandHistorySection';
import React from 'react'

export const metadata = {
    title: "Brand History - Award ChampoinShip",
};

const page = () => {
    return (
        <section className="wrapper max-w-screen-sm mx-auto flex flex-col gap-6">
            <BrandHistorySection />
        </section>
    )
}

export default page