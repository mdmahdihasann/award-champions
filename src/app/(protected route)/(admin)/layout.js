"use client"

import { UseAuth } from "@/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const { auth } = UseAuth();

  useEffect(() => {
    
    if (!auth){
      router.replace('/login')
    }
    const adminRoles = "admin";
    if (!adminRoles.includes(auth?.role)){
      router.replace("/m-brand")
      return;
    }
  }, [])
  return <>{children}</>;
}
