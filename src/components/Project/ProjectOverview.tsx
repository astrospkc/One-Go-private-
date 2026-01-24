"use client"

import ProjectUsage from './ProjectUsage'
import ProjectActivity from './ProjectActivity'

import Link from 'next/link'
import { Project } from "../../../types"
import useProjectStore from '@/store/projectStore'
import { ExternalLink, Calendar, Tag } from 'lucide-react'

const ProjectOverview = ({ col_id }: { col_id: string }) => {

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Project list */}
            <div>
                <ProjectList col_id={col_id} />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='flex-1'><ProjectUsage /></div>
                <div className='flex-1'><ProjectActivity /></div>
            </div>
        </div>
    )
}

export default ProjectOverview


const ProjectList = ({ col_id }: { col_id: string }) => {

    const { project } = useProjectStore()

    return (
        <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Your Projects
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and View your projects within this collection</p>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{project?.length || 0} Projects</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project &&
                    project.map((p: Project, index: number) => {
                        const date = new Date(p.created_at)
                        const formattedDate = date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
                        const tagsArr = p.tags?.split(",")
                        return (
                            <Link key={index} href={`/dashboard/project/${col_id}/projectShowCase/${p.id}`}
                                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                                <div className="relative">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                            {p.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                        <Calendar className="w-3 h-3" />
                                        <span>{formattedDate}</span>
                                    </div>

                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10 leading-relaxed">
                                        {p.description || "No description provided."}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {
                                            tagsArr && tagsArr.slice(0, 3).map((tag: string, index: number) => {
                                                return (
                                                    <span key={index} className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-100 text-xs rounded-md font-medium flex items-center gap-1">
                                                        <Tag className="w-3 h-3" />
                                                        {tag.trim()}
                                                    </span>
                                                )
                                            })
                                        }
                                        {tagsArr && tagsArr.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md font-medium">+{tagsArr.length - 3}</span>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-50 pt-4 flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:underline">
                                            View Details
                                        </div>
                                        {p.livedemolink && (
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(p.livedemolink, '_blank');
                                                }}
                                                className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer z-10"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                {(!project || project.length === 0) && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                        <p className="text-gray-500 font-medium">No projects found in this collection yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Get started by creating your first project.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
