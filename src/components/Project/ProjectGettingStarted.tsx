"use client"
import projectService from '@/services/projectService';
import useProjectStore from '@/store/projectStore';
import axios from 'axios'
import React, { useState } from 'react'
import { Project } from '../../../types';
import { useAuthStore } from '@/store/authStore';
import { UploadCloud, FileText, Check, Plus, X } from 'lucide-react';

type ProjectGettingStartedProps = {
    col_id: string;
};
type FileState = File[] | null

const ProjectGettingStarted = ({ col_id }: ProjectGettingStartedProps) => {

    // Form State
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [selectedFile, setSelectedFile] = useState<FileState>([])
    const [selectedFileNames, setSelectedFileNames] = useState<string[]>([])
    const [videoDemolink, setVideoDemoLink] = useState("")
    const [githublink, setGithubLink] = useState("")
    const [liveUrl, setLiveUrl] = useState("")
    const [blogLink, setBlogLink] = useState("")
    const [teamMembers, setTeamMembers] = useState("")

    // Logic State
    const [uploads, setUploads] = useState<{ file: File; name: string; presignedUrl?: string; nameKey?: string }[]>([])
    const [showForm, setShowForm] = useState(false)
    const { setProject } = useProjectStore()
    const { token } = useAuthStore()

    function extractObjectKey(url: string) {
        const urlObj = new URL(url);
        return urlObj.pathname.startsWith("/")
            ? urlObj.pathname.substring(1) // remove leading slash
            : urlObj.pathname;
    }

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files ? Array.from(e.target.files) : [];
            setSelectedFile(files)
            const uploadFiles = files.map((f) => ({
                file: f,
                name: f.name
            }))

            setUploads(uploadFiles)
            setSelectedFileNames(files.map((f) => f.name))

        } catch (error) {
            console.error("Error fetching presigned urls of files ", error)
        }
    }

    const handleAddFileUrls = async () => {
        try {
            if (selectedFileNames.length === 0) return;
            const urls = await projectService.getPresignedUrls(selectedFileNames, token)

            const updateUploads = uploads.map((item, index) => {
                const key = extractObjectKey(urls.urls[index])
                return ({
                    ...item,
                    presignedUrl: urls.urls[index],
                    nameKey: key
                })
            })
            setUploads(updateUploads)

            for (const item of updateUploads) {
                if (!item.presignedUrl) continue;
                await axios.put(item.presignedUrl, item.file, {
                    headers: {
                        "Content-Type": item.file.type,
                    }
                })
            }
            alert("Files uploaded successfully!")
        } catch (error) {
            console.error("Error fetching presigned urls of files ", error)
        }
    }

    const handleSubmit = async () => {
        try {
            const body = {
                title,
                description,
                tags,
                fileUpload: uploads.map(u => u.nameKey).filter((url): url is string => url !== undefined),
                githublink,
                demolink: videoDemolink,
                liveUrl,
                blogLink,
                teamMembers,
                collection_id: col_id
            }

            const res = await projectService.createProject(col_id, body, token)
            const { data } = res

            setProject(prev => {
                if (prev) return [...prev, data as Project];
                return [data as Project];
            });

            alert("Project created successfully")
            setShowForm(false)
            resetForm()

        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project")
        }
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setTags("")
        setSelectedFile([])
        setUploads([])
        setSelectedFileNames([])
        setGithubLink("")
        setLiveUrl("")
        setVideoDemoLink("")
        setBlogLink("")
        setTeamMembers("")
    }

    const handleDiscard = () => {
        resetForm()
        setShowForm(false)
    }

    return (
        <div className='max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>

            {/* Intro Section */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                    Start Building
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    You&apos;re just a few steps away from showcasing your work. Follow the guide below or jump straight into setting up your project.
                </p>
            </div>

            {/* Action Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
                {!showForm ? (
                    <div className="p-8 text-center bg-gray-50/50">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Create New Project</h2>
                        <p className="text-gray-500 mb-6">Ready to add a new project to this collection?</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 hover:-translate-y-1"
                        >
                            Set up Project
                        </button>
                    </div>
                ) : (
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
                            <button onClick={handleDiscard} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Basic Details */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Basic Info</h3>
                                <div className="grid gap-4">
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        type="text"
                                        placeholder='Project Name'
                                        className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                                    />
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        placeholder='Short Description'
                                        className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px] resize-y'
                                    />
                                    <input
                                        onChange={(e) => setTags(e.target.value)}
                                        value={tags}
                                        type="text"
                                        placeholder='Tags (e.g., React, Nextjs, Tailwind)'
                                        className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                                    />
                                </div>
                            </section>

                            {/* Uploads */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Content</h3>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                                    <input
                                        multiple
                                        onChange={handleFiles}
                                        type="file"
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                    />
                                    <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-600">Click to upload files</p>
                                    <p className="text-xs text-gray-400">Images, Videos, or Documents</p>
                                </div>

                                {selectedFile && selectedFile.length > 0 && (
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-semibold text-gray-700">Selected Files</h4>
                                            <button
                                                onClick={handleAddFileUrls}
                                                className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                Upload Now
                                            </button>
                                        </div>
                                        <ul className="space-y-2">
                                            {selectedFile.map((file, index) => (
                                                <li key={index} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-gray-200">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="truncate text-gray-700">{file.name}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-400 flex-shrink-0 pl-2">
                                                        {(file.size / 1024).toFixed(1)} KB
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>

                            {/* Links */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Links</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input onChange={(e) => setGithubLink(e.target.value)} value={githublink} type="text" placeholder='GitHub Repo URL' className='input-clean' />
                                    <input onChange={(e) => setLiveUrl(e.target.value)} value={liveUrl} type="text" placeholder='Live Demo URL' className='input-clean' />
                                    <input onChange={(e) => setVideoDemoLink(e.target.value)} value={videoDemolink} type="text" placeholder='Video Demo URL' className='input-clean' />
                                    <input onChange={(e) => setBlogLink(e.target.value)} value={blogLink} type="text" placeholder='Blog Article URL' className='input-clean' />
                                </div>
                            </section>

                            {/* Optional */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Optional</h3>
                                <div className="grid gap-4">
                                    <input onChange={(e) => setTeamMembers(e.target.value)} value={teamMembers} type="text" placeholder='Team Members (Name - Role)' className='input-clean' />
                                </div>
                            </section>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button onClick={handleDiscard} className="bg-red-900 text-white hover:bg-red-700 px-6 py-3 rounded-xl transition-colors">Discard</button>
                                <button onClick={handleSubmit} className="bg-green-900 text-white hover:bg-green-700 px-6 py-3 rounded-xl transition-colors">Create Project</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Template />

            <style jsx>{`
                .input-clean {
                    @apply w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm;
                }
                .btn-primary {
                    @apply px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200;
                }
                .btn-secondary {
                    @apply px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors;
                }
            `}</style>
        </div>
    )
}

const Template = () => {
    return (
        <section className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Guide</h2>

            <div className="space-y-12">
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Set Up Your Project</h3>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            Click "Set up Project" above. Fill in the essential details like your project name, description, and key skills used.
                        </p>
                        <ul className="text-sm text-gray-500 list-disc list-inside space-y-1 ml-2">
                            <li><strong>Tags:</strong> Comma-separated (e.g., <code>React, Node.js</code>).</li>
                            <li><strong>Media:</strong> Upload screenshots or demos to make your project stand out.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Connect & Sync</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Add links to your live demo, GitHub repository, or blog posts. This centralizes all your project resources in one place.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Use the API</h3>
                        <p className="text-gray-500 leading-relaxed mb-3">
                            Showcase this project on your personal portfolio dynamically using our API.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-600 inline-block">
                            GET https://api.jino.io/projects/:projectId
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectGettingStarted
