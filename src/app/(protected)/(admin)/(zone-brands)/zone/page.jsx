import HistoryButton from "@/components/ui/HistoryButton";
import TableWrapper from "./TableWrapper";

export const metadata = {
  title: "Zone - Award ChampoinShip",
};

const TeamPage = () => {
  return (
    <>
      <section className="wrapper max-w-screen-sm mx-auto flex flex-col gap-6">
        <HistoryButton/>
        <TableWrapper />
      </section>
    </>
  );
}
export default TeamPage;