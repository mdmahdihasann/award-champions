"use client";

import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UseAuth } from "@/hooks/UseAuth";


export const users = [
    {
        employeeId: "9001",
        password: "admin123",
        role: "admin",
        brandCode: "ALL",
        territoryId: "ALL",
    },
    {
        employeeId: "9101",
        password: "mio123",
        role: "mio",
        brandCode: "CORALCAL",
        territoryId: "T011",
    },
    {
        employeeId: "9102",
        password: "mio456",
        role: "mio",
        brandCode: "EXIUM",
        territoryId: "T003",
    },
    {
        employeeId: "9103",
        password: "mio789",
        role: "mio",
        brandCode: "RIVOTRIL",
        territoryId: "T006",
    },
];



export default function LoginPage() {
    const router = useRouter();
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { auth, setAuth } = UseAuth();

    useEffect(() => {
        console.log(auth);
    }, [auth])

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find((u) => u.employeeId === employeeId && u.password === password)
        if (user.role === "admin") {
            setAuth(user);
            router.push('/');
            console.log(auth);
            toast.success("Login Successfully")
        } else if (user.role === "mio") {
            setAuth(user);
            router.push('/brand');
            toast.success("Login Successfully")
        } else {
            toast.error("Invalid Employee ID or Password")
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleLogin}>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee ID
                </label>
                <input
                    type="text"
                    name="id"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-[7px] text-gray-900 focus:outline-none focus:border-blue-600 transition"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                </label>
                <input
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-gray-300 px-4 py-[7px] text-gray-900 focus:outline-none focus:border-blue-600 transition pr-12"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-[72%] transform -translate-y-[50%] text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <FaEye className="w-[2.4em]" /> : <FaEyeSlash className="w-[2.4em]" />}
                </button>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-[--primary-color] py-2 hover:bg-[--primary-color-hover] text-white font-semibold transition"
                >
                    Login
                </button>
            </div>
        </form>
    );
}