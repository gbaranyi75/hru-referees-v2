import SpreadSheet from "@/components/SpreadSheet";
import PageLayout from "@/components/common/PageLayout";

const SpreadSheetPage = () => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6 md:mb-10">
        Elérhető játékvezetők
      </h1>
      <SpreadSheet />
    </PageLayout>
  );
};
export default SpreadSheetPage;
