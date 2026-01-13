"use client"
import { useRouter } from "next/navigation";
import { championshipData } from "../../database/championsData"


export default function Header() {
    const router = useRouter();
    function handleSelect(e) {
        const teamCode = e.target.value;
        router.push(`/team?team=${teamCode}`)
        if (teamCode === "") {
            router.push('/')
        }
    }
    return (
        <header className="sticky top-0 z-10 min-h-30 h-full w-full border-b flex items-center py-3 bg-[--primary-color]">
            <section className="wrapper flex items-center justify-between gap-2 relative">
                <div className="flex flex-col gap-0">
                    <h6 className="font-semibold text-white">ID: 0305943</h6>
                    <div className="text-sm text-gray-300">Admin</div>
                </div>
                <select onChange={handleSelect} className="border p-2 rounded-md w-32 text-sm">
                    <option value="">Select Team</option>
                    {championshipData.teams.map((team) => (
                        <option key={team.teamCode} value={team.teamCode}>
                            {team.teamName}
                        </option>
                    ))}
                </select>
            </section>
        </header>
    );
}
