import AddMatchDays from "@/components/AddMatchDays";
import PageLayout from "@/components/PageLayout";

const MatchDaysPage = () => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2">Elérhetőség megadása</h1>
      <AddMatchDays />
    </PageLayout>
  );
};

export default MatchDaysPage;
