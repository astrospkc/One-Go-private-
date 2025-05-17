"use client"


import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Project } from "../../types";


interface ProjectContextType {
    projects: Project[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}
const defaultValue: ProjectContextType = {
    projects: [],
    setProjects: () => { }
}
export const ProjectContext = createContext(defaultValue)

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([])
    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}