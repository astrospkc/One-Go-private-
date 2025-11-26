"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import projectService from '@/services/projectService'
import { Trash2Icon } from 'lucide-react'
import { Project } from '../../../../../../../types'



const ProjectShowCase = () => {
    const params = useParams()
    const project_id = Array.isArray(params.p_id) ? params.p_id[0] : params.p_id
    const [projectData, setProjectData] = useState<Project | null>(null)
    console.log("project id: ", project_id)
    const col_id = params.col_id


    // fetch project
    const fetchProject = async () => {
        try {
            const res = await projectService.readProject(project_id ? project_id : "")
            const { data } = res
            setProjectData(data)
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    }

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await projectService.readProject(project_id ? project_id : "")
                const { data } = res
                setProjectData(data)
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        }
        fetchProject()
    }, [project_id])
    console.log("project: ", projectData)
    const date = projectData?.created_at ? new Date(projectData.created_at) : new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    let tagsArr: string[] = []
    if (projectData?.tags) {
        tagsArr = projectData.tags.split(",")
    }



    const handleDeleteFile = async (id: string, file: string) => {
        console.log("delete file")
        try {
            const res = await projectService.deleteFile(id, file)
            const { message, code } = res
            console.log("file deleted: ", message)
            // refetch the projectData with the project id  and update the projectData state
            if (code === 200) {
                fetchProject()
            } else {
                alert(message)
            }
        } catch (error) {
            console.log("Error deleting file", error)
        }
    }
    const handleViewFile = async () => {
        console.log("view file")
    }
    const handleDownloadFile = async () => {
        console.log("download file")
    }
    console.log(projectData?.title)
    console.log(projectData?.fileUpload?.map((file: string, i: number) => console.log(file, i)))
    return (
        <>

            <div className="p-8 bg-[#0b0b0e] text-gray-100 min-h-screen">
                {projectData &&
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-6xl text-transparent  font-bold  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                {projectData.title.toUpperCase()}
                            </h1>
                            <Link href={`/dashboard/project/${col_id}`} className="text-sm text-purple-400 hover:underline">← Back to Overview</Link>
                        </div>
                        <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg mb-8">
                            <h1 className="text-gray-300 mb-3 text-xl font-semibold">
                                - {projectData ? projectData.description : ""}
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


                        <div className="bg-[#111] border border-purple-800 rounded-2xl w-full p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-purple-300 mb-4">📂 Uploaded Files</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {
                                    projectData?.fileUpload && projectData.fileUpload.length > 0 &&
                                    projectData.fileUpload?.map((file: string, i: number) =>
                                    (

                                        <div key={i} className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                                            <p className="font-medium text-purple-200 mb-1">{file}</p>
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-row gap-2'>
                                                    <span onClick={handleViewFile} className="text-xs text-purple-400 hover:underline mt-2 block">View</span>
                                                    <span onClick={handleDownloadFile} className="text-xs text-purple-400 hover:underline mt-2 block">Download</span>
                                                </div>

                                                <span onClick={() => projectData?.id && handleDeleteFile(projectData.id, file)} className="text-xs text-purple-400 hover:underline mt-2 block cursor-pointer hover:text-white"><Trash2Icon /></span>
                                            </div>
                                        </div>

                                    )

                                    )
                                }
                            </div>


                        </div>
                    </>
                }

                <div className="mt-10 bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-3">📈 Project Analytics</h2>
                    <p className="text-gray-400 text-sm">API Requests: 0 / 250k | Bandwidth Used: 0 B / 100 GB | Datasets: 1 / 2</p>
                </div>
            </div>


        </>

    )
}

export default ProjectShowCase
