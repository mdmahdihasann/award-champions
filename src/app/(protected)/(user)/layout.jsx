"use client";

import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiBuildingLine } from "react-icons/ri";
import BackButton from "@/components/ui/BackButton";

export default function UserLayout({ children }) {
  const router = useRouter();
  const { auth } = useAuth();
  const pathname = usePathname();

  const isAllowed =
    auth?.data?.designation_id === 1 ||
    auth?.data?.designation_id === 2;

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
      return;
    }

    if (auth?.work_area_t === "admin") {
      router.replace("/");
      return;
    }

    if (isAllowed) {
      router.replace("/m-brand");
    }
  }, [auth, isAllowed, router]);

  if (!auth) return null;

  return (
    <>
      {
        !isAllowed && (
          <section className="wrapper max-w-screen-sm mx-auto px-4 mt-2">
            <div className="flex justify-between">
              <BackButton className="mb-[0px]" />

              {pathname !== "/m-brand" && (
                <Button
                  onClick={() => router.push("/m-brand")}
                  className="flex px-4 text-sm gap-1.5 bg-[--bg-color] border border-[--border-color] hover:bg-[--primary-color] hover:text-white items-center transition"
                ><RiBuildingLine size={16} />Brand</Button>
              )}
            </div>
          </section>
        )
      }


      {children}
    </>
  );
}
