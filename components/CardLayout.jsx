'use client'

const CardLayout = ({children}) => {
  return (
    <div
      className="flex flex-col drop-shadow-md md:mx-3 mb-4 bg-white text-gray-600 text-center justify-center z-0"
    >
      {children}
    </div>
  )
}
export default CardLayout
