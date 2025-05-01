"use client"


import { createContext, useState } from "react"

interface ProjectContextType {
    projects: any[],
    setProjects: (projects: any[]) => void;
}
const defaultValue: ProjectContextType = {
    projects: [],
    setProjects: () => { }
}
export const ProjectContext = createContext(defaultValue)

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}