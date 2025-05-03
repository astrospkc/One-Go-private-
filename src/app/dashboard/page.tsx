
"use client"

import TotalCollection from "@/components/modalComponents/TotalCollection"
import MyButton from "@/components/ui/button"
import Modal from "@/components/ui/MyModal"
import { CollectionContext } from "@/context/CollectionProvider"
import { ModalContextapp } from "@/context/ModalProvider"
import { ProjectContext } from "@/context/ProjectProvider"
import getAllCollection from "@/lib/getAllCollections"
import getAllProjects from "@/lib/getAllProjects"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

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

    const totalCollection = collectionsList.length
    const totalProjects = projectsList.length
    const router = useRouter()

    const handleSection = (e) => {
        const labelText = e.currentTarget.querySelector('span').innerText.trim();
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
        <div className="flex flex-col gap-4 justify-center items-center w-full m-auto font-serif my-10 ">
            <div className="flex flex-row gap-4 justify-center items-center m-auto ">

                <MyButton onClick={handleClick}>+ Create Collection</MyButton>
                <MyButton pathname="/dashboard/collections"> See All Collection</MyButton>

            </div>
            <div className="grid grid-cols-2 gap-4">
                <div
                    onClick={handleSection}
                    className=" text-2xl md:text-4xl hover:cursor-pointer  flex flex-col items-center shadow-sm rounded-2xl shadow-violet-400 p-4 ">
                    <span className="font-bold text-center border-b-2"> Total Collections </span>
                    <span className="rounded-full  p-2">{totalCollection}</span>
                </div>
                <div
                    onClick={handleSection}
                    className="hover:cursor-pointer text-2xl md:text-4xl flex flex-col items-center shadow-sm rounded-2xl shadow-violet-400 p-4 ">
                    <span className="font-bold text-center border-b-2"> Total Projects </span>
                    <span>{totalProjects}</span>
                </div>
                <div className="hover:cursor-pointer text-2xl md:text-4xl flex flex-col items-center shadow-sm rounded-2xl shadow-violet-400 p-4 ">

                    <span className="font-bold text-center border-b-2"> Total Links </span>
                    <span>43</span>
                </div>
                <div className="hover:cursor-pointer text-2xl md:text-4xl flex flex-col items-center shadow-sm rounded-2xl shadow-violet-400 p-4 ">

                    <span className="font-bold text-center border-b-2"> Total Media </span>
                    <span>43</span>
                </div>

            </div>
            <div className="my-10">
                <span className="text-3xl md:text-4xl font-bold border-2 rounded-2xl p-2">Usage Report</span>
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
    )
}

export default Dashboard
