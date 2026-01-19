"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UseAuth } from "./UseAuth";

export const AuthGuard = ({ children }) => {
    const { auth } = UseAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!auth && pathname !== "/login") {
            router.replace("/login");
        }
    }, [auth, pathname, router]);

    return <>{children}</>;
};
