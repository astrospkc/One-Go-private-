"use client"
import React, { use, useEffect, useState } from 'react'
import ProjectUsage from './ProjectUsage'
import ProjectActivity from './ProjectActivity'
import axios from 'axios'
import Link from 'next/link'
import { Project } from "../../../types"
import useProjectStore from '@/store/projectStore'

const ProjectOverview = ({ col_id }: { col_id: string }) => {

    return (
        <div>
            <div className='flex flex-col'>
                {/* Project list */}
                <div>
                    <ProjectList col_id={col_id} />
                </div>
                <div className='flex flex-row'>
                    <div className='flex-1'><ProjectUsage /></div>
                    <div className='flex-1'><ProjectActivity /></div>
                </div>

            </div>
        </div>
    )
}

export default ProjectOverview


const ProjectList = ({ col_id }: { col_id: string }) => {

    const { project } = useProjectStore()

    return (
        <section className="p-8 bg-[#0b0b0e] text-gray-100">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
                📁 Your Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project &&
                    project.map((p: Project, index: number) => {
                        console.log(typeof p.created_at)
                        const date = new Date(p.created_at)
                        const formattedDate = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
                        const tagsArr = p.tags?.split(",")
                        return (
                            <Link key={index} href={`/dashboard/project/${col_id}/projectShowCase/${p.id}`}
                                className="group block bg-[#111] border border-purple-800 rounded-2xl p-5 hover:bg-[#161122] hover:shadow-[0_0_15px_rgba(155,55,255,0.2)] transition-all duration-300">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-purple-300 group-hover:text-pink-400 transition">
                                        {p.title}
                                    </h3>
                                    <span className="text-xs text-gray-500">Created on {formattedDate}</span>
                                </div>

                                <p className="text-gray-400 text-sm mb-3">
                                    {p.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {
                                        tagsArr && tagsArr.map((tag: string, index: number) => {
                                            return (
                                                <span key={index} className="px-3 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-full">{tag}</span>
                                            )
                                        })
                                    }
                                </div>

                                <div className="border-t border-purple-800/50 pt-3 text-sm text-gray-400">
                                    {/* <div>📎 <span className="text-purple-300">3</span> Files Uploaded</div> */}
                                    <div>🔗 <Link href={p.livedemolink ?? "#"} className="text-purple-400 hover:underline">Live Preview</Link></div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}



