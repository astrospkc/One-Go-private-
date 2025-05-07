"use client"

import { createContext, useState } from "react"
interface MediaContextType {
    media: any[]
    setMedia: (media: any[]) => void
}
const defaultValue: MediaContextType = {
    media: [],
    setMedia: () => { },
}
export const MediaContext = createContext(defaultValue)

export const MediaProvider = ({ children }) => {
    const [media, setMedia] = useState([])
    return (
        <MediaContext.Provider value={{ media, setMedia }}>
            {children}
        </MediaContext.Provider>
    )
}