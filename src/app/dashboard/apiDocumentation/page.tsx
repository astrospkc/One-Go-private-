"use client"

import SubscriptionBanner from '@/components/pricing/SubcriptionBanner';
import NeonButton from '@/components/ui/NeonButton';
import React, { useRef, useState } from 'react';

const sections = [
    {
        title: 'Auth API',
        routes: [
            { method: 'GET', path: '/api/auth/getUser', desc: 'Fetch user details using a valid API key.' },
        ],
    },
    {
        title: 'Collection API',
        routes: [
            // { method: 'POST', path: '/api/collection/createCollection', desc: 'Create a new collection.' },
            { method: 'GET', path: '/api/collection/getAllCollection', desc: 'Fetch all collections.' },
        ],
    },
    {
        title: 'Project API',
        routes: [
            // { method: 'POST', path: '/api/project/createProject', desc: 'Create a new project.' },
            // { method: 'PUT', path: '/api/project/updateProject/:projectid', desc: 'Update a specific project by ID.' },
            { method: 'GET', path: '/api/project/readProject/:col_id', desc: 'Fetch all projects in a collection.' },
            { method: 'GET', path: '/api/project/readProjectWithId/:projectid', desc: 'Fetch a project by its ID.' },
            { method: 'DELETE', path: '/api/project/deleteProject/:projectid', desc: 'Delete a project by its ID.' },
        ],
    },
    {
        title: 'Blog API',
        routes: [
            // { method: 'POST', path: '/api/blog/createBlog/:col_id', desc: 'Create a blog within a collection.' },
            { method: 'GET', path: '/api/blog/readAllBlog', desc: 'Fetch all blogs.' },
            { method: 'GET', path: '/api/blog/readAllBlogWithCol_id/:col_id', desc: 'Fetch blogs by collection ID.' },
            { method: 'GET', path: '/api/blog/readOneBlog/:blogid', desc: 'Fetch a blog by its ID.' },
            // { method: 'PUT', path: '/api/blog/updateBlog/:blogid', desc: 'Update a blog by ID.' },
            { method: 'DELETE', path: '/api/blog/deleteBlog/:blogid', desc: 'Delete a blog by its ID.' },
            { method: 'DELETE', path: '/api/blog/deleteAllBlog/:col_id', desc: 'Delete all blogs in a collection.' },
        ],
    },
    {
        title: 'Link API',
        routes: [
            // { method: 'POST', path: '/api/link/createLink', desc: 'Create a new link entry.' },
            { method: 'GET', path: '/api/link/readLink', desc: 'Fetch all saved links.' },
            { method: 'GET', path: '/api/link/readLink/:linkid', desc: 'Fetch a link by ID.' },
            // { method: 'PUT', path: '/api/link/updateLink/:linkid', desc: 'Update a link by ID.' },
            { method: 'DELETE', path: '/api/link/deleteLink/:linkid', desc: 'Delete a link by ID.' },
            { method: 'DELETE', path: '/api/link/deleteAllLink', desc: 'Delete all stored links.' },
        ],
    },
    {
        title: 'Media API',
        routes: [
            // { method: 'POST', path: '/api/media/postmedia/:col_id', desc: 'Upload a media file to a collection.' },
            { method: 'GET', path: '/api/media/getALlMediaFiles/:col_id', desc: 'Fetch all media files for a collection.' },
        ],
    },
];

const SubscriptionSection = [
    {
        title: 'Auth API',
        routes: [
            {
                method: 'GET',
                path: '/api/auth/getUser',
                desc: 'Fetch user details using a valid API key.',

            },
        ],
    },
    {
        title: 'Collection API',
        routes: [
            {
                method: 'POST',
                path: '/api/collection/createCollection',
                desc: 'Create a new collection.',
                body: {
                    Title: "string",
                    Description: "string"
                }

            },
            { method: 'GET', path: '/api/collection/getAllCollection', desc: 'Fetch all collections.' },
            {
                method: 'PUT', path: '/api/collection/:id', dec: "Edit the collection.", body: {
                    Title: "string",
                    Description: "string"
                }
            },
            { method: 'DELETE', path: '/api/collection/:id', desc: 'Delete the collection.' },
            { method: 'GET', path: '/api/collection/:id', desc: "Get collection." },

        ],
    },
    {
        title: 'Project API',
        routes: [
            { method: 'POST', path: '/api/project/createProject', desc: 'Create a new project.' },
            { method: 'PUT', path: '/api/project/updateProject/:projectid', desc: 'Update a specific project by ID.' },
            { method: 'GET', path: '/api/project/readProject/:col_id', desc: 'Fetch all projects in a collection.' },
            { method: 'GET', path: '/api/project/readProjectWithId/:projectid', desc: 'Fetch a project by its ID.' },
            { method: 'DELETE', path: '/api/project/deleteProject/:projectid', desc: 'Delete a project by its ID.' },
        ],
    },

]




