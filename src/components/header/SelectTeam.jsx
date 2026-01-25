"use client";

import { Select, Space } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { championshipData } from "@/database/championsData";
import { UseAuth } from "@/hooks/UseAuth";

const SelectTeam = () => {
  const router = useRouter();
  const { auth, setSelectedTeam } = UseAuth();

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
        options={championshipData.teams.map((team) => ({
          value: team.teamCode,
          label: team.teamName,
        }))}
      />
    </Space>
  );
};

export default SelectTeam;