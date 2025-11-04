"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import axios from 'axios'


const ProjectShowCase = () => {
    const params = useParams()
    const p_id = params.p_id
    const [project, setProject] = useState()
    console.log("project id: ", p_id)
    const col_id = params.col_id


    // fetch project
    const fetchProject = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/readProjectWithId/${p_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const record = await res.data
            setProject(record)
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])
    console.log("project: ", project)
    const date = new Date(project?.time)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    let tagsArr = []
    if (project?.tags) {
        tagsArr = project.tags.split(",")
    }
    return (
        <div>

            <div>
                <section className="p-8 bg-[#0b0b0e] text-gray-100 min-h-screen">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            {project ? project.title.toUpperCase() : ""}
                        </h1>
                        <Link href={`/dashboard/project/${col_id}`} className="text-sm text-purple-400 hover:underline">← Back to Overview</Link>
                    </div>

                    <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg mb-8">
                        <h1 className="text-gray-300 mb-3 text-xl font-semibold">
                            - {project ? project.description : ""}
                        </h1>
                        <div className="text-sm text-gray-400 space-y-1">
                            <p><strong>Created On:</strong>{formattedDate}</p>
                            <p><strong>Project ID:</strong> {p_id}</p>
                            <p><strong>Organization ID:</strong>{col_id}</p>

                            <div className='flex flex-row gap-2'>
                                <p><strong>Tags:</strong></p>
                                {tagsArr && tagsArr.map((tag: string, i: number) => (
                                    <h2 className='py-1 px-2 rounded-2xl bg-violet-500/50 text-white' key={i}> {tag}</h2>
                                ))}
                            </div>

                            <p><strong>API Endpoint:</strong> <code className="bg-[#1a0f24] px-2 py-1 rounded text-purple-300">https://api.jino.io/projects/4s3wn7gi</code></p>
                        </div>
                    </div>


                    <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-purple-300 mb-4">📂 Uploaded Files</h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                                <p className="font-medium text-purple-200 mb-1">preview.png</p>
                                <p className="text-xs text-gray-500">Image • 1.2 MB</p>
                                <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">View</Link>
                            </div>

                            <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                                <p className="font-medium text-purple-200 mb-1">index.html</p>
                                <p className="text-xs text-gray-500">HTML File • 3 KB</p>
                                <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">Open</Link>
                            </div>

                            <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                                <p className="font-medium text-purple-200 mb-1">project.zip</p>
                                <p className="text-xs text-gray-500">Archive • 8.4 MB</p>
                                <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">Download</Link>
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-purple-300 mb-3">📈 Project Analytics</h2>
                        <p className="text-gray-400 text-sm">API Requests: 0 / 250k | Bandwidth Used: 0 B / 100 GB | Datasets: 1 / 2</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProjectShowCase
