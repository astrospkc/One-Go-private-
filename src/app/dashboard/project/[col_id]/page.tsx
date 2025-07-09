"use client"
import { ModalContextapp } from '@/context/ModalProvider';
import { ProjectContext } from '@/context/ProjectProvider';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiFillEdit, AiFillApi, AiFillFolderOpen, AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { UserContext } from '@/context/UserProvider';
import { RocketIcon, LayoutGrid, Lock, Activity, BarChart2, Zap, Settings } from 'lucide-react';
import ProjectOverview from '@/components/Project/ProjectOverview';
import ProjectAPI from '@/components/Project/ProjectAPI';
import ProjectActivity from '@/components/Project/ProjectActivity';
import ProjectUsage from '@/components/Project/ProjectUsage';
import ProjectSettings from '@/components/Project/ProjectSettings';
import ProjectPlan from '@/components/Project/ProjectPlan';

// type Params = {
//     params: {
//         col_id: string
//     }
// }

// const contentData = ['Blogs', 'Links', 'Media'];

const tabs = [
    { label: "Getting started", icon: <RocketIcon className="w-4 h-4" />, active: true },
    { label: "Overview", icon: <LayoutGrid className="w-4 h-4" />, component: <ProjectOverview /> },
    // { label: "Members", icon: <Users className="w-4 h-4" /> },
    // { label: "Studios", icon: <LayoutGrid className="w-4 h-4" /> },
    { label: "API", icon: <Zap className="w-4 h-4 rotate-45" />, component: <ProjectAPI /> },

    // { label: "Access", icon: <Lock className="w-4 h-4" />, component: <ProjectAPI /> },
    { label: "Activity", icon: <Activity className="w-4 h-4" />, component: <ProjectActivity /> },
    { label: "Usage", icon: <BarChart2 className="w-4 h-4" />, component: <ProjectUsage /> },
    { label: "Plan", icon: <Zap className="w-4 h-4" />, component: <ProjectPlan /> },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, component: <ProjectSettings />, button: true },
];


