import { UseAuth } from "@/hooks/UseAuth";


const UserInfo = () => {
    const { selectedTeam } = UseAuth();
;    return (
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
            <div className="flex flex-col gap-1.5">
                <div className="leading-tight flex flex-wrap items-center gap-1">
                    <h3 className="text-neutral-500 text-xs font-medium">Name :</h3>
                    <h4 className="text-sm font-semibold">{selectedTeam?.data?.name}</h4>
                </div>
                <div className="leading-tight flex flex-wrap items-center gap-1">
                    <h3 className="text-neutral-500 text-xs font-medium">Team :</h3>
                    <h4 className="text-sm font-semibold">{selectedTeam?.data?.address}</h4>
                </div>
                <div className="leading-tight flex flex-wrap items-center gap-1">
                    <h3 className="text-neutral-500 text-xs font-medium">Territory Code :</h3>
                    <h4 className="text-sm font-semibold">{selectedTeam?.data?.work_area_t}</h4>
                </div>
            </div>
        </div>
    )
}

export default UserInfo