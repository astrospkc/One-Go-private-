"use client"
"use client";
import React, { useContext, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "./ui/animated-modal";


import { ModalContextapp } from "@/context/ModalProvider";
import axios from "axios";
import { CollectionContext } from "@/context/CollectionProvider";

export function AnimatedModal() {
    const { open, setOpen } = useContext(ModalContextapp)
    const { collection, setCollection } = useContext(CollectionContext)
    const handleClick = () => {
        setOpen(!open)
    }
    const [newCol, setNewCol] = useState({
        Title: "",
        Description: ""
    })

    const handleCreateCol = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewCol((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addCollection = async () => {
        try {
            const token = localStorage.getItem('token')
            const createcollection = await axios.post(`http://localhost:8080/collection/createCollection`, {
                Title: newCol.Title,
                Description: newCol.Description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            const data = createcollection.data
            console.log("new Collection: ", data)
            setCollection([...collection, data])
            setOpen(!open)

        } catch (error) {
            throw new Error("Failed to Create new Collection")
        }

    }

    return (
        <div className="py-40   flex items-center justify-center font-serif">
            <Modal >
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="text-center transition duration-500 bg-violet-400 p-2 rounded-2xl hover:cursor-pointer hover:scale-125">
                        Open
                    </span>
                    {/* <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ✈️
                    </div> */}
                </ModalTrigger>
                <ModalBody className="bg-slate-900 dark:bg-neutral-900">
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-white border-b-2 p-4 border-green-300 dark:text-white font-bold text-center mb-8">
                            Create Collection

                        </h4>

                        <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            <input
                                name="Title"
                                onChange={handleCreateCol}
                                type="text"
                                placeholder="Project Name"
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />
                            <textarea
                                name="Description"
                                onChange={handleCreateCol}
                                rows={2}
                                cols={10}
                                placeholder="Description of project"
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full" />

                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4 ">
                        <button onClick={handleClick} className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        <button
                            onClick={addCollection} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Create
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}

