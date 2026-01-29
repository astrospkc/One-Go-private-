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
    Image as ImageIcon,
    Sparkles,
    Search,
    Wand2,
    Check,
    Globe
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
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { user, token } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false);
    const { collection, setCollection } = useCollectionStore()
    const { project, setProject } = useProjectStore()
    const { setPlan, setIsActive, setSubscriptionData, plan } = usePaymentStore()
    const router = useRouter()

    // Portfolio Generation State
    const [portfolioMode, setPortfolioMode] = useState<'all' | 'specific'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');

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

    useEffect(() => {
        if (collectionData) setCollection(collectionData);
    }, [collectionData, setCollection]);

    useEffect(() => {
        if (projectData) setProject(projectData);
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
        }
    }

    // Filter collections for portfolio generation
    const filteredCollections = collection?.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans py-12 px-6 md:px-12 selection:bg-indigo-200/50">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* --- 1. Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-900/5 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                                Dashboard
                            </h1>
                            {plan && (
                                <span className="px-3 py-1 text-xs font-bold bg-white/50 backdrop-blur-sm text-indigo-700 rounded-full border border-white/40 uppercase tracking-wide shadow-sm">
                                    {plan} Plan
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 text-lg">
                            Welcome back, <span className="text-indigo-600 font-bold">{user?.name ? user.name : 'Unknown User'}</span>
                        </p>
                    </div>
                </div>

                {/* --- 2. Overview Stats --- */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" /> Overview
                    </h2>
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
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-emerald-600" /> Your Workspace
                    </h2>

                    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl shadow-gray-100/50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Content Collections</h3>
                                <p className="text-gray-500 max-w-xl">
                                    Manage your content schemas and data. All your collections for blogs, products, and portfolios live here.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center gap-2"
                                >
                                    <Plus size={18} /> New Collection
                                </button>
                                <Link href="/dashboard/collections">
                                    <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
                                        View All <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Recent Collections Grid could go here */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {collection?.slice(0, 3).map((col: any) => (
                                <div key={col.id} className="p-4 rounded-2xl bg-white/60 border border-white/60 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                            <FolderOpen size={18} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 truncate">{col.title}</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 pl-11">{col.description || 'No description provided.'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* --- 4. Portfolio & AI Generator Section --- */}
                <div>
                    <h2 className="text-xl font-bold  bg-green-800/50 text-white p-2 rounded-xl w-fit text-gray-900 mb-6 flex items-center gap-2">
                        Launching feature soon
                    </h2>
                </div>
                <section className="grid lg:grid-cols-2 gap-8">

                    {/* Portfolio Generator */}
                    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl shadow-indigo-100/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-white/80 rounded-xl shadow-sm text-indigo-600">
                                    <Globe size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Portfolio Generator</h3>
                            </div>

                            <p className="text-gray-600 mb-6 text-sm">
                                Create a stunning portfolio website from your collections in seconds.
                            </p>

                            <div className="space-y-6">
                                {/* Mode Selection */}
                                <div className="flex p-1 bg-white/50 rounded-xl border border-white/60">
                                    <button
                                        onClick={() => setPortfolioMode('all')}
                                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${portfolioMode === 'all' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
                                    >
                                        All Collections
                                    </button>
                                    <button
                                        onClick={() => setPortfolioMode('specific')}
                                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${portfolioMode === 'specific' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
                                    >
                                        Choose Collection
                                    </button>
                                </div>

                                {/* Specific Collection Selection */}
                                <AnimatePresence mode="wait">
                                    {portfolioMode === 'specific' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-3"
                                        >
                                            <div className="relative">
                                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search collections..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                                                />
                                            </div>

                                            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                                {filteredCollections.map(col => (
                                                    <div
                                                        key={col.id}
                                                        onClick={() => setSelectedCollectionId(col.id)}
                                                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedCollectionId === col.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white/30 border-white/40 hover:bg-white/60'}`}
                                                    >
                                                        <span className="text-sm font-medium text-gray-700 truncate">{col.title}</span>
                                                        {selectedCollectionId === col.id && <Check className="w-4 h-4 text-indigo-600" />}
                                                    </div>
                                                ))}
                                                {filteredCollections.length === 0 && (
                                                    <p className="text-center text-xs text-gray-400 py-4">No collections found.</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg shadow-gray-900/20 hover:bg-black hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                    <Wand2 className="w-4 h-4" />
                                    Generate Portfolio
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* AI Prompt Writer */}
                    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl shadow-purple-100/40 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-white/80 rounded-xl shadow-sm text-purple-600">
                                    <Pencil size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">AI Writer</h3>
                            </div>

                            <p className="text-gray-600 mb-6 text-sm">
                                Draft content for your blogs or project descriptions using our advanced AI.
                            </p>

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe what you want to write about..."
                                className="w-full flex-1 p-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none text-sm min-h-[160px] mb-4"
                            />

                            <div className="flex justify-end">
                                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 hover:bg-purple-700 hover:scale-[1.02] transition-all flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Generate Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </section>



                <CreateCollectionModal open={isOpen} onClose={() => setIsOpen(false)} token={token} />
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, loading, onClick }: { title: string, value: number, icon: React.ReactNode, loading?: boolean, onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-sm z-10
                hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 
                flex flex-col justify-between h-32 relative overflow-hidden group
                ${onClick ? 'cursor-pointer' : ''}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
                <div className="p-2 bg-white/60 rounded-xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
            </div>

            {loading ? (
                <div className="h-8 w-16 bg-gray-200/50 animate-pulse rounded-lg relative z-10" />
            ) : (
                <div className="text-3xl font-black text-gray-900 relative z-10">{value}</div>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20 rounded-3xl p-8 w-full max-w-md text-black animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">New Collection</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        {/* Close Icon could go here */}
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wide">Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Blog Posts"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What is this collection for?"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-sm shadow-lg shadow-gray-900/20 transition-all hover:scale-[1.02]"
                    >
                        Create Collection
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard
