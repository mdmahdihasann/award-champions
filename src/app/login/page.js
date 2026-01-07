"use client";

import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl p-10">
        
        {/* Brand */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            RADINT
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Secure internal access portal
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="Enter your ID"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[66%] transform -translate-y-[50%] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEye className="w-[2.4em]"/> :  <FaEyeSlash className="w-[2.4em]"/>}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[--black-color] py-3 text-white font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
