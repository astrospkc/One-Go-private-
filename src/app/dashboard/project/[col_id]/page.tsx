"use client"
import { ModalContextapp } from '@/context/ModalProvider';
import { ProjectContext } from '@/context/ProjectProvider';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserProvider';
import { RocketIcon, LayoutGrid, Activity, BarChart2, Zap, Settings } from 'lucide-react';
import ProjectOverview from '@/components/Project/ProjectOverview';
import ProjectAPI from '@/components/Project/ProjectAPI';
import ProjectActivity from '@/components/Project/ProjectActivity';
import ProjectUsage from '@/components/Project/ProjectUsage';
import ProjectSettings from '@/components/Project/ProjectSettings';
import ProjectPlan from '@/components/Project/ProjectPlan';
import ProjectGettingStarted from '@/components/Project/ProjectGettingStarted';

type TopNavigationProps = {
    col_id: string;
};

const tabs = [
    { label: "Getting started", icon: <RocketIcon className="w-4 h-4" />, active: true },
    { label: "Overview", icon: <LayoutGrid className="w-4 h-4" />, component: <ProjectOverview /> },

    { label: "API", icon: <Zap className="w-4 h-4 rotate-45" />, component: <ProjectAPI /> },

    { label: "Activity", icon: <Activity className="w-4 h-4" />, component: <ProjectActivity /> },
    { label: "Usage", icon: <BarChart2 className="w-4 h-4" />, component: <ProjectUsage /> },
    { label: "Plan", icon: <Zap className="w-4 h-4" />, component: <ProjectPlan /> },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, component: <ProjectSettings />, button: true },
];


const TopNavigation = ({ col_id }: TopNavigationProps) => {
    const [activeTab, setActiveTab] = useState("Getting started");


    return (
        <div className="bg-[#0f0f12] w-full flex flex-col h-screen overflow-hidden">
            <div className="w-full px-6 py-2 flex items-center gap-4 overflow-x-auto justify-around">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.label;
                    const commonStyles = "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium";

                    return tab.button ? (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`${commonStyles} ${isActive ? "bg-indigo-900 text-white" : "text-gray-400 hover:text-white"}`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ) : (
                        <div
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`cursor-pointer flex items-center gap-1 text-sm font-medium ${isActive ? "text-green-400" : "text-gray-400 hover:text-white"}`}
                        >
                            {tab.icon}
                            {tab.label}
                        </div>
                    );
                })}
            </div>

            {/* Conditional content rendering */}
            <div className='h-full bg-black overflow-y-scroll'>
                {
                    activeTab === "Getting started" ? <ProjectGettingStarted col_id={col_id as string} />
                        : activeTab === "Overview" ? <ProjectOverview col_id={col_id as string} />
                            : activeTab === "API" ? <ProjectAPI />
                                : activeTab === "Activity" ? <ProjectActivity />
                                    : activeTab === "Usage" ? <ProjectUsage />
                                        : activeTab === "Plan" ? <ProjectPlan />
                                            : activeTab === "Settings" ? <ProjectSettings />
                                                : <div className="text-white p-4">Tab not found</div>
                }
            </div>

        </div>
    );

}

const Project = () => {

    const { user } = useContext(UserContext)
    const params = useParams()
    const col_id = params.col_id
    const searchParams = useSearchParams()
    const title = searchParams.get('title')
    console.log("title: ", title)
    const { setProjects } = useContext(ProjectContext)

    const [count, setCount] = useState(0);
    const { openProjectModal, setOpenProjectModal } = useContext(ModalContextapp)
    const handleClick = () => {
        setOpenProjectModal(!openProjectModal)
    }

    const handleCount = () => {
        setCount(count + 1)
    }
    const handleCountReverse = () => {
        setCount(count - 1)
    }
    // };

    // get all the projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getAllProject/${col_id}`, {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                const data = await response.data
                setProjects(data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects()
    }, [setProjects, col_id])



    return (
        <>
            <div
                style={{
                    background: 'radial-gradient(circle at center, #1a0c2b, #0e0618, #090417)',
                }}
                className='flex flex-col p-4 relative h-screen  '>

                <div className='text-white h-full  flex flex-col  font-serif '>

                    <div className="bg-[#0f0f12] text-white p-6 rounded-xl w-full max-w-full shadow-md">
                        <div className="flex items-start gap-6">
                            {/* Logo Circle */}
                            <div className="w-16 h-16 rounded-md bg-yellow-600 flex items-center justify-center text-3xl font-bold text-black">
                                {title?.slice(0, 1)}
                            </div>

                            {/* Text Info */}
                            <div className="flex-1">
                                <h1 className="text-lg text-gray-300">{user?.name.toUpperCase()}</h1>
                                <h2 className="text-2xl font-semibold text-white">{title}</h2>

                                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                    {/* Plan */}
                                    <div className="flex gap-1 items-center">
                                        <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-medium">Growth Trial</span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex gap-1 items-center">
                                        <span className="bg-green-700 text-white px-2 py-1 rounded-full text-xs font-medium">Active</span>
                                    </div>

                                    {/* Project ID */}
                                    <div className="flex gap-1 items-center text-gray-400">
                                        <span className="font-medium text-white">PROJECT ID</span>:
                                        <span className="font-mono">4s3wn7gi</span>
                                        <button title="Copy Project ID">
                                            📋
                                        </button>
                                    </div>

                                    {/* Organization ID */}
                                    <div className="flex gap-1 items-center text-gray-400">
                                        <span className="font-medium text-white">ORGANIZATION ID</span>:
                                        <span className="font-mono">opCMmUbeG</span>
                                        <button title="Copy Org ID">
                                            📋
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopNavigation col_id={col_id as string} />
                    {/* <ProjectSettings /> */}

                </div>
            </div >

        </>

    )
}

export default Project
