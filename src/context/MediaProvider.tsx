"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Media } from "../../types"
interface MediaContextType {
    media: Media[]
    setMedia: Dispatch<SetStateAction<Media[]>>
}
const defaultValue: MediaContextType = {
    media: [],
    setMedia: () => { },
}
export const MediaContext = createContext(defaultValue)

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
    const [media, setMedia] = useState<Media[]>([])
    return (
        <MediaContext.Provider value={{ media, setMedia }}>
            {children}
        </MediaContext.Provider>
    )
}