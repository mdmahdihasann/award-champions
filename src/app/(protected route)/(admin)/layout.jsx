"use client"

import { UseAuth } from "@/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const { auth } = UseAuth();

  useEffect(() => {

    if (!auth) {
      router.replace('/login')
    }
    if (!auth?.work_area_t === "admin") {
      router.replace("/m-brand")
      return;
    }
  }, [auth])
  return (
    <>
      {children}
    </>
  )
}
