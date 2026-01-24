"use client"

import React, { useState } from 'react';

import Link from 'next/link';

import useCollectionStore from '@/store/collectionStore';
import { Trash2, Search, Clock, Folder, ArrowRight, LayoutGrid } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { collectionService } from '@/services/collectionService';

const Collection = () => {
    const { collection, setCollection } = useCollectionStore()
    const { token } = useAuthStore()
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null) // Stores ID of collection to delete
    const [searchQuery, setSearchQuery] = useState("")

    // Filter collections based on search
    const filteredCollections = collection?.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    console.log(filteredCollections)

    // Mock "Recent" logic - taking the first 3 for now
    const recentCollections = collection?.slice(0, 3) || [];

    const confirmDelete = (col_id: string) => {
        setShowDeleteModal(col_id)
    }

    const deleteCollection = async () => {
        if (!showDeleteModal) return;
        try {
            const response = await collectionService.deleteCollectionById(showDeleteModal, token)
            const { code } = response
            if (code === 200) {
                const fetchNewCollection = await collectionService.getAllCollection(token)
                const { collections, code } = fetchNewCollection
                if (code === 200) {
                    setCollection(collections)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setShowDeleteModal(null)
        }
    }
    console.log(collection)

    return (
        <div className="min-h-screen bg-white text-black font-sans py-8 px-6 md:px-12 selection:bg-indigo-100">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* --- Header & Search --- */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-gray-100">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Collections</h1>
                        <p className="text-gray-500">Manage your content structures and schemas.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all duration-200 sm:text-sm"
                            placeholder="Search collections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- Recent / Query Empty State --- */}
                {searchQuery === "" && recentCollections.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            <Clock className="w-4 h-4" /> Recent
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {recentCollections.map((val, ind) => (
                                <Link
                                    key={ind}
                                    href={{ pathname: `/dashboard/project/${val.id}`, query: { title: `${val.title.toUpperCase()}` } }}
                                    className="group block"
                                >
                                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl hover:shadow-md transition-all duration-200 h-full flex flex-col hover:border-indigo-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                <Folder className="w-5 h-5" />
                                            </div>
                                            <div className="p-1 rounded-full text-gray-300 group-hover:text-indigo-600 transition-colors">
                                                <ArrowRight className="w-5 h-5 -rotate-45" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{val.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{val.description || "No description provided."}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}


                {/* --- Main List --- */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            <LayoutGrid className="w-4 h-4" /> All Collections
                        </div>
                        <span className="text-sm text-gray-400 font-medium">{collection.length} items</span>
                    </div>

                    {collection.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {collection.map((val, ind) => (
                                <div
                                    key={val.id}
                                    className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 relative flex flex-col justify-between h-56"
                                >
                                    <Link
                                        href={{ pathname: `/dashboard/project/${val.id}`, query: { title: `${val.title.toUpperCase()}` } }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {val.title}
                                                </h2>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                                                {val.description || "No description."}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-xs text-gray-400 font-medium">
                                            <span>ID: {val.id.substring(0, 8)}...</span>
                                        </div>
                                    </Link>

                                    {/* Delete Action - Positioned absolute or nicely integrated */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); confirmDelete(val.id); }}
                                        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-10"
                                        title="Delete Collection"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No collections found</h3>
                            <p className="text-gray-500">Try adjusting your search query.</p>
                        </div>
                    )}
                </section>
            </div>

            {/* --- Delete Modal --- */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-gray-200 text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Collection?</h3>
                        <p className="text-gray-500 mb-8 text-sm">
                            Are you sure you want to delete this collection? This action cannot be undone.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteCollection}
                                className="px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collection;
