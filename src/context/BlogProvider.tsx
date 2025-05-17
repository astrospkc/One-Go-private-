"use client"


import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Blog } from "../../types";

interface BlogContextType {
    blogs: Blog[],
    setBlogs: Dispatch<SetStateAction<Blog[]>>
}
const defaultValue: BlogContextType = {
    blogs: [],
    setBlogs: () => { }
}
export const BlogContext = createContext(defaultValue)

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    return (
        <BlogContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogContext.Provider>
    )
}