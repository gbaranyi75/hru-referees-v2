'use client'

const CardLayout = ({children}) => {
  return (
    <div
      v
      className="flex flex-col drop-shadow-md md:mx-2 mb-4 py-3 bg-white text-gray-600 text-center justify-center z-0"
    >
      {children}
    </div>
  )
}
export default CardLayout
