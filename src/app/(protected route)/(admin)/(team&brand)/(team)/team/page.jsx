import Pagination from "@/components/common/Pagination";
import ZoneTable from "@/components/common/ZoneTable";


export const metadata = {
  title: "Team - Award ChampoinShip",
};
export default function TeamPage() {

  return (
    <>
      <section className="wrapper max-w-screen-sm mx-auto">
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
          <h2 className="text-2xl font-semibold text-gray-800">Zone</h2>
          <div>
            <div className="bg-white rounded-xl border border-gray-700 overflow-auto">
              <ZoneTable />
            </div>
            <Pagination />
          </div>

        </div>

      </section>
    </>
  );
}
