"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'

const Links = () => {
  const params = useParams()
  const col_id = params.col_id
  return (
    <div>
      <Link href={`/dashboard/project/${col_id}`}>

        <div className='flex flex-row items-center '>
          <AiFillCaretLeft className='text-4xl hover:scale-90 hover:cursor-pointer ' />
          <h1 className='text-2xl rounded-4xl shadow-md shadow-orange-500 p-2 pl-4 text-violet-400 w-fit font-bold mb-6 mt-4'>Links</h1>
        </div>
      </Link>



    </div>
  )
}

export default Links
