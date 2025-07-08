"use client"
import { ModalContextapp } from '@/context/ModalProvider';
import { ProjectContext } from '@/context/ProjectProvider';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiFillEdit, AiFillApi, AiFillFolderOpen, AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

// type Params = {
//     params: {
//         col_id: string
//     }
// }

// const contentData = ['Blogs', 'Links', 'Media'];

const Project = () => {
    const params = useParams()
    const col_id = params.col_id
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
                {/* <div className="m-6">

                    <Link href={`/dashboard/collections`}>
                        <AiFillCaretLeft className='text-4xl  hover:scale-90 hover:cursor-pointer hover:text-violet-400' />
                    </Link>
                    <label htmlFor="contentType" className="mr-2 font-medium">Select Content:</label>
                    <select
                        id="contentType"
                        className="border rounded px-3 py-1 bg-black"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Blogs">Blogs</option>
                        <option value="Links">Links</option>
                        <option value="Media">Media</option>
                    </select>
                </div> */}
                <div className='text-white h-full  flex flex-col  font-serif'>
                    {/* Dropdown */}
                    <div className='flex flex-col justify-center items-center'>
                        <div className='  flex flex-col w-fit p-4 rounded-2xl '>
                            <span className='text-4xl md:text-7xl text-orange-500/70 font-bold border-b-2 border-orange-500/50 w-fit'>
                                PROJECTS</span>
                            <span className=' text-center mt-3'>
                                Collect your project at one place
                            </span>

                        </div>
                        {/* <div className='  flex flex-row  bg- text-2xl shadow-md shadow-violet-300 m-4  p-4 rounded-2xl'></div> */}
                        <div
                            className='w-2/3 h-150 bg-black flex justify-center items-center m-auto  rounded-4xl'>

                            {projects &&
                                projects.length > count && count >= 0 ?
                                // project model opening

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
                                {/* <Link href={{ pathname: `dashboard/project/${slug}/projectpage`, query: { prop: projects } }} > */}
                                <Link href={`${col_id}/projectpage`} passHref >

                                    <button className='border-2  border-amber-400 hover:text-black hover:font-bold p-2 rounded-2xl hover:bg-amber-400 hover:scale-90'>View more projects</button>
                                </Link>
                                <button
                                    onClick={handleClick}
                                    className='border-2  border-amber-400 p-2 hover:text-black hover:font-bold rounded-2xl hover:bg-amber-400 hover:scale-90'> + Add more projects</button>
                            </div>
                        </div>

                    </div>

                    {/* Content Cards */}
                    <h1 className='text-2xl mx-2 font-bold mt-4 border-b-2 border-orange-500 w-fit '> Other contents : </h1>
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
                    </div>
                </div>
            </div >

        </>

    )
}

export default Project
