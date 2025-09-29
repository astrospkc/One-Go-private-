"use client"
import axios from 'axios'
import React, { useState } from 'react'
type ProjectGettingStartedProps = {
    col_id: string;
};
type FileState = File | null
const ProjectGettingStarted = ({ col_id }: ProjectGettingStartedProps) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [file, setFile] = useState<FileState>(null)
    const [videoDemolink, setVideoDemoLink] = useState("")
    const [githublink, setGithubLink] = useState("")
    const [liveUrl, setLiveUrl] = useState("")
    const [blogLink, setBlogLink] = useState("")
    const [teamMembers, setTeamMembers] = useState("")

    const handleSubmit = async () => {
        try {
            console.log("submitting the form")
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("tags", JSON.stringify(tags.split(",")));
            formData.append("githubLink", githublink);
            formData.append("demoLink", videoDemolink);
            formData.append("liveUrl", liveUrl)
            formData.append("blogLink", blogLink)
            formData.append("teamMembers", JSON.stringify(teamMembers.split(",")))

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/createProject/${col_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.data
            console.log(data)
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
    return (<>
        <div className='bg-black w-full h-screen justify-center items-center p-4 '>
            <h1 className='text-blue-900'>For developer</h1>
            <h1 className='text-3xl text-white'> You&apos;re just few steps away from uploading projects. </h1>
            <div className='w-full justify-center items-center m-auto my-5'>
                <button
                    onClick={handleSettingProject}
                    style={{
                        background: 'radial-gradient(circle at center, #675575, #5D3871, #090417)',
                    }}
                    className='p-4  border-2 border-slate-400/20 w-fit rounded-2xl cursor-pointer hover:scale-105 transition-transform hover:shadow-md hover:shadow-yellow-400/70 hover:bg-yellow-50'>setting up your project </button>
                {/* project input fields */}
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
                            <input onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} type="file" placeholder='File Upload' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' />
                            {/* <input type="file" placeholder='Image Upload' className='w-full rounded-2xl p-2 my-2 border-2 border-slate-800' /> */}
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
                            <button className='bg-red-900 hover:bg-red-700 p-2 rounded-2xl hover:scale-95 cursor-pointer'>Discard</button>
                        </div>



                    </div>
                }

            </div>
        </div>

    </>


    )
}

export default ProjectGettingStarted


