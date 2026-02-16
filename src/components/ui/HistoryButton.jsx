"use client"
import Button from './Button'
import { useRouter } from 'next/navigation';
import { FaHistory } from "react-icons/fa";

const HistoryButton = ({ className, url }) => {
    const router = useRouter();
    return (
        <div className='flex justify-end'>
            <Button onClick={() => router.push(`/${url}`)} className={`flex gap-2 justify-center text-sm px-2 bg-[--bg-color] w-24 border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition ${className}`}><FaHistory className='text-sm' /> History
            </Button>
        </div>
    )
}

export default HistoryButton