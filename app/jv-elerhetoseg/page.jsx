import AddMatchDays from "@/components/AddMatchDays";

const MatchDaysPage = () => {
  return (
    <>
      <section>
        <div className="container m-auto max-w-7xl py-2 bg-blue-50">
          <div className="mt-5 md:mt-10 text-center px-4 md:px-0 text-gray-600">
            <h1 className="text-2xl font-bold mb-2 md:mb-2">
              Elérhetőség megadása
            </h1>
          </div>
          <AddMatchDays />
        </div>
      </section>
    </>
  );
};

export default MatchDaysPage;
