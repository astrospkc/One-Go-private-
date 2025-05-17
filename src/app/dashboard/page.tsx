
"use client"

import MyButton from "@/components/ui/button"
import { ModalContextapp } from "@/context/ModalProvider"

import getAllCollection from "@/lib/getAllCollections"
import getAllProjects from "@/lib/getAllProjects"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

// import { Modal } from "@/components/ui/animated-modal"


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { open, setOpen } = useContext(ModalContextapp)
    const handleClick = () => {
        setOpen(!open)
    }
    const [collectionsList, setCollectionsList] = useState([])
    const [projectsList, setProjectsList] = useState([])
    const [sectionSelected, setSectionSelected] = useState('collection')
    console.log(isOpen, sectionSelected)
    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchCollections = async () => {
            const collections = await getAllCollection(token ?? "")
            setCollectionsList(collections)
        }
        const fetchProjects = async () => {
            const projects = await getAllProjects(token ?? "")
            setProjectsList(projects)
        }
        fetchCollections()
        fetchProjects()
    }, [])

    const totalCollection = collectionsList ? collectionsList.length : []
    const totalProjects = projectsList ? projectsList.length : []
    const router = useRouter()
    const baseClass = "  flex flex-col justify-center items-center  rounded-3xl hover:bg-white/10 cursor-pointer bg-white/5 backdrop-blur-lg p-6  border border-white/10 text-white/80"

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


    return (
        <div
            style={{
                background: 'radial-gradient(circle at center, #1a0c2b, #0e0618, #090417)',
            }}
            className=" flex flex-row h-screen bg-gradient-to-t  from-violet-950 via-pink-700
         to-violet-950  gap-4 justify-center items-center w-full m-auto font-serif py-10 px-10 ">
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
                        <span className="rounded-full  p-2">{totalCollection}</span>
                    </div>
                    <div
                        onClick={handleSection}
                        className={cn(baseClass)}>
                        <span className="font-bold text-center"> Total Projects </span>
                        <span>{totalProjects}</span>
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
                <div className="flex flex-row gap-4 justify-center items-center m-auto ">

                    <MyButton onClick={handleClick}>+ Create Collection</MyButton>
                    <MyButton pathname="/dashboard/collections"> See All Collection</MyButton>

                </div>

                {/* <div>
                <Modal isOpen={isOpen} onClose={handleClick}>
                    {
                        sectionSelected === "collection" ?
                            <TotalCollection />
                            : null
                    }
                </Modal>
            </div> */}

            </div>

        </div>
    )
}

export default Dashboard
