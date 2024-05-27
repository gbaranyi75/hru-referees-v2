import SpreadSheet from '@/components/SpreadSheet'

const Spreadsheet = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-7xl py-10 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-2 md:mb-10">
          Játékvezető elérhetőség
        </h1>
        <SpreadSheet />
      </div>
    </section>
  )
}
export default Spreadsheet
