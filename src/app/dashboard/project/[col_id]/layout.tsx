"use client"
import { ProjectModal } from "@/components/ProjectModal";
import { ModalContextapp } from "@/context/ModalProvider";
import { useParams } from "next/navigation";
import React, { useContext } from "react"




export default function ProjectLayout({
    children,

}: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams()
    const col_id = params.col_id as string


    const { openProjectModal } = useContext(ModalContextapp)
    return (
        <>
            <div className="w-full">
                {openProjectModal ? <ProjectModal props={{ col_id }} /> : <>{children}</>}
            </div>
        </>
    )
}