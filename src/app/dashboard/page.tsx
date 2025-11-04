
"use client"
import { ModalContextapp } from "@/context/ModalProvider"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import { Pencil, LayoutDashboard } from "lucide-react";
import Link from "next/link"
import useCollectionStore from "@/store/collectionStore"
import useProjectStore from "@/store/projectStore"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


const Dashboard = () => {

    const { user, isAuthenticated } = useAuthStore()
    console.log("user:", user)
    const [isOpen, setIsOpen] = useState(false);
    const { open, setOpen } = useContext(ModalContextapp)
    const handleClick = () => {
        setOpen(!open)
    }
    const { collection, setCollection, collectionLoading } = useCollectionStore()
    const { project, setProject, projectLoading } = useProjectStore()
    const [sectionSelected, setSectionSelected] = useState('collection')
    console.log(isOpen, sectionSelected)
    // const {user} = props 

    const { error: collectionError, data: collectionData, isPending: isCollectionPending } = useQuery({
        queryKey: ["collectionList"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/getAllCollection`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return await response.data
        }
    })

    const { error: projectError, data: projectData, isPending: isProjectPending } = useQuery({
        queryKey: ["projectList"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getAllProject`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return await response.data
        }
    })
    console.log("collection data, project data: ", collectionData, projectData)
    if (collectionError) {
        console.log(collectionError)
        alert("Error fetching collections")
    }

    if (projectError) {
        console.log(projectError)
        alert("Error fetching projects")
    }

    useEffect(() => {
        if (collectionData) {
            setCollection(collectionData);

        }

    }, [collectionData]);

    useEffect(() => {
        if (projectData) {
            setProject(projectData);
        }
    }, [projectData]);


    console.log("collections_data: ", collection)
    console.log("projects_data: ", project)




    const totalCollection = collection ? collection.length : []
    const totalProjects = project ? project.length : []
    const router = useRouter()
    const baseClass = "  flex flex-col justify-center items-center  rounded-3xl hover:bg-white/10 cursor-pointer bg-white/5 backdrop-blur-lg p-6  border border-white/10 text-white/80 shadow-sm shadow-orange-500"

    const handleSection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const labelText = (e.currentTarget as HTMLElement).querySelector('span')?.innerText.trim();
        switch (labelText) {
            case "Total Collections":
                router.push('/dashboard/sectionPages/TotalCollection')
                // setSectionSelected('collection')
                break;
            case "Total Projects":
                router.push('/dashboard/sectionPages/TotalProject')
                // setSectionSelected('project')
                break;
            case "Total Blogs":
                setSectionSelected('blog')
                break;
            case "Total Media":
                setSectionSelected('media')
                break;
        }
        setIsOpen(true)
    }

    if (!isAuthenticated) {
        router.push("/auth/signIn")
    }


    return (
        <div
            style={{
                background: 'radial-gradient(circle at center, #1a0c2b, #0e0618, #090417)',
            }}
            className=" flex flex-col min-h-screen bg-gradient-to-t  from-violet-950 via-pink-700
         to-violet-950  gap-4     font-serif py-10 px-10 ">
            <div className="flex flex-col">
                <h1 className="text-5xl font-semibold">Hello, {user?.name.toUpperCase()}</h1>
                <p className="my-3">Its been a while</p>
            </div>

            <div className="flex flex-row justify-center items-center w-full h-full">
                <div className="flex flex-col gap-4   m-auto">

                    <h1 className=" flex text-violet-600 text-4xl md:text-7xl font-bold text">
                        Manage your content in
                    </h1>
                    <span className="text-orange-700 text-4xl md:text-7xl font-bold">ONE PLACE.</span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="rounded-3xl bg-white/5 backdrop-blur-lg p-6 border border-white/10 text-white">
                        <h2 className="text-xl font-semibold mb-2">Manage all your<span className="text-white/70"> content and APIs in one place</span></h2>
                        <p className="text-white/60 mb-4">Create, store, and organize your projects, links, media, and custom data using One-Go. Instantly connect everything to your frontend via powerful APIs — no backend needed.</p>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={handleSection}
                            className={cn(baseClass)}>
                            <span className="font-bold  text-center "> Total Collections </span>
                            {isCollectionPending ? <span>Loading...</span> :
                                <span className="rounded-full  p-2">{totalCollection}</span>
                            }
                        </div>
                        <div
                            onClick={handleSection}
                            className={cn(baseClass)}>
                            <span className="font-bold text-center"> Total Projects </span>
                            {isProjectPending ? <span>Loading...</span> :
                                <span className="rounded-full  p-2">{totalProjects}</span>
                            }
                        </div>
                        <div
                            className={cn(baseClass)}>
                            <span className="font-bold text-center"> Total Links </span>
                            <span>43</span>
                        </div>
                        <div
                            className={cn(baseClass)}>


                            <span className="font-bold text-center "> Total Media </span>
                            <span>43</span>
                        </div>

                    </div>

                </div>

            </div>
            <div className=" text-white mt-10 ">
                <h2 className="text-xl font-semibold mb-4">Get started</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Canvas Card */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500 transition">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <Pencil size={20} className="text-violet-400" />
                            <span>Canvas</span>
                        </div>
                        <p className="text-sm text-gray-400">AI assisted writing tool</p>
                        <div className="bg-blue-600/20 rounded-lg overflow-hidden">
                            {/* <Image
                                src="https://dummyimage.com/600x200/2b2b2b/ffffff&text=Canvas+Image"
                                alt="Canvas UI"
                                className="w-full h-auto object-cover"
                            /> */}
                        </div>
                    </div>

                    {/* Studios Card */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col justify-between gap-4 hover:border-violet-500 transition">
                        <div>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <LayoutDashboard size={20} className="text-violet-400" />
                                <span>Collections</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                                Manage your structured content
                            </p>

                            <div className="text-gray-300 text-sm mt-6">Detected collections</div>
                        </div>

                        <div className="mt-auto flex flex-col gap-2">
                            <button onClick={handleClick} className="hover:cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-violet-200 transition">
                                Create New Collection
                            </button>
                            <Link href={"/dashboard/collections"}>
                                <button className="bg-gray-800 w-full text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-violet-500 transition">
                                    See All Collections
                                </button>
                            </Link>

                            {/* <MyButton pathname="/dashboard/collections"
                                classname="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-violet-500 transition">
                                Create new Collection
                            </MyButton> */}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