export default function APIDocumentation() {
    const [activeButton, setActiveButton] = useState<'public' | 'subscription'>('public')
    const projectRef = useRef<HTMLDivElement | null>(null);
    const collectionRef = useRef<HTMLDivElement | null>(null);
    const authRef = useRef<HTMLDivElement | null>(null);
    const mediaRef = useRef<HTMLDivElement | null>(null);
    const linksRef = useRef<HTMLDivElement | null>(null);

    const scrollToSection = (ref: any) => {
        ref.current?.scrollIntoView({ behaviour: 'smooth', block: 'start' })
    }

    const Buttons = [
        {
            label: 'Auth',
            onClick: () => scrollToSection(authRef)
        },
        {
            label: 'Collection',
            onClick: () => scrollToSection(collectionRef)
        },
        {
            label: 'Project',
            onClick: () => scrollToSection(projectRef)
        },
        {
            label: 'Media',
            onClick: () => scrollToSection(mediaRef)
        },
        {
            label: 'Links',
            onClick: () => scrollToSection(linksRef)
        }
    ]


    return (
        <div className="min-h-screen bg-slate-950 text-gray-50 px-6 py-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-blue-500">One-Go Public API Documentation</h1>
            <div className=" flex flex-col text-center  items-center justify-center text-gray-400 mb-10 w-full mx-auto">
                <div>
                    All endpoints below are protected using <strong>API Key authentication</strong>.<br />
                    Include your API key in the <code className="bg-gray-600 px-1  text-white rounded">Authorization</code> header: <br />
                    <code className="bg-gray-600 px-2 py-1  text-white rounded text-sm">Bearer YOUR_API_KEY</code>
                </div>

                <div className='shadow-sm shadow-violet-900 p-4 w-fit rounded-2xl'>
                    <span className=''>{"{{cms_uri}} ="} </span><span className='text-red-300'>{"https://onego.xastrosbuild.site"}</span>

                </div>

            </div>
            <div className='flex flex-row gap-2  w-full my-4'>
                <button onClick={() => setActiveButton('public')} className={`bg-linear-to-r from-violet-500/20 to-blue-500 p-2 rounded-2xl font-extrabold text-white hover:scale-90 hover:cursor-pointer ${activeButton === 'public' ? 'shadow-md shadow-green-400/40' : ''}`}>Public APIs</button>
                <button onClick={() => setActiveButton('subscription')} className={`bg-linear-to-r from-blue-500/20 to-violet-500 p-2 rounded-2xl font-extrabold text-white hover:scale-90 hover:cursor-pointer ${activeButton === 'subscription' ? 'shadow-md shadow-green-400/40' : ''}`}>Subscription APIs</button>
            </div>

            <div className='flex flex-row gap-2 justify-around w-full'>

                <div className="w-3/4 mx-auto space-y-10">
                    {
                        activeButton === 'public' ?
                            sections.map((section, index) => (
                                <div key={index} className="bg-gray-800/60 p-6 rounded-2xl shadow-sm ">
                                    <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
                                    <div className="space-y-3">
                                        {section.routes.map((route, i) => (
                                            <div key={i} className=" pl-4 py-2">
                                                <p className="font-mono text-sm">
                                                    <span className={`font-bold ${route.method === 'GET' ? 'text-green-600' : route.method === 'POST' ? 'text-blue-600' : route.method === 'PUT' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {route.method}
                                                    </span>
                                                    &nbsp;<span className='text-red-300'>{"{{cms_uri}}"}</span>{route.path}
                                                </p>
                                                <p className="text-violet-400 font-semibold text-sm">{route.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                            :
                            <>
                                {/* card creation for subscription */}
                                <SubscriptionBanner />
                                {
                                    activeButton == "subscription" && SubscriptionSection.map((section, index) => (
                                        <div key={index} className="bg-gray-800/60 p-6 rounded-2xl shadow-sm ">
                                            <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
                                            <div className="space-y-3">
                                                {section.routes.map((route, i) => (
                                                    <div key={i} className=" pl-4 py-2">
                                                        <p className="font-mono text-sm">
                                                            <span className={`font-bold ${route.method === 'GET' ? 'text-green-600' : route.method === 'POST' ? 'text-blue-600' : route.method === 'PUT' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                                {route.method}
                                                            </span>
                                                            &nbsp;<span className='text-red-300'>{"{{cms_uri}}"}</span>{route.path}
                                                        </p>
                                                        <p className="text-violet-400 font-semibold text-sm">{route.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }
                            </>

                    }

                </div>
                <div className='w-1/4  mx-auto bg-gray-800/60 rounded-2xl p-4  flex flex-col  items-center'>
                    <h1 className="text-2xl font-bold mb-4 text-white">Category</h1>

                    {
                        Buttons.map((button, index) => (
                            <NeonButton key={index} label={button.label} onClick={button.onClick} />
                        ))
                    }
                </div>
            </div>



            <footer className="text-center mt-16 text-gray-500 text-sm">
                © {new Date().getFullYear()} One-Go CMS — Developer-first Headless CMS API
            </footer>
        </div>
    );
}
