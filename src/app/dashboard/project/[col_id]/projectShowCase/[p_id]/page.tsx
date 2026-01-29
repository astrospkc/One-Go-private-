"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import projectService from '@/services/projectService'
import { Trash2Icon, FileText, Download, Eye, ArrowLeft, Activity, Calendar, Tag, Database, Globe } from 'lucide-react'
import { Project } from '../../../../../../../types'
import { useAuthStore } from '@/store/authStore'

const ProjectShowCase = () => {
    const params = useParams()
    const project_id = Array.isArray(params.p_id) ? params.p_id[0] : params.p_id
    const [projectData, setProjectData] = useState<Project | null>(null)
    const col_id = params.col_id
    const { token } = useAuthStore()

    // fetch project
    const fetchProject = async () => {
        try {
            const res = await projectService.readProject(project_id ? project_id : "", token)
            const { data } = res
            setProjectData(data)
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    }

    useEffect(() => {
        fetchProject()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project_id, token])

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
        try {
            const res = await projectService.deleteFile(id, file, token)
            const { message, code } = res
            // refetch the projectData with the project id  and update the projectData state
            if (code === 200) {
                fetchProject()
            } else {
                alert(message)
            }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }

    const handleViewFile = async () => {
        // Implementation for viewing file
    }

    const handleDownloadFile = async () => {
        // Implementation for downloading file
    }

    if (!projectData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="mb-10">
                    <Link
                        href={`/dashboard/project/${col_id}`}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Overview
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            {projectData.title.toUpperCase()}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                                Active
                            </span>
                            <span className="text-sm text-gray-500">
                                ID: {project_id}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details & Analytics */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Project Details Card */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Database className="w-5 h-5 text-indigo-500" />
                                Project Details
                            </h2>

                            <div className="prose prose-gray max-w-none mb-8">
                                <p className="text-gray-600 leading-relaxed">
                                    {projectData.description}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Created On</p>
                                            <p className="text-gray-500">{formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-semibold text-gray-900">API Endpoint</p>
                                            <code className="block mt-1 bg-gray-50 px-3 py-2 rounded-lg text-xs text-indigo-600 font-mono break-all border border-gray-200">
                                                https://api.jino.io/projects/4s3wn7gi
                                            </code>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-3">
                                        <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-2">Tags</p>
                                            <div className="flex flex-wrap gap-2">
                                                {tagsArr.length > 0 ? tagsArr.map((tag, i) => (
                                                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100">
                                                        {tag}
                                                    </span>
                                                )) : <span className="text-gray-400 italic">No tags</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Files Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-500" />
                                    Uploaded Files
                                </h2>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                                    {projectData.fileUpload?.length || 0} files
                                </span>
                            </div>

                            {projectData.fileUpload && projectData.fileUpload.length > 0 ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {projectData.fileUpload.map((file, i) => (
                                        <div key={i} className="group relative bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <button
                                                    onClick={() => projectData.id && handleDeleteFile(projectData.id, file)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete file"
                                                >
                                                    <Trash2Icon className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <h3 className="font-medium text-gray-900 truncate mb-4" title={file}>
                                                {file}
                                            </h3>

                                            <div className="flex gap-2 pt-2 border-t border-gray-100">
                                                <button
                                                    onClick={handleViewFile}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> View
                                                </button>
                                                <button
                                                    onClick={handleDownloadFile}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                                                >
                                                    <Download className="w-3.5 h-3.5" /> Download
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <div className="mx-auto w-12 h-12 text-gray-300 mb-3 bg-white rounded-full flex items-center justify-center">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <p className="text-gray-500 mb-1">No files uploaded yet</p>
                                    <p className="text-xs text-gray-400">Upload documents to see them here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Analytics & Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                Analytics
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-medium text-gray-500">API Requests</span>
                                        <span className="text-sm font-bold text-gray-900">0 / 250k</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-indigo-500 h-2 rounded-full w-0" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-medium text-gray-500">Bandwidth</span>
                                        <span className="text-sm font-bold text-gray-900">0 / 100 GB</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-emerald-500 h-2 rounded-full w-0" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Datasets</span>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">1 / 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 bg-indigo-500 opacity-20 rounded-full blur-xl"></div>

                            <h3 className="font-bold text-lg mb-2 relative z-10">Pro Tip</h3>
                            <p className="text-indigo-200 text-sm leading-relaxed relative z-10">
                                Use the API endpoint to integrate this project's data directly into your frontend applications. Read the docs for more info.
                            </p>
                            <Link href="/dashboard/apiDocumentation">
                                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                    View API Docs
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectShowCase
