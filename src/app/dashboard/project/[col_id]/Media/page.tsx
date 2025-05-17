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
    const [clickedButton, setClickedButton] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState<File | null>()

    const params = useParams()
    const col_id = params.col_id
    useEffect(() => {
        settoken(localStorage.getItem("token"))
    }, [])

    const query = useQuery({
        queryKey: ['media'],
        queryFn: () => getAllMedia(token ?? "", col_id?.toString() ?? ""),
        enabled: !!token
    })
    useEffect(() => {
        if (query.data) {
            setMedia(query.data)
        }
    })


    const handleUpload = async () => {


        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        if (file) {
            formData.append('file', file)
        }
        // mutation.mutate(formData)
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/postmedia/${col_id}`, {
            method: 'POST',
            headers: {

                Authorization: `Bearer ${token}`,
            },
            body: formData
        }
        )
        const mediaResponse = await getAllMedia(token ?? "", col_id?.toString() ?? "")
        setMedia(mediaResponse)

        setClickedButton(!clickedButton)
    }
    return (
        <div className='p-4'>
            <Link href={`/dashboard/project/${col_id}`}>

                <div className='flex flex-row items-center '>
                    <AiFillCaretLeft className='text-4xl hover:scale-90 hover:cursor-pointer ' />
                    <h1 className='text-2xl rounded-4xl shadow-md shadow-orange-500 p-2 px-4 pl-4 text-violet-400 w-fit font-bold mb-6 mt-4'>MEDIA</h1>
                </div>
            </Link>
            {
                !clickedButton ?
                    <MyButton onClick={() => setClickedButton(!clickedButton)}>Add more files</MyButton>
                    :
                    <MyButton onClick={() => setClickedButton(!clickedButton)}> Cancel</MyButton>
            }
            {
                clickedButton &&
                <div className='flex flex-col mx-5 justify-center items-start p-4 rounded-4xl bg-black w-fit gap-2'>
                    <input
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-violet-600/50 rounded-2xl p-2" type="text" placeholder='Title' />
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border-2 border-violet-600/50 rounded-2xl p-2" placeholder='Content' />
                    <input
                        id='filekey'

                        onChange={
                            (e) => {
                                setFile(e.target.files?.[0])
                            }
                        }
                        className="border-2 border-violet-600/50 rounded-2xl p-2" type="file" />
                    <MyButton
                        onClick={handleUpload}>Upload</MyButton>
                </div>
            }

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
                            {
                                media && media.map((media, index) => (
                                    <tr key={index} className="hover:bg-gray-700">
                                        <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                        <td className="px-4 py-2 border-b border-gray-600">{media.key}</td>
                                        <td className="px-4 py-2 border-b border-gray-600">{media.title}</td>
                                        <td className="px-4 py-2 border-b border-gray-600">{media.content}</td>
                                        <td className="px-4 py-2 border-b border-gray-600">{media.time}</td>
                                        {/* <td className="px-4 py-2 border-b border-gray-600">{media.status}</td> */}
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
                                ))
                            }

                        </>

                    </tbody>

                </table>

            </div>




        </div>
    )
}

export default Media

