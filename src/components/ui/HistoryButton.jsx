"use client"
import Button from './Button'
import { usePathname, useRouter } from 'next/navigation';
import { FaHistory } from "react-icons/fa";

const HistoryButton = ({ className }) => {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname?.includes("history")) {
        return null;
    }

    let historyUrl = "";

    if (pathname?.includes("m-brand")) {
        historyUrl = "m-brand-history";
    } 
    else if (pathname?.includes("m-zone")) {
        historyUrl = "m-zone-history";
    } 
    else if (pathname?.includes("brand")) {
        historyUrl = "brand-history";
    } 
    else if (pathname?.includes("zone")) {
        historyUrl = "zone-history";
    }

    return (
        <div className='flex justify-end'>
            <Button 
                onClick={() => historyUrl && router.push(`/${historyUrl}`)} 
                className={`flex gap-2 justify-center text-sm px-2 bg-[--bg-color] w-24 border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition ${className}`}
            >
                <FaHistory className='text-sm' /> History
            </Button>
        </div>
    )
}

export default HistoryButton