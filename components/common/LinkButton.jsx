'use client'

import Link from 'next/link'

const LinkButton = ({ text, link }) => {
  return (
    <>
      <button
        type="button"
        className="justify-center text-blue-500 hover:underline"
      >
        <Link to={link}>{text}</Link>
      </button>
    </>
  )
}

export default LinkButton