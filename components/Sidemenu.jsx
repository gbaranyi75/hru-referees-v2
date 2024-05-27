'use client'
//import { UserAuth } from 'src/contexts/AuthContext'
import Link from 'next/link'

const SideMenu = () => {
  //const { user } = UserAuth()

  return (
    <div className="mb-1">
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <Link
          className="w-full inline-flex justify-center py-3 border border-blue text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          href="/admindashboard/calendar"
        >
          Táblázatok
        </Link>
      </div>
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <button
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          //to="/esemenyek"
        >
          Események
        </button>
      </div>
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <button
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          //to="/video"
        >
          Videók
        </button>
      </div>
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <button
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          //to="/jatekvezetok"
        >
          Játékvezetők
        </button>
      </div>
    </div>
  )
}

export default SideMenu
