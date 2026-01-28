"use client";

import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import SelectTeam from "./SelectTeam";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Dropdown } from "antd";

export default function Header() {
    const router = useRouter();
    const { setAuth, auth, setSelectedTeam } = useAuth();

    const handleLogout = () => {
        setAuth(null);
        setSelectedTeam(null);
        sessionStorage.removeItem("selectedTeam");
        sessionStorage.removeItem("authUser");
        router.push("/login");
        toast.success("Logout Successfully")
    };


    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[--primary-color]">
            <section className="wrapper flex items-center justify-between py-3 relative min-h-20">

                {/* User Info */}
                <Dropdown
                    trigger={["click"]}
                    popupRender={() => (
                        <div className="p-1 w-24 bg-white border border-gray-300 rounded-md shadow-lg">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-1 rounded-sm text-sm hover:bg-gray-100 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                >
                    <div className="cursor-pointer select-none">
                        <h6 className="font-semibold text-white text-md">
                            {auth?.data?.role === "user" ? auth?.data?.name : "Admin"}
                        </h6>

                        <div className="flex items-center gap-1 text-gray-200 text-xs">
                            <span className="capitalize">
                                {auth?.data?.role === "user"
                                    ? auth?.data?.work_area_t
                                    : "Admin Dashboard"}
                            </span>
                            <MdOutlineKeyboardArrowDown className="text-base" />
                        </div>
                    </div>
                </Dropdown>


                {/* Team Selector */}
                {
                    auth?.data?.role !== "user" ? <SelectTeam /> : <FaUserCircle className="text-white text-2xl" />
                }


            </section>
        </header>
    );
}
