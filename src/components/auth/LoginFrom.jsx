"use client";

import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UseAuth } from "@/hooks/UseAuth";
import axios from "axios";


export const users = [
    {
        work_area_t: "admin",
        password: "admin@chq#789",
    }

];

export default function LoginFrom() {
    const router = useRouter();
    const [work_area_t, setWork_area_t] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setAuth } = UseAuth();



    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            if (work_area_t !== "admin") {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
                    { work_area_t, password, team: null }
                );

                if (res.status === 200) {
                    console.log(res.data);
                    const authData = {
                        ...res.data,
                        brandCode: "CORALCAL" //extra data for ui   
                    };
                    setAuth(authData);
                    toast.success("Login Successfully");
                    router.push("/m-brand");
                }
                return;
            }

            const adminUser = { work_area_t, password, team: null };
            setAuth(adminUser);
            toast.success("Login Successfully");
            router.push("/");
        } catch (error) {
            console.log(error.message);
            toast.error("Invalid ID or Password");
        }
    };



    return (
        <form className="space-y-4" onSubmit={handleLogin}>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee ID
                </label>
                <input
                    type="text"
                    name="id"
                    value={work_area_t}
                    onChange={(e) => setWork_area_t(e.target.value)}
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
                {/* eye button */}
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