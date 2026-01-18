"use client"

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { RiMapPinLine, RiBuildingLine } from "react-icons/ri";

export default function teamLayout({ children }) {
    const router = useRouter();
    return (
        <>
            <section className="wrapper max-w-screen-sm mx-auto px-4 py-2 mt-2">
                <div className="flex gap-4 justify-end">

                    <Button className="flex px-4 text-sm gap-1.5 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition">
                        <RiMapPinLine size={16} />
                        Zone
                    </Button>

                    <Button onClick={()=>router.push('/brand')} className="flex px-4 text-sm gap-1.5 bg-white border border-[--primary-color] hover:bg-[--primary-color] hover:text-white items-center transition">
                        <RiBuildingLine size={16} />
                        Brand
                    </Button>
                </div>
            </section>
            <section>
                {children}
            </section>
        </>
    );
}
