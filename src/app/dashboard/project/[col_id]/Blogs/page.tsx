"use client"
import BlogEditor from '@/components/BlogEditor';
import MyButton from '@/components/ui/button';
import { BlogContext } from '@/context/BlogProvider';
import getAllBlogs from '@/lib/getAllBlogs';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const Blogs = () => {
    const [openBlog, setOpenBlog] = useState(false)
    const { blogs, setBlogs } = useContext(BlogContext)
    const [selectedType, setSelectedType] = useState('All');
    const params = useParams()
    const col_id = params.col_id
    console.log("params in blogs: ", col_id)

    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    const query = useQuery({
        queryKey: ['blogs'],
        queryFn: () => getAllBlogs(token ?? "", col_id),
        enabled: !!token
    })
    useEffect(() => {
        if (query.data) {
            console.log(query.data, "in blogs query")
            setBlogs(query.data)
        }
    }, [query.data])




    return (
        <div className='text-white p-4 font-serif'>
            <h1 className='text-2xl rounded-4xl shadow-md shadow-violet-300 p-2 pl-4 text-violet-400 w-fit font-bold mb-6'>Blogs</h1>
            <MyButton onClick={() => setOpenBlog(!openBlog)}>Create Blog</MyButton>
            {
                openBlog && <BlogEditor col_id={col_id} />
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

                            className="overflow-x-auto">
                            <table className="min-w-full border border-gray-700 text-sm">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">S.No</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Title</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Description</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Created</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Updated</th>
                                        <th className="px-4 py-2 border-b border-gray-600 text-left">Status</th>
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