function TopNavigation() {
    const [activeTab, setActiveTab] = useState("Getting started");


    return (
        <div className="bg-[#0f0f12] w-full flex flex-col">
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
          {
            activeTab === "Getting started" ? <ProjectActivity />
            : activeTab === "Overview" ? <ProjectOverview />
            : activeTab === "API" ? <ProjectAPI />
            : activeTab === "Activity" ? <ProjectActivity />
            : activeTab === "Usage" ? <ProjectUsage />
            : activeTab === "Plan" ? <ProjectPlan />
            : activeTab === "Settings" ? <ProjectSettings />
            : <div className="text-white p-4">Tab not found</div>
          }
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
    const { projects, setProjects } = useContext(ProjectContext)
    const [selectedType, setSelectedType] = useState('All');
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/readProject/${col_id}`, {
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
                className='flex flex-col p-4 relative '>

                <div className='text-white h-full  flex flex-col  font-serif'>

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
                    <TopNavigation />
                    {/* <ProjectSettings /> */}





                    {/* Dropdown */}
                    {/* <div className='flex flex-col justify-center items-center'>
                        <div className='  flex flex-col w-fit p-4 rounded-2xl '>
                            <span className='text-4xl md:text-7xl text-orange-500/70 font-bold border-b-2 border-orange-500/50 w-fit'>
                                PROJECTS</span>
                            <span className=' text-center mt-3'>
                                Collect your project at one place
                            </span>

                        </div>
                        <div
                            className='w-2/3 h-150 bg-black flex justify-center items-center m-auto  rounded-4xl'>

                            {projects &&
                                projects.length > count && count >= 0 ?

                                <div className="flex flex-col rounded-4xl w-96 h-96 justify-center items-center">
                                    <div className='text-2xl  font-semibold my-3 text-orange-500'>
                                        Projects
                                    </div>



                                    <div

                                        className='flex flex-row  justify-center items-center   '>

                                        <AiFillCaretLeft onClick={handleCountReverse} className='text-4xl hover:text-orange-500 hover:scale-90 hover:cursor-pointer' />

                                        <div

                                            className='flex flex-col   h-80 w-80 text-center p-4 items-center justify-center  rounded-4xl border-2 shadow-lg border-orange-500/40  hover:border-2 hover:border-orange-500/60 hover:scale-90 hover:shadow-lg  hover:shadow-violet-700 hover:cursor-pointer'>
                                            <h1 className='text-3xl font-bold '> {projects[count].title}</h1>
                                            <div className=''>
                                                <p className='text-xl '>{projects[count].description}</p>
                                                <h2>Video link</h2>
                                                <h2>Project Link</h2>
                                            </div>
                                        </div>

                                        <AiFillCaretRight onClick={handleCount} className='text-4xl hover:text-orange-500 hover:scale-90 hover:cursor-pointer' />

                                    </div>
                                </div>
                                :
                                (count < 0 ?
                                    <div className='flex flex-row '>

                                        <span
                                            onClick={handleClick}
                                            className='text-2xl shadow-md hover:shadow-violet-900 p-2 rounded-2xl hover:cursor-pointer hover:text-violet-300'>
                                            Add Projects
                                        </span>
                                        <div onClick={handleCount} className='items-center mx-5' >
                                            <AiFillCaretRight className='text-4xl hover:text-orange-500 hover:scale-90 hover:cursor-pointer' />
                                        </div>
                                    </div>
                                    :
                                    <div className='flex flex-row '>
                                        <div onClick={handleCountReverse} className='items-center mx-5' >
                                            <AiFillCaretLeft className='text-4xl hover:text-orange-500 hover:scale-90 hover:cursor-pointer' />
                                        </div>
                                        <span
                                            onClick={handleClick}
                                            className='text-2xl shadow-md hover:shadow-violet-900 p-2 rounded-2xl hover:cursor-pointer hover:text-violet-300'>
                                            Add Projects
                                        </span>


                                    </div>
                                )
                            }

                        </div>

                        <div className='flex flex-row  justify-center items-center my-5'>
                            <div className='flex flex-row gap-4  ml-4 '>
                                <Link href={`${col_id}/projectpage`} passHref >

                                    <button className='border-2  border-amber-400 hover:text-black hover:font-bold p-2 rounded-2xl hover:bg-amber-400 hover:scale-90'>View more projects</button>
                                </Link>
                                <button
                                    onClick={handleClick}
                                    className='border-2  border-amber-400 p-2 hover:text-black hover:font-bold rounded-2xl hover:bg-amber-400 hover:scale-90'> + Add more projects</button>
                            </div>
                        </div>

                    </div> */}

                    {/* Content Cards */}
                    {/* <h1 className='text-2xl mx-2 font-bold mt-4 border-b-2 border-orange-500 w-fit '> Other contents : </h1>
                    <div className=" grid grid-cols-2 gap-4 text-amber-400 my-5  " >
                        <Link href={`${col_id}/Blogs`}>

                            <div
                                className=" flex flex-row  hover:text-black items-center p-2  w-fit rounded-lg bg-black border-b-2 border-r-2 border-orange-500  hover:scale-90 hover:bg-violet-300 hover:cursor-pointer transition duration-200"
                            >
                                <AiFillEdit className='text-xl mr-4' />
                                <p className=" font-semibold mb-2 t capitalize text-xl ">Blogs</p>

                            </div>
                        </Link>
                        <Link href={`${col_id}/Links`}>
                            <div
                                className="p-2 flex flex-row  bg-black hover:text-black items-center  border-b-2 border-r-2  border-orange-500 w-fit rounded-lg hover:scale-90 hover:bg-violet-300 hover:cursor-pointer transition duration-200"
                            >
                                <AiFillApi className='text-xl mr-4' />
                                <p className=" font-semibold mb-2  capitalize text-xl ">Links</p>
                            </div>
                        </Link>
                        <Link href={`${col_id}/Media`}>
                            <div
                                className="p-2 flex flex-row hover:text-black items-center bg-black border-b-2 border-r-2 border-orange-500  w-fit rounded-lg hover:scale-90 hover:bg-violet-300 hover:cursor-pointer transition duration-200"
                            >
                                <AiFillFolderOpen className='text-xl mr-4' />
                                <p className=" font-semibold mb-2  capitalize text-xl ">Media</p>
                            </div>
                        </Link>
                        <Link href={`${col_id}/BlogTipTap`}>
                            <div
                                className="p-2 flex flex-row hover:text-black items-center bg-black border-b-2 border-r-2 border-orange-500  w-fit rounded-lg hover:scale-90 hover:bg-violet-300 hover:cursor-pointer transition duration-200"
                            >
                                <AiFillFolderOpen className='text-xl mr-4' />
                                <p className=" font-semibold mb-2  capitalize text-xl ">BlogTipTap</p>
                            </div>
                        </Link>
                    </div> */}
                </div>
            </div >

        </>

    )
}

export default Project
