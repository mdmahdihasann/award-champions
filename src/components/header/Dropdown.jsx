"use client";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white transition"
      >
        <HiDotsVertical className="text-xl" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-10">
          <ul className="py-1">
            <li>
              <button
                type="button"
                onClick={() => {
                  router.push("/team");
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Team
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
