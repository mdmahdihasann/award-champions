import React from 'react'
import TableWrapper from './TableWrapper'
import HistoryButton from '@/components/ui/HistoryButton';

export const metadata = {
  title: "Zone - Award ChampoinShip",
};

const page = () => {
    return (
        <section className='wrapper max-w-screen-sm mx-auto flex flex-col gap-6'>
            <HistoryButton url={'m-zone-history'}/>
            <TableWrapper />
        </section>
    )
}

export default page