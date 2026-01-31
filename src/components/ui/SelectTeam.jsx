"use client";

import { Select, Space } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";


export const TeamDropDown = {
  teams: [
    {
      teamCode: "A",
      teamName: "Team A",
    },
    {
      teamCode: "B",
      teamName: "Team B",
    },
    {
      teamCode: "C",
      teamName: "Team C",
    },
    {
      teamCode: "N",
      teamName: "Team RNL",
    },
  ],
};


const SelectTeam = () => {
  const router = useRouter();
  const { auth, setSelectedTeam } = useAuth();

  const handleSelect = async (teamCode) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
        {
          ...auth,
          team: teamCode,
        }
      );

      if (res.status === 200) {
        setSelectedTeam(res.data);
        router.push(`/zone?team=${teamCode}`);
      }
    } catch (error) {
      console.error("Team select failed:", error);
    }
  };

  return (
    <Space wrap>
      <Select
        placeholder="Select team"
        style={{ width: 120, height: 36 }}
        onChange={handleSelect}
        options={TeamDropDown.teams.map((team) => ({
          value: team.teamCode,
          label: team.teamName,
        }))}
      />
    </Space>
  );
};

export default SelectTeam;