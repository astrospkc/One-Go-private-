"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import useCollectionStore from '@/store/collectionStore'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import baseUrl from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import { CollectionWithProjects } from '../../../types'


const TotalCollection = () => {
    const { collection } = useCollectionStore()
    const [collectionData, setCollectionData] = useState<CollectionWithProjects[]>([])
    const { token } = useAuthStore()
    const [showProjects, setShowProjects] = useState(false)

    // use react query here 
    const { data: col_data, isLoading: isCollectionLoading, error: collectionError } = useQuery({
        queryKey: ['collectionData'],
        queryFn: async () => {

            const res = await axios.get(`${baseUrl}/collection/with-projects`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const response = res.data;
            return response;
        }
    })

    useEffect(() => {
        if (col_data) {
            setCollectionData(col_data);
        }
    }, [col_data])

    if (collectionError) {
        return (
            <>
                <div>
                    Error loading collections: {collectionError.message}
                </div>
            </>
        )
    }


    return (
        <div className="p-4 flex flex-col  justify-center  ">
            <div className='flex flex-row gap-2  justify-start items-center '>
                <Link href="/dashboard">
                    <span className=''>
                        <AiFillCaretLeft className=' rounded-full p-2 bg-violet-500 hover:bg-violet-600 transition-colors duration-200 hover:text-violet-300 text-xl hover:scale-90 hover:cursor-pointer' />
                    </span>
                </Link>

                <h2 className="text-2xl font-bold mb-4">Collections Overview</h2>


            </div>

            <div className="w-full overflow-auto rounded-lg h-screen border-2 border-white ">
                <table className="min-w-full table-auto text-left  ">
                    <thead className="">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Collection Name</th>
                            <th className="px-4 py-2 font-semibold">No. of Projects</th>
                            <th className="px-4 py-2 font-semibold">Created At</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {collectionData && collectionData.length > 0 ? (
                            collectionData.map((item, index) => (
                                <tr key={index} className="border-t  ">
                                    <td className="px-4 py-2">{item.collection.title}</td>
                                    <td className="px-4 py-2  relative">
                                        <span className='hover:cursor-pointer hover:bg-violet-500 p-2 rounded transition-colors duration-200' onClick={() => setShowProjects(!showProjects)}>projects:{item.projects?.length ?? 0}</span>
                                        {showProjects && (
                                            <div className="absolute top-full z-10 left-0 mt-2 p-2 bg-gray-500  rounded shadow-lg">

                                                <div className='flex flex-col'>
                                                    {item.projects?.map((project, idx) => (
                                                        <div key={idx} className='text-white'>{idx + 1}: {project.title}</div>
                                                    ))}

                                                </div>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2">{new Date(item.collection.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                                    No collections found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TotalCollection
