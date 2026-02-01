"use client"

import Button from './Button'
import { MdArrowBack } from "react-icons/md";
import { useRouter } from 'next/navigation';

const BackButton = ({className}) => {
    const router = useRouter();
    return (
        <Button onClick={() => router.back()} className={`flex gap-2 text-sm px-2 bg-[--bg-color] w-24 border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center mb-[23px] transition ${className}`}><MdArrowBack className='rounded' /> Go Back
        </Button>
    )
}

export default BackButton