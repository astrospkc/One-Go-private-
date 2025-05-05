"use client"
import BlogEditor from '@/components/BlogEditor';
import MyButton from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const Blogs = () => {
    const [openBlog, setOpenBlog] = useState(false)
    const params = useParams()
    const col_id = params.col_id
    // Example blog data
    const blogData = [
        {
            title: 'Getting Started with React',
            description: 'An introduction to React and component-based development.',
            created: '2024-01-10',
            updated: '2024-03-15',
            status: 'Published',
        },
        {
            title: 'Understanding Next.js',
            description: 'Deep dive into SSR and file-based routing in Next.js.',
            created: '2024-02-05',
            updated: '2024-03-22',
            status: 'Draft',
        },
    ];

    const [selectedType, setSelectedType] = useState('All');



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

            <div className="overflow-x-auto">
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
                    <tbody>
                        {blogData.map((blog, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="px-4 py-2 border-b border-gray-600">{index + 1}</td>
                                <td className="px-4 py-2 border-b border-gray-600">{blog.title}</td>
                                <td className="px-4 py-2 border-b border-gray-600">{blog.description}</td>
                                <td className="px-4 py-2 border-b border-gray-600">{blog.created}</td>
                                <td className="px-4 py-2 border-b border-gray-600">{blog.updated}</td>
                                <td className="px-4 py-2 border-b border-gray-600">{blog.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Blogs;
