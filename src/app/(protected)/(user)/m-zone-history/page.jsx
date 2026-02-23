
import ZoneHistorySection from '@/components/zone/ZoneHistorySection';
import React from 'react'

export const metadata = {
    title: "Zone History - Award ChampoinShip",
};

const page = () => {
    return (
        <section className="wrapper max-w-screen-sm mx-auto flex flex-col gap-6">
            <ZoneHistorySection />
        </section>
    )
}

export default page