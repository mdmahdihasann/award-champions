import ZoneTable from "@/components/common/ZoneTable";



export default function TeamPage() {

  return (
    <>
      <section className="wrapper max-w-screen-sm mx-auto p-4">
        <div className="border rounded-lg p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
          <h2 className="text-2xl font-bold text-gray-800">Zone</h2>

          <div className="bg-white rounded-xl border overflow-auto">
            <ZoneTable />
          </div>

        </div>

      </section>
    </>
  );
}
