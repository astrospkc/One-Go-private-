"use client"
import projectService from '@/services/projectService';
import useProjectStore from '@/store/projectStore';
import axios from 'axios'
import React, { useState } from 'react'
import { Project } from '../../../types';
import { useAuthStore } from '@/store/authStore';
type ProjectGettingStartedProps = {
    col_id: string;
};
type FileState = File[] | null
const ProjectGettingStarted = ({ col_id }: ProjectGettingStartedProps) => {
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
    const [uploads, setUploads] = useState<{ file: File; name: string; presignedUrl?: string; nameKey?: string }[]>([])
    const { setProject, project } = useProjectStore()
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

            alert("project created successfully")

        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project")
        }
    }

    const [settingClicked, setSettingClicked] = useState(false)
    const handleSettingProject = () => {
        setSettingClicked(!settingClicked)
    }
    const handleDiscard = () => {
        setSelectedFile([])

        setSettingClicked(!settingClicked)
    }



    return (<>
        <div className='bg-black w-full h-screen justify-center items-center p-4 '>
            <Template />
            <h1 className='text-blue-900'>For developer</h1>
            <h1 className='text-3xl text-white'> You&apos;re just few steps away from uploading projects. </h1>
            <div className='w-full justify-center items-center m-auto my-5'>
                <button
                    onClick={handleSettingProject}
                    style={{
                        background: 'radial-gradient(circle at center, #675575, #5D3871, #090417)',
                    }}
                    className='p-4  border-2 border-slate-400/20 w-fit rounded-2xl cursor-pointer hover:scale-105 transition-transform hover:shadow-md hover:shadow-yellow-400/70 hover:bg-yellow-50'>setting up your project </button>

                {
                    settingClicked &&
                    <div className=' flex flex-col gap-4 w-1/2 p-4 m-2  rounded-2xl h-full '>
                        <div className='shadow-md shadow-[#5D3871]/80 p-4 rounded-2xl'>
                            <h1>Basic Details</h1>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Project Name' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
                            <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Project Short Description' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
                            <input onChange={(e) => setTags(e.target.value)} type="text" placeholder='Tags/Skills comma separated Used eg. if you are a web developer then you can write React, Nextjs, Tailwindcss' className='w-full rounded-2xl p-2 my-2 border-2 border-[#5D3871]/80' />
                        </div>
                        <div className='shadow-sm shadow-slate-800 p-4 rounded-2xl'>
                            <h1>Content Uploads:</h1>
                            <input multiple onChange={handleFiles} type="file" placeholder='File Upload' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />


                            {selectedFile && selectedFile.length > 0 && (
                                <div className="mt-3 p-3 border border-slate-300/30 rounded-lg bg-slate-600/10">
                                    <h3 className="font-semibold text-white mb-2">
                                        Selected Files:
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedFile.map((file, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between text-slate-700 text-sm bg-blue-400 border border-slate-200/30 rounded-md px-2 py-1 shadow-sm"
                                            >
                                                <span>{file.name}</span>
                                                <span className="text-xs text-black">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button onClick={handleAddFileUrls} className='bg-[#5D3871] p-2 rounded-2xl hover:bg-[#846794] hover:scale-95 cursor-pointer'>Add File Urls</button>
                            <input onChange={(e) => setVideoDemoLink(e.target.value)} type="text" placeholder='Video/demo link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            <input onChange={(e) => setGithubLink(e.target.value)} type="text" placeholder='Github/Repo Link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            <input onChange={(e) => setLiveUrl(e.target.value)} type="text" placeholder='Live Project Url' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            <input onChange={(e) => setBlogLink(e.target.value)} type="text" placeholder='Blog/Article Link' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                        </div>

                        <div>
                            <h1>Optional Details</h1>
                            <input onChange={(e) => setTeamMembers(e.target.value)} type="text" placeholder='Team Members/Collaborators (name + role)' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            <input type="date" placeholder='date' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            <input type="text" placeholder='Tech Stack' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />

                        </div>
                        <div className=' flex flex-row gap-4'>
                            <button onClick={handleSubmit} className='bg-[#5D3871] p-2 rounded-2xl hover:bg-[#846794] hover:scale-95 cursor-pointer'>Submit</button>
                            <button onClick={handleDiscard} className='bg-red-900 hover:bg-red-700 p-2 rounded-2xl hover:scale-95 cursor-pointer'>Discard</button>
                        </div>
                    </div>
                }

            </div>
            {/* <input type="file" multiple onChange={handleFiles} />
            <button onClick={handleAddFileUrls}>Add File Urls</button> */}
        </div>

    </>


    )
}

export default ProjectGettingStarted


const Template = () => {
    return (
        <>
            <div>
                <section className="getting-started bg-[#0a0a0a] text-gray-200 p-8 rounded-2xl border border-purple-900 shadow-[0_0_25px_rgba(155,55,255,0.2)] leading-relaxed font-inter">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                        🚀 Getting Started with JINO Portfolio Project
                    </h1>

                    <p className="text-gray-300 mb-6">
                        Welcome <span className="text-purple-400 font-semibold">JINO</span>, your developer-friendly space to upload, manage, and showcase your portfolio projects.
                        Follow these steps to get started 👇
                    </p>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">🧩 Step 1: Set Up Your Project</h2>
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">
                        <li>Click on <span className="text-purple-400 font-medium">“Setting up your project”</span>.</li>
                        <li>Fill out the form:
                            <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm text-gray-400">
                                <li><strong>Project Name:</strong> A short, clear name for your project.</li>
                                <li><strong>Description:</strong> Describe what your project does in one or two sentences.</li>
                                <li><strong>Tags/Skills:</strong> Add comma-separated skills or technologies (e.g., <code>React, Node.js, MongoDB</code>).</li>
                            </ul>
                        </li>
                        <li>Upload related <span className="text-purple-300">files</span>, <span className="text-purple-300">screenshots</span>, or <span className="text-purple-300">demo videos</span>.</li>
                    </ol>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">⚙️ Step 2: Connect Your Account</h2>
                    <p className="text-gray-400 mb-6">
                        Optionally link your <strong>GitHub</strong> or <strong>Project Repository</strong> to automatically sync updates and commits.<br />
                        <em>This keeps your portfolio live and updated without manual uploads.</em>
                    </p>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">💡 Step 3: Manage Your Projects</h2>
                    <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                        <li>Edit project details anytime.</li>
                        <li>View analytics under the <em>Activity</em> tab.</li>
                        <li>Use your API key (found in the <em>API</em> section) to integrate project data into your own site or app.</li>
                    </ul>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">🧠 Step 4: Use the JINO API</h2>
                    <p className="text-gray-400 mb-2">Want to showcase your projects dynamically on your own portfolio site? Use our REST API:</p>
                    <pre className="bg-[#1a0f24] border border-purple-700 rounded-lg p-3 text-sm text-purple-300 overflow-x-auto mb-4"><code>GET https://api.jino.io/projects/:projectId</code></pre>
                    <p className="text-gray-400 mb-6"><em>You’ll find your API key in the <strong>API</strong> section of your dashboard.</em></p>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">📊 Step 5: Track Your Growth</h2>
                    <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                        <li>Project views</li>
                        <li>API requests</li>
                        <li>File uploads</li>
                        <li>Engagement stats</li>
                    </ul>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">🛠 Tips</h2>
                    <ul className="list-disc list-inside text-gray-400 mb-6 space-y-1">
                        <li>Keep your project details concise but descriptive.</li>
                        <li>Add tags for better discoverability.</li>
                        <li>Regularly update your content to reflect your latest work.</li>
                    </ul>

                    <hr className="border-purple-700/50 mb-6" />

                    <h2 className="text-xl font-semibold text-purple-300 mb-2">💬 Need Help?</h2>
                    <p className="text-gray-400">
                        Check out the <span className="text-purple-400 font-medium">Docs</span> section or reach out to our support team via the <span className="text-purple-400 font-medium">Help Center</span>.
                    </p>
                </section>
            </div>
        </>
    )

}
