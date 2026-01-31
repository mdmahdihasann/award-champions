"use client"

import { useAuth } from "@/hooks/useAuths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {

    if (!loading && !auth) {
      router.replace('/login')
    }
    if (!loading && auth?.data?.role === "user") {
      router.replace("/m-brand")
      return;
    }
  }, [auth, loading])
  if (loading) return null;
  if (!auth) return null;
  return (
    <>
      {children}
    </>
  )
}
