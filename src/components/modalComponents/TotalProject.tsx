"use client"

import getAllProjects from '@/lib/getAllProjects'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import { Project } from '../../../types'

const TotalProject = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const getToken = localStorage.getItem("token")
        setToken(getToken)
    }, [])
    const query = useQuery({
        queryKey: ['total_projects'],
        queryFn: () => getAllProjects(),
        enabled: !!token
    })
    useEffect(() => {
        if (query.data) {
            setProjects(query.data)
        }
    }, [query.data])
    return (
        <div className="p-4  ">
            <div>
                <Link href="/dashboard">
                    <span>
                        <AiFillCaretLeft className=' hover:text-violet-300 text-4xl hover:scale-90 hover:cursor-pointer' />

                    </span>
                </Link>

                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>


            </div>

            <div className="w-full overflow-auto rounded-lg border border-gray-300">
                <table className="min-w-full table-auto text-left">
                    <thead className="">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Project Name</th>
                            <th className="px-4 py-2 font-semibold">Collection Name</th>
                            <th className="px-4 py-2 font-semibold">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((item, index) => (
                                <tr key={index} className="border-t ">
                                    <td className="px-4 py-2">{item.title}</td>
                                    <td className="px-4 py-2">{item.collection_id}</td>
                                    <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                                    No Projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TotalProject
