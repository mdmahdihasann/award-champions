"use client";

import { useRouter } from "next/navigation";
import { UseAuth } from "./UseAuth"
import { useEffect } from "react";


export const AuthGuard = ({ children }) => {
    const { auth } = UseAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth) {
            router.push('/login')
        }
    }, [])

    return <>{children}</>
}