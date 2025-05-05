"use client"


import { createContext, useState } from "react"

interface BlogContextType {
    blogs: any[],
    setBlogs: (blogs: any[]) => void;
}
const defaultValue: BlogContextType = {
    blogs: [],
    setBlogs: () => { }
}
export const BlogContext = createContext(defaultValue)

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([])
    return (
        <BlogContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogContext.Provider>
    )
}