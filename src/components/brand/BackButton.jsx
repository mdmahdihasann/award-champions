"use client"

import Button from '../common/Button'
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
    return (
        <Button onClick={() => router.back()} className='bg-[--bg-color] border border-[--border-color] w-10 mb-5 hover:bg-[--primary-color] hover:border-[--primary-color] transition text-black hover:text-white flex items-center justify-center'><IoChevronBackOutline className='rounded'/>
        </Button>
    )
}

export default BackButton