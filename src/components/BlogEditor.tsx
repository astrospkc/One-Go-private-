import React, { useRef, useState, useEffect, useContext } from "react";

import EditorJS, { ToolConstructable } from '@editorjs/editorjs'
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Quote from '@editorjs/quote';
import { BlogContext } from "@/context/BlogProvider";
import getAllBlogs from "@/lib/getAllBlogs";

type PayloadType = {
    title: string,
    description: string,
    content?: unknown,
    status: string
}


export default function BlogEditor({ col_id }: { col_id: string }) {
    const { setBlogs } = useContext(BlogContext)
    const [blogAdded, setBlogAdded] = useState(false)
    const ejInstance = useRef<EditorJS | null>(new EditorJS())
    useEffect(() => {
        if (ejInstance.current == null) {
            ejInstance.current = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: Header,
                    // header: {
                    //     class: Header,
                    //     shortcut: 'CMD+SHIFT+H',
                    // },
                    linkTool: {
                        class: LinkTool,
                        shortcut: 'CMD+SHIFT+L',
                    },
                    list: {
                        class: List as unknown as ToolConstructable,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                    image: SimpleImage,
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+O',
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: 'Quote\'s author',
                        },
                    }
                },
                placeholder: "Start writing your blog post...."
            });
        }

    }, [])


    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const outputData = await ejInstance.current?.save()
        const title = (document.getElementById("title") as HTMLInputElement)?.value ?? ""
        const description = (document.getElementById("description") as HTMLInputElement)?.value
        const buttonType = (e.target as HTMLElement).innerText
        let payload
        if (buttonType === 'Publish') {
            payload = {
                title,
                description,
                content: outputData ?? "",
                status: 'Publish'
            }
        } else if (buttonType === 'Save as Draft') {
            payload = {
                title,
                description,
                content: outputData ?? "",
                status: 'Draft'
            }
        }

        if (payload) {
            CreateBlog(payload)
        } else {
            console.error("Invalid button type")
        }


    }
    const CreateBlog = async (payload: PayloadType) => {
        const token = localStorage.getItem('token')
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/createBlog/${col_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        })

        const blogResponse = await getAllBlogs(token ?? "", col_id)
        setBlogs(blogResponse)
        setBlogAdded(!blogAdded)
    }
    useEffect(() => {
        if (blogAdded) {
            ejInstance.current?.clear()
        }
    }, [blogAdded])

    return (
        <div className="max-w-3xl mx-auto p-6 text-white bg-black shadow-sm shadow-violet-500 rounded-xl mt-10">
            <h1 className="text-2xl font-bold mb-4">Blog Post Title</h1>
            <input
                id="title"
                type="text"
                placeholder="Enter blog title..."
                className="w-full p-2 border border-gray-300/10 rounded mb-4"
            />

            <label className="font-medium">Description</label>
            <textarea
                id="description"
                placeholder="Write a short description..."
                className="w-full p-2 border border-gray-300/10 rounded mb-4"
            />

            <div id="editorjs" className="border border-gray-300/10 min-h-[200px] p-4 mb-4"></div>
            <button
                onClick={handleSave}
                className="px-4 py-2 mr-2 bg-blue-600 text-white rounded"
            >
                Publish
            </button>
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Save as Draft
            </button>
        </div>
    );
}
