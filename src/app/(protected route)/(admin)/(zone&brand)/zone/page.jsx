import MonthTableWrapper from "./MonthTableWrapper";
import QuarterTableWrapper from "./QuarterTableWrapper";



export const metadata = {
  title: "Team - Award ChampoinShip",
};
const TeamPage = () => {
  return (
    <>
      <section className="wrapper max-w-screen-sm mx-auto flex flex-col gap-6">
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
          <h2 className="text-xl font-semibold text-gray-800">Zone Perfomance (Quater)</h2>
          <QuarterTableWrapper />
        </div>
        <div className="border rounded-xl p-4 bg-[--bg-color] flex flex-col gap-4 border-[--border-color]">
          <h2 className="text-xl font-semibold text-gray-800">Zone Perfomance (Current Month)</h2>
          <MonthTableWrapper/>
        </div>
      </section>
    </>
  );
}
export default TeamPage;