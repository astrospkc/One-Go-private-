"use client"
import { useParams, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { RocketIcon, LayoutGrid, Activity, BarChart2, Zap, Settings, Copy, Check } from 'lucide-react';
import ProjectOverview from '@/components/Project/ProjectOverview';
import ProjectAPI from '@/components/Project/ProjectAPI';
import ProjectActivity from '@/components/Project/ProjectActivity';
import ProjectUsage from '@/components/Project/ProjectUsage';
import ProjectSettings from '@/components/Project/ProjectSettings';
import ProjectPlan from '@/components/Project/ProjectPlan';
import ProjectGettingStarted from '@/components/Project/ProjectGettingStarted';
import { useAuthStore } from '@/store/authStore';
import useProjectStore from '@/store/projectStore';
import projectService from '@/services/projectService';
import { collectionService } from '@/services/collectionService';
import { SingleCollection } from '../../../../../types';


type TopNavigationProps = {
    col_id: string;
};



const TopNavigation = ({ col_id }: TopNavigationProps) => {
    const tabs = [
        { label: "Getting started", icon: <RocketIcon className="w-4 h-4" />, active: true },
        { label: "Overview", icon: <LayoutGrid className="w-4 h-4" />, component: <ProjectOverview col_id={col_id} /> },

        { label: "API", icon: <Zap className="w-4 h-4 rotate-45" />, component: <ProjectAPI /> },

        { label: "Activity", icon: <Activity className="w-4 h-4" />, component: <ProjectActivity /> },
        { label: "Usage", icon: <BarChart2 className="w-4 h-4" />, component: <ProjectUsage /> },
        { label: "Plan", icon: <Zap className="w-4 h-4" />, component: <ProjectPlan /> },
        { label: "Settings", icon: <Settings className="w-4 h-4" />, component: <ProjectSettings />, button: true },
    ];
    const [activeTab, setActiveTab] = useState("Getting started");


    return (
        <div className="flex flex-col h-full bg-white">
            <div className="w-full px-6 py-4 flex items-center gap-2 overflow-x-auto border-b border-gray-100 bg-white sticky top-0 z-10">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.label;

                    if (tab.button) {
                        return (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`
                                    ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                                    ${isActive
                                        ? "bg-black text-white hover:bg-gray-800"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
                                `}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                                ${isActive
                                    ? "bg-black text-white shadow-md shadow-gray-200"
                                    : "text-gray-500 hover:text-black hover:bg-gray-50"
                                }
                            `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Conditional content rendering */}
            <div className='flex-1 overflow-y-auto bg-white p-6'>
                {
                    activeTab === "Getting started" ? <ProjectGettingStarted col_id={col_id as string} />
                        : activeTab === "Overview" ? <ProjectOverview col_id={col_id as string} />
                            : activeTab === "API" ? <ProjectAPI />
                                : activeTab === "Activity" ? <ProjectActivity />
                                    : activeTab === "Usage" ? <ProjectUsage />
                                        : activeTab === "Plan" ? <ProjectPlan />
                                            : activeTab === "Settings" ? <ProjectSettings />
                                                : <div className="text-gray-500 p-4">Tab not found</div>
                }
            </div>

        </div>
    );

}

const Project = () => {
    const { user } = useAuthStore()
    const params = useParams()
    const col_id = params.col_id
    const searchParams = useSearchParams()
    const title = searchParams.get('title')
    const { setProject } = useProjectStore()
    const [collectionData, setCollectionData] = useState<SingleCollection | null>(null)
    const { token } = useAuthStore()
    const [copied, setCopied] = useState(false)
    // console.log("title: ", title)

    // get the collection with id
    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await collectionService.getCollectionById(col_id as string, token)
                const { collection, code } = response
                if (code !== 200) return
                setCollectionData(collection)
            } catch (error) {
                console.error("Error fetching collection:", error);
            }
        }
        fetchCollection()
    }, [col_id, token])

    // get all the projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // const token = localStorage.getItem('token')
                const response = await projectService.getAllProjectOfCollectionId(col_id as string, token)
                const { data, code } = response
                if (code !== 200) return
                setProject(data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects()
    }, [setProject, col_id, token])

    const handleCopy = () => {
        if (collectionData?.id) {
            navigator.clipboard.writeText(collectionData.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }


    return (
        <div className='flex flex-col min-h-screen bg-white text-black font-sans selection:bg-indigo-100'>
            <div className='flex flex-col h-full'>
                {collectionData && (
                    <>
                        {/* Header Section */}
                        <div className="bg-white border-b border-gray-100 px-6 py-8">
                            <div className="max-w-7xl mx-auto flex items-start gap-6">
                                {/* Logo Circle */}
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center text-3xl font-bold text-white shrink-0">
                                    {collectionData?.title?.slice(0, 1).toUpperCase()}
                                </div>

                                {/* Text Info */}
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                                            <span>{user?.name || "User"}</span>
                                            <span className="text-gray-300">/</span>
                                            <span>Collection</span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{collectionData.title}</h1>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        {/* Status */}
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                            Active
                                        </span>

                                        {/* Plan */}
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                            Growth Plan
                                        </span>

                                        <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                                        {/* Collection ID */}
                                        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer" onClick={handleCopy}>
                                            <span className="font-medium text-xs uppercase tracking-wide">ID</span>
                                            <span className="font-mono text-gray-700">{collectionData.id}</span>
                                            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-gray-400 group-hover:text-black" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation & Content */}
                        <div className="flex-1 max-w-7xl mx-auto w-full">
                            <TopNavigation col_id={col_id as string} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Project
