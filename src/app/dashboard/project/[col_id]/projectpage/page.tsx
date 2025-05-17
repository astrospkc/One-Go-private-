"use client"
import Modal from '@/components/ui/MyModal'
// import Modal from '@/components/ui/Modal'
import { ProjectContext } from '@/context/ProjectProvider'
import { cn } from '@/lib/utils'
// import { useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import { Project } from '../../../../../../types'

const ProjectsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { projects } = useContext(ProjectContext)
    const [projectDetails, setProjectDetails] = useState<Project>()
    const handleOpenProject = (val: Project) => {
        setProjectDetails(val)
        setIsOpen(true)

    }
    return (
        <div className='p-6 font-serif'>
            <div className='flex flex-row gap-2'>
                <AiFillCaretLeft
                    onClick={() => window.history.back()}
                    className='text-4xl hover:scale-90 hover:cursor-pointer' />
                <h2 className="text-lg md:text-2xl font-bold mb-4 "><span className='font-bold text-2xl md:text-6xl'>A</span><span>ll Projects</span></h2>
            </div>
            <div>
                <div className=" w-full grid grid-cols-3 gap-4">
                    {projects && projects.length > 0 &&
                        projects.map((val, ind) => {
                            return (

                                <div
                                    key={ind}
                                    onClick={() => handleOpenProject(val)}
                                    className={cn(
                                        "group w-full  shadow-violet-950 cursor-pointer overflow-hidden relative card h-70 rounded-md shadow-lg mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                                        "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                                        // Preload hover image by setting it in a pseudo-element
                                        // "before:bg-[url(https://unsplash.com/photos/cozy-room-with-two-red-chairs-and-car-memorabilia-5jbjClZI8SA)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                                        "hover:bg-[url(https://unsplash.com/photos/cozy-room-with-two-red-chairs-and-car-memorabilia-5jbjClZI8SA)]",
                                        "hover:bg-black", "hover:shadow-lg", "hover:shadow-violet-500", "hover:text-violet-950",
                                        // "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                                        "transition-all duration-500"
                                    )}
                                >
                                    <div className="text relative z-50">
                                        <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                            {val.title.toUpperCase()}

                                        </h1>
                                        <p className="font-normal text-base text-gray-50 relative my-4">
                                            {val.description}
                                        </p>
                                    </div>
                                </div>


                            )
                        })
                    }
                </div>
                <div>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <div className='text-white'>
                            {projectDetails && <>


                                <h1 className="text-xl md:text-3xl font-bold mb-4 border-b-2 w-fit">{projectDetails.title.toUpperCase()}</h1>

                                <ul className=' grid grid-cols-1 gap-6'>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Project id:</span> {projectDetails.id}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Collection id: </span>{projectDetails.collection_id}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Title:</span> {projectDetails.title}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Description:</span> {projectDetails.description}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Thumbnail:</span> {projectDetails.thumbnail}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Live Demo link:</span> {projectDetails.liveddemolink}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Github Link:</span> {projectDetails.githublink}</li>
                                    <li><span className='text-xl mr-2  w-fit font-bold text-violet-400'>Created At:</span> {projectDetails.time}</li>
                                </ul>
                            </>}


                        </div>

                    </Modal>

                </div>

            </div>




        </div>
    )
}

export default ProjectsPage
