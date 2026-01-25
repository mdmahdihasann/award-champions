"use client";

import { Select, Space } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { championshipData } from "@/database/championsData";
import { UseAuth } from "@/hooks/UseAuth";
import { useState } from "react";

const SelectTeam = () => {
  const router = useRouter();
  const { auth, setSelectedTeam } = UseAuth();
  const [selected, setSelected] = useState(null);

  const handleSelect = async (teamCode) => {
    
    const team = championshipData.teams.find(
      (t) => t.teamCode === teamCode
    );

    if (!team) return;

    setSelected(team.teamName);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
        {
          ...auth,
          team: teamCode,
        }
      );

      if (response.status === 200) {
        setSelectedTeam(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }

    router.push(`/team?team=${teamCode}`);
  };

  return (
    <Space wrap>
      <Select
        placeholder="Select team"
        style={{ width: 120, height: 36 }}
        value={selected}
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
