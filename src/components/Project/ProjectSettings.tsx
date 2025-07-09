import React from 'react'

const ProjectSettings = () => {
    return (
        <div className="min-h-screen bg-[#0d0d16] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#121225] p-6 text-sm border-r border-gray-700">
                <h2 className="text-lg font-semibold mb-4">General settings</h2>
                <ul className="space-y-3">
                    <li className="text-green-400 font-semibold">Project details</li>
                    <li className="text-gray-300 hover:text-white cursor-pointer">Activity feed</li>
                    <li className="text-gray-300 hover:text-white cursor-pointer">Configure Log Delivery</li>
                </ul>

                <h2 className="text-lg font-semibold mt-8 mb-4">API settings</h2>

                <h2 className="text-lg font-semibold mt-8 mb-4 text-red-400">Danger zone</h2>
                <ul className="space-y-3 text-red-400">
                    <li className="hover:text-red-300 cursor-pointer">Transfer ownership</li>
                    <li className="hover:text-red-300 cursor-pointer">Archive project</li>
                    <li className="hover:text-red-300 cursor-pointer">Delete project</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-8">General settings</h1>

                {/* Project Details */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-2">Project details</h2>
                    <p className="text-gray-400 mb-4">Key details about your project.</p>
                    <label className="block text-sm mb-1">Name</label>
                    <p className="text-gray-400 text-sm mb-1">The project name is used to identify the project within Sanity.</p>
                    <div className="flex items-center border border-gray-700 rounded px-3 py-2 mt-2 w-full max-w-md">
                        <input
                            type="text"
                            value="GOStore"
                            readOnly
                            className="bg-transparent w-full text-white outline-none"
                        />
                        <span className="ml-2 text-gray-500 cursor-pointer hover:text-gray-300">✏️</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Activity feed</h2>
                    <p className="text-gray-400 mb-4">
                        Find out what’s happening in your project.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm">
                        Disable activity feed
                    </button>
                </div>
            </main>
        </div>
    )
}

export default ProjectSettings
