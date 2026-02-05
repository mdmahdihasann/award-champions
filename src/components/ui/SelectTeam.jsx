"use client";

import { Select, Space } from "antd";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export const TeamDropDown = [
  { value: "A", label: "Team A" },
  { value: "B", label: "Team B" },
  { value: "C", label: "Team C" },
  { value: "N", label: "Team RNL" },
];

const SelectTeam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { auth, setSelectedTeam } = useAuth();
  const [selectedValue, setSelectedValue] = useState(undefined);

  const handleSelect = async (teamCode) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
        {
          ...auth,
          team: teamCode,
        }
      );

      if (response.status === 200) {
        setSelectedValue(teamCode);
        setSelectedTeam(response.data);
        router.push(`/zone?team=${teamCode}`);
      }
    } catch (error) {
      console.error("Team select failed:", error);
    }
  };

  useEffect(()=>{
    const teamFromUrl = searchParams.get("team");
    if(teamFromUrl){
      setSelectedValue(teamFromUrl)
    }
  },[searchParams])

  useEffect(() => {
    if (pathname === "/") {
      setSelectedValue(undefined);
    }
  }, [pathname]);

  return (
    <Space wrap>
      <Select
        placeholder="Select team"
        style={{ width: 140, height: 36 }}
        value={selectedValue}
        onChange={handleSelect}
        options={TeamDropDown}
      />
    </Space>
  );
};

export default SelectTeam;
