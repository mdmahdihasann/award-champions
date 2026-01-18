"use client"


import { UseAuth } from "@/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function UserLayout({ children }) {
  const router = useRouter();
  const { auth } = UseAuth();

  useEffect(() => {

    if (!auth) {
      router.replace('/login')
    }
    if (auth?.role !== "mio") {
      router.replace("/")
      return;
    }
  }, [])
  return <>{children}</>;
}
