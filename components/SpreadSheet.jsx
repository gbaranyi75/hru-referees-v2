'use client'

const SpreadSheet = () => {
  const dates = ['2024/06/12', '2024/06/12', '2024/06/12', '2024/06/12','2024/06/12','2024/06/12','2024/06/12','2024/06/12','2024/06/12','2024/06/12','2024/06/12']
  const users = ['Tibi', 'Jancsi', 'Matyi']

  return (
    <div className="flex flex-col md:mx-2 my-5 md:justify-center overflow-x-auto relative">
      <table className="max-w-5xl text-sm text-center text-gray-500 dark:text-gray-400 mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300">
          <tr>
            <th scope="col" className="py-2 px-6 text-center">
              Név
            </th>
            {dates.map((date) => (
              <th scope="col" className="py-3 px-2 text-center" key={date}>
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"> 
              <th className="py-3 text-center">{user}</th>
              <td className="py-3 px-2 text-center">igen</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default SpreadSheet
