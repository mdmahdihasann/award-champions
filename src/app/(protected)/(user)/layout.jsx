"use client"


import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function UserLayout({ children }) {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {

    if (!auth) {
      router.replace('/login')
    }
    if (auth?.work_area_t === "admin") {
      router.replace("/")
      return;
    }
  }, [auth])
  return <>{children}</>;
}
