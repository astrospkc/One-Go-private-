import Link from 'next/link'
import React from 'react'

const ProjectDetailsPage = () => {
    return (
        <div>
            <section className="p-8 bg-[#0b0b0e] text-gray-100 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Portfolio Project
                    </h1>
                    <Link href="/overview" className="text-sm text-purple-400 hover:underline">← Back to Overview</Link>
                </div>

                <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg mb-8">
                    <p className="text-gray-300 mb-3">
                        A dynamic CMS where developers can upload, manage, and showcase their portfolio projects through an integrated API.
                    </p>
                    <div className="text-sm text-gray-400 space-y-1">
                        <p><strong>Created On:</strong> Jul 8, 2025</p>
                        <p><strong>Project ID:</strong> 4s3wn7gi</p>
                        <p><strong>Organization ID:</strong> opCMmUbeG</p>
                        <p><strong>Tags:</strong> Next.js, MongoDB, Tailwind, Node.js</p>
                        <p><strong>API Endpoint:</strong> <code className="bg-[#1a0f24] px-2 py-1 rounded text-purple-300">https://api.jino.io/projects/4s3wn7gi</code></p>
                    </div>
                </div>


                <div className="bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-4">📂 Uploaded Files</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                            <p className="font-medium text-purple-200 mb-1">preview.png</p>
                            <p className="text-xs text-gray-500">Image • 1.2 MB</p>
                            <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">View</Link>
                        </div>

                        <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                            <p className="font-medium text-purple-200 mb-1">index.html</p>
                            <p className="text-xs text-gray-500">HTML File • 3 KB</p>
                            <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">Open</Link>
                        </div>

                        <div className="bg-[#151022] border border-purple-900 rounded-xl p-4 hover:bg-[#1b1430] transition">
                            <p className="font-medium text-purple-200 mb-1">project.zip</p>
                            <p className="text-xs text-gray-500">Archive • 8.4 MB</p>
                            <Link href="#" className="text-xs text-purple-400 hover:underline mt-2 block">Download</Link>
                        </div>
                    </div>
                </div>


                <div className="mt-10 bg-[#111] border border-purple-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-3">📈 Project Analytics</h2>
                    <p className="text-gray-400 text-sm">API Requests: 0 / 250k | Bandwidth Used: 0 B / 100 GB | Datasets: 1 / 2</p>
                </div>
            </section>


        </div>
    )
}

export default ProjectDetailsPage
