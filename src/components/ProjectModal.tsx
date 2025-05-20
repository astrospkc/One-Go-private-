
"use client";
import React, { useContext, useRef, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "./ui/animated-modal";



import { ModalContextapp } from "@/context/ModalProvider";

import { ProjectContext } from "@/context/ProjectProvider";
// import debounce from "@/lib/debounce";

export function ProjectModal({ props }: { props: { col_id: string } }) {
    const { col_id } = props
    const { openProjectModal, setOpenProjectModal } = useContext(ModalContextapp)
    const { projects, setProjects } = useContext(ProjectContext)
    // const [titleValue, setTitleValue] = useState("")
    // const [descriptionValue, setDescriptionValue] = useState("")
    const [newProj, setNewProj] = useState({
        CollectionId: col_id,
        Title: "",
        Description: "",
        Thumbnail: "",
        Tags: "",
        GithubLink: "",
        LiveDemoLink: ""
    })
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    // const debounceFieldChange = useCallback(
    //     debounce((fieldName: string, value: string) => {
    //         if (fieldName === "Title") {
    //             setTitleValue(value)
    //             setNewProj((prev) => ({
    //                 ...prev,
    //                 Title: value
    //             }))
    //         } else if (fieldName === "Description") {
    //             setDescriptionValue(value)
    //             setNewProj((prev) => ({
    //                 ...prev,
    //                 Description: value
    //             }))

    //         }
    //     }, 800),
    //     [setTitleValue, setDescriptionValue, setNewProj]
    // )





    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     e.preventDefault()
    //     const { name, value } = e.target as HTMLInputElement
    //     debounceFieldChange(name, value)
    // }

    const handleAddProject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        const { name, value } = e.target as HTMLInputElement
        setNewProj((prev) => ({
            ...prev,
            [name]: value,
        }))

    }

    // console.log("new project: ", newProj)


    const handleCancel = () => {
        setOpenProjectModal(!openProjectModal)
        window.location.reload()
    }

    const AddProject = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/createProject/${col_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    CollectionId: newProj.CollectionId,
                    Title: newProj.Title,
                    Description: newProj.Description,
                    Thumbnail: newProj.Thumbnail,
                    Tags: newProj.Thumbnail,
                    GithubLink: newProj.GithubLink,
                    LiveDemoLink: newProj.LiveDemoLink
                })
            })

        const data = await response.json()
        setProjects([...projects, data])
        setOpenProjectModal(!openProjectModal)
        window.location.reload()
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("title and description: ", titleRef.current?.value, ` ${titleRef.current?.value.length}`, "  \n", descRef.current?.value)
    //     }, 3000)
    // }, [titleRef.current?.value, descRef.current?.value])

    // const handledebounce=
    // console.log("title and description: ", titleRef.current?.value, ` ${titleRef.current?.value.length}`, "  \n", descRef.current?.value)




    return (
        <div className="   flex items-center justify-center font-serif ">
            <Modal >
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="text-center transition duration-500 bg-violet-400 p-2 rounded-2xl hover:cursor-pointer hover:scale-125">
                        Creating Project
                    </span>
                    {/* <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ✈️
                    </div> */}
                </ModalTrigger>
                <ModalBody className="bg-slate-900 dark:bg-neutral-900 overflow-y-scroll">
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-white border-b-2 p-4 border-green-300 dark:text-white font-bold text-center mb-8">
                            Create Project

                        </h4>

                        <div className=" flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">

                            <input
                                value={newProj.CollectionId}
                                onChange={handleAddProject}
                                name="CollectionId"
                                type="text" placeholder="CollectionId" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <input
                                ref={titleRef}
                                value={newProj.Title}
                                onChange={handleAddProject}
                                name="Title"
                                type="text" placeholder="Title" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <textarea
                                ref={descRef}
                                value={newProj.Description}
                                onChange={handleAddProject}
                                name="Description"
                                placeholder="Description" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <input
                                value={newProj.Tags}
                                onChange={handleAddProject}
                                name="Tags"
                                type="text" placeholder="Tags" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <input
                                value={newProj.Thumbnail}
                                onChange={handleAddProject}
                                name="Thumbnail"
                                type="text" placeholder="Thumbnail" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <input
                                value={newProj.GithubLink}
                                onChange={handleAddProject}
                                name="GithubLink"
                                type="text" placeholder="GithubLink" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <input
                                value={newProj.LiveDemoLink}
                                onChange={handleAddProject}
                                name="LiveDemoLink"
                                type="text" placeholder="Live Demo link" className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />

                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4 ">
                        <button onClick={handleCancel} className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        <button onClick={AddProject} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Create
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}

