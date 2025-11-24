"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import projectService, { ProjectPayload } from '@/services/projectService'



const ProjectShowCase = () => {
    const params = useParams()
    const project_id = Array.isArray(params.p_id) ? params.p_id[0] : params.p_id
    const [project, setProject] = useState<ProjectPayload | null>(null)
    console.log("project id: ", project_id)
    const col_id = params.col_id


    // fetch project
    const fetchProject = async () => {
        try {
            const res = await projectService.readProject(project_id ? project_id : "")
            const { data, code } = res
            setProject(data)
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])
    console.log("project: ", project)
    const date = project?.created_at ? new Date(project.created_at) : new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    let tagsArr: string[] = []
    if (project?.tags) {
        tagsArr = project.tags.split(",")
    }
    console.log(project?.title)
    return (
        <div>

            <div>
                <section className="p-8 bg-[#0b0b0e] text-gray-100 min-h-screen">
                    {project &&
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-6xl text-transparent  font-bold  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                    {project.title.toUpperCase()}
                                </h1>
                                <Link href={`/dashboard/project/${col_id}`} className="text-sm text-purple-400 hover:underline">← Back to Overview</Link>
                            </div>
                            <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg mb-8">
                                <h1 className="text-gray-300 mb-3 text-xl font-semibold">
                                    - {project ? project.description : ""}
                                </h1>
                                <div className="text-sm text-gray-400 space-y-1">
                                    <p><strong>Created On:</strong>{formattedDate}</p>
                                    <p><strong>Project ID:</strong> {project_id}</p>
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
                                {
                                    project.fileUpload && project.fileUpload.length > 0 && (
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                                                <p className="font-medium text-purple-200 mb-1">preview.png</p>
                                                <p className="text-xs text-gray-500">Image • 1.2 MB</p>
                                                <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">View</Link>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </>
                    }

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
