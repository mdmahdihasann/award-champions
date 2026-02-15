import React from 'react'
import HistorySection from './HistorySection'

export const metadata = {
    title: "Zone History - Award ChampoinShip",
};

const page = () => {
    return (
        <section className="wrapper max-w-screen-sm mx-auto flex flex-col gap-6">
            <HistorySection />
        </section>
    )
}

export default page