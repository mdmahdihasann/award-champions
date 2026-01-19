"use client";

import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { championshipData } from "@/database/championsData";
import { UseAuth } from "@/hooks/UseAuth";
import axios from "axios";

export default function TeamSelect() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Select Team");
    const { auth, setAuth } = UseAuth();
    const ref = useRef(null);

    const handleSelect = async (team) => {
        setSelected(team.teamName);
        setOpen(false);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
                ...auth,
                team: team.teamName
            })
            if(response.status === 200){
                setAuth(response?.data)
            }

        } catch (error) {
            console.log(error.message);

        }
        router.push(`/team?team=${team.teamCode}`);
    };

    /* ---------- Close profile dropdown on outside click ---------- */
    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative text-sm">

            <button
                onClick={() => setOpen(!open)}
                className="w-32 bg-white border px-3 py-2 rounded-md flex justify-between items-center hover:border-[--primary-color]"
            >
                <span className="truncate">{selected}</span>
                <MdKeyboardArrowDown className={`transition text-lg ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute w-32 right-0 mt-2 p-1 bg-white border rounded-md shadow-lg z-50">
                    {championshipData.teams.map((team) => (
                        <button
                            key={team.teamCode}
                            onClick={() => handleSelect(team)}
                            className="block w-full text-left px-2 rounded-md py-1.5 hover:bg-gray-100 transition"
                        >
                            {team.teamName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
