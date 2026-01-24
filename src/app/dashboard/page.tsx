"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import {
    Pencil,
    LayoutDashboard,
    Plus,
    ArrowRight,
    FolderOpen,
    Layers,
    Link as LinkIcon,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link"
import useCollectionStore from "@/store/collectionStore"
import useProjectStore from "@/store/projectStore"
import { useAuthStore } from "@/store/authStore"
import { useQuery } from "@tanstack/react-query"
import { collectionService } from "@/services/collectionService"
import projectService from "@/services/projectService"
import { usePaymentStore } from "@/store/paymentStore";
import { paymentService } from "@/services/paymentService";


const Dashboard = () => {

    const { user, token } = useAuthStore()

    const [isOpen, setIsOpen] = useState(false);
    const { collection, setCollection } = useCollectionStore()
    const { project, setProject } = useProjectStore()
    const [sectionSelected, setSectionSelected] = useState('collection')
    const { setPlan, setIsActive, setSubscriptionData, plan } = usePaymentStore()
    const router = useRouter()
    console.log("section selected: ", sectionSelected)

    // get the active plan of user
    useEffect(() => {
        const getActiveSubscription = async () => {
            try {
                const res = await paymentService.getActiveSubscription(token)
                const { plan, status, data } = res
                setPlan(plan)
                setIsActive(status)
                setSubscriptionData(data)
            } catch (error) {
                console.error(error)
            }
        }
        if (token) getActiveSubscription()
    }, [token, setPlan, setIsActive, setSubscriptionData])


    const { error: collectionError, data: collectionData, isPending: isCollectionPending } = useQuery({
        queryKey: ["collectionList"],
        queryFn: async () => {
            const response = await collectionService.getAllCollection(token)
            return response.collections
        },
        enabled: !!token
    })

    const { error: projectError, data: projectData, isPending: isProjectPending } = useQuery({
        queryKey: ["projectList"],
        queryFn: async () => {
            const response = await projectService.getAllProjects(token)
            return response.data
        },
        enabled: !!token
    })

    if (collectionError) {
        console.error(collectionError)
    }

    if (projectError) {
        console.error(projectError)
    }

    useEffect(() => {
        if (collectionData) {
            setCollection(collectionData);
        }

    }, [collectionData, setCollection]);

    useEffect(() => {
        if (projectData) {
            setProject(projectData);
        }
    }, [projectData, setProject]);

    const totalCollection = collection ? collection.length : 0
    const totalProjects = project ? project.length : 0


    const handleSection = (type: string) => {
        switch (type) {
            case "collection":
                router.push('/dashboard/sectionPages/TotalCollection')
                break;
            case "project":
                router.push('/dashboard/sectionPages/TotalProject')
                break;
            case "blog":
                setSectionSelected('blog')
                break;
            case "media":
                setSectionSelected('media')
                break;
        }
    }

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans py-12 px-6 md:px-12 selection:bg-indigo-100">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* --- 1. Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-100 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                                Dashboard
                            </h1>
                            {plan && (
                                <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase tracking-wide">
                                    {plan} Plan
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 text-lg">
                            Welcome back, <span className="text-indigo-600 font-semibold">{user?.name ? user.name : 'Unknown User'}</span>
                        </p>
                    </div>
                </div>

                {/* --- 2. Overview Stats --- */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Collections"
                            value={totalCollection}
                            loading={isCollectionPending}
                            icon={<FolderOpen className="w-5 h-5 text-indigo-600" />}
                            onClick={() => handleSection('collection')}
                        />
                        <StatCard
                            title="Total Projects"
                            value={totalProjects}
                            loading={isProjectPending}
                            icon={<Layers className="w-5 h-5 text-emerald-600" />}
                            onClick={() => handleSection('project')}
                        />
                        <StatCard
                            title="Total Links"
                            value={43}
                            icon={<LinkIcon className="w-5 h-5 text-blue-600" />}
                        />
                        <StatCard
                            title="Total Media"
                            value={43}
                            icon={<ImageIcon className="w-5 h-5 text-pink-600" />}
                        />
                    </div>
                </section>

                {/* --- 3. Workspace / Actions --- */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Workspace</h2>
                    <div className="grid md:grid-cols-12 gap-8">

                        {/* Canvas Action Card */}
                        <div className="md:col-span-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all group flex flex-col justify-between h-auto min-h-[300px]">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                                        <Pencil size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold">Canvas</h3>
                                </div>
                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    Use our AI-assisted writing tool to draft content faster. Perfect for blogs, documentation, and creative writing.
                                </p>
                            </div>
                            <div className="bg-white border rounded-xl p-4 text-center text-sm text-gray-400 border-dashed h-32 flex items-center justify-center">
                                Draft Preview
                            </div>
                        </div>

                        {/* Collections Management Card */}
                        <div className="md:col-span-7 bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all group flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                        <LayoutDashboard size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold">Content Collections</h3>
                                </div>
                                {/* <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">5 Active</span> */}
                            </div>

                            <p className="text-gray-500 mb-8 max-w-lg">
                                Define your content structure. Create schemas for blogs, products, or portfolios and manage them easily.
                            </p>

                            <div className="mt-auto grid sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleClick}
                                    className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-sm"
                                >
                                    <Plus size={18} /> Create New
                                </button>
                                <CreateCollectionModal open={isOpen} onClose={handleClose} token={token} />

                                <Link href="/dashboard/collections" className="w-full">
                                    <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all group-hover:border-gray-300">
                                        View All <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, loading, onClick }: { title: string, value: number, icon: React.ReactNode, loading?: boolean, onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white border border-gray-100 p-6 rounded-2xl shadow-sm 
                hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all duration-200 
                flex flex-col justify-between h-32
                ${onClick ? 'cursor-pointer group' : ''}
            `}
        >
            <div className="flex items-start justify-between">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</span>
                <div className="opacity-80 group-hover:scale-110 transition-transform">{icon}</div>
            </div>

            {loading ? (
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded" />
            ) : (
                <div className="text-3xl font-bold text-gray-900">{value}</div>
            )}
        </div>
    )
}

function CreateCollectionModal({ open, onClose, token }: { open: boolean, onClose: () => void, token: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { collection, setCollection } = useCollectionStore()
    const router = useRouter()

    if (!open) return null;
    const handleCreate = async () => {
        const payload = {
            Title: title,
            Description: description
        }
        const createdCollection = await collectionService.createCollection(payload, token)
        setCollection([...collection, createdCollection])
        onClose()
        router.push("/dashboard/collections")
    }


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-8 w-full max-w-md text-black animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Collection</h2>

                <label className="block mb-2 text-sm font-medium text-gray-700">Collection Name</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Blog Posts"
                    className="w-full px-4 py-3 mb-6 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this collection for?"
                    className="w-full px-4 py-3 mb-8 bg-gray-50 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
                    >
                        Create Collection
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard
