"use client"
import MyButton from '@/components/ui/button'
import { MediaContext } from '@/context/MediaProvider'
import getAllMedia from '@/lib/getAllMedia'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'

const Media = () => {
    const { media, setMedia } = useContext(MediaContext)
    const [token, settoken] = useState<string | null>(null)
    const params = useParams()
    const col_id = params.col_id
    useEffect(() => {
        settoken(localStorage.getItem("token"))
    }, [])

    const query = useQuery({
        queryKey: ['media'],
        queryFn: () => getAllMedia(token ?? "", col_id),
        enabled: !!token
    })
    useEffect(() => {
        if (query.data) {
            console.log(query.data, "in media query")
            setMedia(query.data)
        }
    })
    console.log("media: ", media)
    return (
        <div className='p-4'>
            <Link href={`/dashboard/project/${col_id}`}>

                <div className='flex flex-row items-center '>
                    <AiFillCaretLeft className='text-4xl hover:scale-90 hover:cursor-pointer ' />
                    <h1 className='text-2xl rounded-4xl shadow-md shadow-orange-500 p-2 pl-4 text-violet-400 w-fit font-bold mb-6 mt-4'>Media</h1>
                </div>
            </Link>
            <MyButton>Add more files</MyButton>
            <div

                className="overflow-x-auto my-5">
                <table className="min-w-full border border-gray-700 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">S.No</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Title</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Content</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Key</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Created</th>
                            {/* <th className="px-4 py-2 border-b border-gray-600 text-left">Status</th> */}
                            <th className="px-4 py-2 border-b border-gray-600 text-left"></th>
                        </tr>
                    </thead>
                    <tbody className='bg-black border-2 border-violet-500/40'>


                        <>
                            <tr className="hover:bg-gray-700">
                                <td className="px-4 py-2 border-b border-gray-600"></td>
                                {/* <td className="px-4 py-2 border-b border-gray-600">{blog.title}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{blog.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{blog.published}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{blog.lastedited}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{blog.status}</td> */}
                                {/* <td
                                        onClick={() => toggleDropdown(index)}
                                        className=" relative  ">
                                        <button className='px-4 py-2 border-b border-gray-600 hover:bg-violet-500 p-1 cursor-pointer'>
                                            ...
                                        </button>
                                        {openIndex === index && (
                                            <div className="absolute right-0 mt-2 w-24 bg-white text-black rounded shadow-lg z-10">
                                                <button
                                                    onClick={() => handleEditBlog(blog.id, blog.collection_id)}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id, blog.collection_id)}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td> */}
                            </tr>
                        </>

                    </tbody>

                </table>

            </div>




        </div>
    )
}

export default Media

