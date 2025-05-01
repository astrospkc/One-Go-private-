"use client"
import Collection from '@/app/dashboard/collections/page'
import axios from 'axios'
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import React, { use, useEffect, useState } from 'react'

const Blogs = ({ params }) => {
  const { slug } = use(params)
  console.log(slug)
  const [blogs, setBlogs] = useState<{ _id: string; title: string; description: string }[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/blog/readAllBlog/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await response.data
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div>
      {blogs && blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
        </div>
      ))}

    </div>
  )
}

export default Blogs
