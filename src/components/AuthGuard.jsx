"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuths";

export const AuthGuard = ({ children }) => {
    const { auth } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!auth && pathname !== "/login") {
            router.replace("/login");
        }
    }, [auth, pathname, router]);

    return <>{children}</>;
};
