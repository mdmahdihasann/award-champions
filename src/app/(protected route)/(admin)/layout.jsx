"use client"

import { UseAuth } from "@/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const { auth, loading } = UseAuth();

  useEffect(() => {

    if (!loading && !auth) {
      router.replace('/login')
    }
    if (!loading && !auth?.work_area_t === "admin") {
      router.replace("/m-brand")
      return;
    }
  }, [auth, loading])
  if(loading) return null;
  if(!auth) return null;
  return (
    <>
      {children}
    </>
  )
}
