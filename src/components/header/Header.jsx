"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { UseAuth } from "@/hooks/UseAuth";
import SelectTeam from "./SelectTeam";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
    const router = useRouter();
    const { setAuth, auth } = UseAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = () => {
        setAuth(null);
        router.push("/login");
    };

    /* ---------- Close profile dropdown on outside click ---------- */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    return (
        <header className="sticky top-0 z-20 min-h-20 w-full flex items-center border-b bg-[--primary-color]">
            <section className="wrapper flex items-center justify-between py-3 relative">

                {/* User Info */}
                <div
                    ref={profileRef}
                    className="relative cursor-pointer"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                >
                    <h6 className="font-semibold text-white text-md">
                        ID: {auth?.employeeId}
                    </h6>

                    <div className="flex items-center gap-1 text-gray-200 text-xs">
                        <span className="capitalize">{auth?.role}</span>
                        <MdOutlineKeyboardArrowDown className="text-base" />
                    </div>

                    {isProfileOpen && (
                        <div className="absolute left-0 mt-2 p-1 w-28 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Team Selector */}
                {
                    auth?.role === "admin" ? <SelectTeam /> : <FaUserCircle  className="text-white text-2xl"/>
                }


            </section>
        </header>
    );
}
