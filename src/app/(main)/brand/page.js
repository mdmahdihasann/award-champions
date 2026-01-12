import Button from '@/components/common/Button'
import Table from '@/components/common/Table'
import React from 'react'

const page = () => {
    return (
        <>
            <section className='wrapper max-w-screen-sm mx-auto p-4 mt-2'>
                <div className='grid grid-cols-4 gap-2'>
                    <Button className='text-sm px-2 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition'>Coralcal D</Button>
                    <Button className='text-sm px-2 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition'>Coralcal DX</Button>
                    <Button className='text-sm px-2 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition'>Coralcal Vita</Button>
                    <Button className='text-sm px-2 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition'>Exium</Button>
                </div>
            </section>
            <section className='wrapper max-w-screen-sm mx-auto p-2'>
                <div className="border rounded-lg p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
                    <h2 className="text-2xl font-bold text-gray-800">Coralcal</h2>

                    <div className="bg-white rounded-xl border overflow-auto">
                        <Table />
                    </div>

                </div>
            </section>
        </>
    )
}

export default page