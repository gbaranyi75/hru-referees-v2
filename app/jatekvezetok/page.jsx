import Referees from "@/components/Referees"

const RefereesPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-7xl py-5 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-2 md:mb-10">
          Játékvezetők
        </h1>
        <Referees />
      </div>
    </section>
  )
}
export default RefereesPage