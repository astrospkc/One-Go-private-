"use client"
import BlogEditor from '@/components/BlogEditor';
import MyButton from '@/components/ui/button';
import { BlogContext } from '@/context/BlogProvider';
import getAllBlogs from '@/lib/getAllBlogs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';

const Blogs = () => {
    const [openBlog, setOpenBlog] = useState(false)
    const { blogs, setBlogs } = useContext(BlogContext)
    const [selectedType, setSelectedType] = useState('All');
    const [openIndex, setOpenIndex] = useState<string | number | undefined | null>(null)


    const params = useParams()
    const col_id = params.col_id as string
    const toggleDropdown = (index: string | number | undefined | null) => {
        setOpenIndex(openIndex == index ? null : index)
    }

    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    // col_id?.toString() ?? "" converted from col_id
    const query = useQuery({
        queryKey: ['blogs'],
        queryFn: () => getAllBlogs(token ?? "", col_id?.toString() ?? ""),
        enabled: !!token
    })
    useEffect(() => {
        if (query.data) {
            setBlogs(query.data)
        }
    })


    const handleDeleteBlog = async (blogid: string, col_id: string) => {

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/deleteBlog/${blogid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const result = await res.data
        console.log("deleted data: ", result)
        const blogResponse = await getAllBlogs(token ?? "", col_id)
        setBlogs(blogResponse)
        window.location.reload()
    }
    const handleEditBlog = async (blogid: string, col_id: string) => {
        // const res = await axios.put(`http://localhost:8000/blog/updateBlog/${blogid}`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
        console.log("blogid: ", blogid, 'col_id: ', col_id)

    }



    return (
        <div className='text-white p-4 font-serif'>
            <Link href={`/dashboard/project/${col_id}`}>

                <div className='flex flex-row items-center '>
                    <AiFillCaretLeft className='text-4xl hover:scale-90 hover:cursor-pointer ' />
                    <h1 className='text-2xl rounded-4xl shadow-md shadow-orange-500 p-2 pl-4 text-violet-400 w-fit font-bold mb-6 mt-4'>Blogs</h1>
                </div>
            </Link>

            <MyButton onClick={() => setOpenBlog(!openBlog)}>Create Blog</MyButton>
            {
                openBlog && col_id && <BlogEditor col_id={col_id} />
            }

            {/* Dropdown */}
            <div className="mb-6 mt-2">
                <label htmlFor="contentType" className="mr-2 font-medium">Select Content:</label>
                <select
                    id="contentType"
                    className="border rounded px-3 py-1 bg-black"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Blogs">Blogs</option>
                    <option value="Links">Links</option>
                    <option value="Media">Media</option>

                </select>
            </div>

            {
                query.isLoading ? <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-amber-500"></div>
                </div>
                    : query.isError ? <div>error</div> :
                        blogs &&
                        <div

                            className="">
                            <table className="min-w-full border border-gray-700 text-sm">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">S.No</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Title</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Description</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Created</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Updated</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Status</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-black border-2 border-violet-500/40'>

                                    {blogs.map((blog, index) => (

                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{blog.title}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{blog.description}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{blog.published}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{blog.lastedited}</td>
                                            <td className="px-4 py-2 border-b border-gray-600">{blog.status}</td>
                                            <td
                                                onClick={() => toggleDropdown(index)}
                                                className=" relative  ">
                                                <button className='px-4 py-2 border-b border-gray-600 hover:bg-violet-500 p-1 cursor-pointer'>
                                                    ...
                                                </button>
                                                {openIndex === index && (
                                                    <div className="absolute right-0 mt-2 w-24 bg-white text-black rounded shadow-lg z-10">
                                                        <button
                                                            onClick={() => handleEditBlog(blog.id ?? "", blog.collection_id)}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteBlog(blog.id ?? "", blog.collection_id)}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>

                            </table>

                        </div>
            }


        </div>
    );
};

export default Blogs;
