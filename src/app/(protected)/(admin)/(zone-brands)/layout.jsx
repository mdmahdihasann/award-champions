"use client"
import BackButton from '@/components/ui/BackButton'
import Button from '@/components/ui/Button';
import UserInfo from '@/components/ui/UserInfo';
import { ContentLoading } from '@/components/Loading';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { RiBuildingLine } from "react-icons/ri";

export default function TeamBrandLayout({ children }) {
  const router = useRouter();
  const paramsBrand = usePathname()

  return (
    <>
      <section className="wrapper max-w-screen-sm mx-auto px-4 py-2 mt-2">
        <div className='flex justify-between'>
          <div><BackButton /></div>
          {
            paramsBrand !== '/brand' ? <div><Button onClick={() => router.push('/brand')} className="flex px-4 text-sm gap-1.5 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition">
              <RiBuildingLine size={16} />
              Brand
            </Button></div> : ""
          }
        </div>
        <Suspense fallback={<ContentLoading />}>
          <UserInfo />
        </Suspense>
      </section>

      <section>
        {children}
      </section>;
    </>
  )
}
