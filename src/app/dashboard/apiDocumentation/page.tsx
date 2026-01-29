"use client"

import SubscriptionBanner from '@/components/pricing/SubcriptionBanner';
import NeonButton from '@/components/ui/NeonButton';
import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Code, Database, Globe, Key, Layers, Link as LinkIcon, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded type definition for Routes
type Route = {
    method: string;
    path: string;
    desc: string;
    body?: any;
    params?: any;
    response?: any;
};

type Section = {
    title: string;
    icon?: React.ReactNode;
    routes: Route[];
    ref?: React.RefObject<HTMLDivElement | null>;
};


const APIDocumentation = () => {
    const [activeButton, setActiveButton] = useState<'public' | 'subscription'>('public')
    const [copied, setCopied] = useState(false);

    // Refs for scrolling
    const authRef = useRef<HTMLDivElement | null>(null);
    const collectionRef = useRef<HTMLDivElement | null>(null);
    const projectRef = useRef<HTMLDivElement | null>(null);
    const blogRef = useRef<HTMLDivElement | null>(null);
    const linkRef = useRef<HTMLDivElement | null>(null);
    const mediaRef = useRef<HTMLDivElement | null>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const sections: Section[] = [
        {
            title: 'Auth API',
            icon: <Key className="w-5 h-5 text-amber-500" />,
            ref: authRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/auth/getUser',
                    desc: 'Fetch user details using a valid API key.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "id": "user_123", "email": "user@example.com", "plan": "free" }
                },
            ],
        },
        {
            title: 'Collection API',
            icon: <Database className="w-5 h-5 text-emerald-500" />,
            ref: collectionRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/collection/getAllCollection',
                    desc: 'Fetch all collections.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "collections": [{ "id": "col_1", "title": "Blog Posts" }] }
                },
            ],
        },
        {
            title: 'Project API',
            icon: <Layers className="w-5 h-5 text-blue-500" />,
            ref: projectRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/project/readProject/:col_id',
                    desc: 'Fetch all projects in a collection.',
                    params: { "col_id": "string", "Authorization": "Bearer <token>" },
                    response: { "data": [{ "id": "proj_1", "title": "My Project" }] }
                },
                {
                    method: 'GET',
                    path: '/api/project/readProjectWithId/:projectid',
                    desc: 'Fetch a project by its ID.',
                    params: { "projectid": "string", "Authorization": "Bearer <token>" },
                    response: { "id": "proj_1", "title": "My Project", "data": {} }
                },
                {
                    method: 'DELETE',
                    path: '/api/project/deleteProject/:projectid',
                    desc: 'Delete a project by its ID.',
                    params: { "projectid": "string", "Authorization": "Bearer <token>" },
                    response: { "message": "Project deleted successfully" }
                },
            ],
        },
        {
            title: 'Blog API',
            icon: <Globe className="w-5 h-5 text-indigo-500" />,
            ref: blogRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/blog/readAllBlog',
                    desc: 'Fetch all blogs.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "blogs": [{ "id": "blog_1", "title": "Hello World" }] }
                },
                {
                    method: 'GET',
                    path: '/api/blog/readAllBlogWithCol_id/:col_id',
                    desc: 'Fetch blogs by collection ID.',
                    params: { "col_id": "string" },
                    response: { "blogs": [] }
                },
                {
                    method: 'GET',
                    path: '/api/blog/readOneBlog/:blogid',
                    desc: 'Fetch a blog by its ID.',
                    params: { "blogid": "string" },
                    response: { "id": "blog_1", "content": "..." }
                },
                {
                    method: 'DELETE',
                    path: '/api/blog/deleteBlog/:blogid',
                    desc: 'Delete a blog by its ID.',
                    params: { "blogid": "string" },
                    response: { "message": "Deleted" }
                },
                {
                    method: 'DELETE',
                    path: '/api/blog/deleteAllBlog/:col_id',
                    desc: 'Delete all blogs in a collection.',
                    params: { "col_id": "string" },
                    response: { "message": "All blogs deleted" }
                },
            ],
        },
        {
            title: 'Link API',
            icon: <LinkIcon className="w-5 h-5 text-pink-500" />,
            ref: linkRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/link/readLink',
                    desc: 'Fetch all saved links.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "links": [] }
                },
                {
                    method: 'GET',
                    path: '/api/link/readLink/:linkid',
                    desc: 'Fetch a link by ID.',
                    params: { "linkid": "string" },
                    response: { "link": {} }
                },
                {
                    method: 'DELETE',
                    path: '/api/link/deleteLink/:linkid',
                    desc: 'Delete a link by ID.',
                    params: { "linkid": "string" },
                    response: { "message": "Deleted" }

                },
                {
                    method: 'DELETE',
                    path: '/api/link/deleteAllLink',
                    desc: 'Delete all stored links.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "message": "All links deleted" }
                },
            ],
        },
        {
            title: 'Media API',
            icon: <ImageIcon className="w-5 h-5 text-cyan-500" />,
            ref: mediaRef,
            routes: [
                {
                    method: 'GET',
                    path: '/api/media/getALlMediaFiles/:col_id',
                    desc: 'Fetch all media files for a collection.',
                    params: { "col_id": "string" },
                    response: { "files": ["img1.jpg", "img2.png"] }
                },
            ],
        },
    ];

    const subscriptionSections: Section[] = [
        {
            title: 'Auth API',
            icon: <Key className="w-5 h-5 text-amber-500" />,
            routes: [
                {
                    method: 'GET',
                    path: '/api/auth/getUser',
                    desc: 'Fetch user details using a valid API key.',
                    params: { "Authorization": "Bearer <token>" },
                    response: { "user": "details" }
                },
            ],
        },
        {
            title: 'Collection API',
            icon: <Database className="w-5 h-5 text-emerald-500" />,
            routes: [
                {
                    method: 'POST',
                    path: '/api/collection/createCollection',
                    desc: 'Create a new collection.',
                    body: { Title: "string", Description: "string" },
                    response: { "id": "new_col_id", "status": "created" }
                },
                {
                    method: 'GET',
                    path: '/api/collection/getAllCollection',
                    desc: 'Fetch all collections.',
                    response: { "collections": [] }
                },
                {
                    method: 'PUT',
                    path: '/api/collection/:id',
                    desc: "Edit the collection.",
                    body: { Title: "string", Description: "string" },
                    response: { "status": "updated" }
                },
                {
                    method: 'DELETE',
                    path: '/api/collection/:id',
                    desc: 'Delete the collection.',
                    response: { "status": "deleted" }
                },
                {
                    method: 'GET',
                    path: '/api/collection/:id',
                    desc: "Get collection.",
                    response: { "id": "col_1", "data": "..." }
                },
            ],
        },
        {
            title: 'Project API',
            icon: <Layers className="w-5 h-5 text-blue-500" />,
            routes: [
                {
                    method: 'POST',
                    path: '/api/project/createProject',
                    desc: 'Create a new project.',
                    response: { "id": "proj_new" }
                },
                {
                    method: 'PUT',
                    path: '/api/project/updateProject/:projectid',
                    desc: 'Update a specific project by ID.',
                    response: { "status": "updated" }
                },
                {
                    method: 'GET',
                    path: '/api/project/readProject/:col_id',
                    desc: 'Fetch all projects in a collection.',
                    response: { "data": [] }
                },
                {
                    method: 'GET',
                    path: '/api/project/readProjectWithId/:projectid',
                    desc: 'Fetch a project by its ID.',
                    response: { "data": {} }
                },
                {
                    method: 'DELETE',
                    path: '/api/project/deleteProject/:projectid',
                    desc: 'Delete a project by its ID.',
                    response: { "status": "deleted" }
                },
            ],
        },
    ]


    const Buttons = [
        { label: 'Auth', onClick: () => scrollToSection(authRef) },
        { label: 'Collection', onClick: () => scrollToSection(collectionRef) },
        { label: 'Project', onClick: () => scrollToSection(projectRef) },
        { label: 'Media', onClick: () => scrollToSection(mediaRef) },
        { label: 'Links', onClick: () => scrollToSection(linkRef) }
    ]

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12 font-sans selection:bg-indigo-100">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-black">
                    One-Go API Documentation
                </h1>

                <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
                    <p className="text-gray-600">
                        All endpoints below are protected using <strong>API Key authentication</strong>.
                    </p>
                    <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-sm">
                        <p className="mb-2 text-gray-500">Include your API key in the Authorization header:</p>
                        <code className="bg-gray-100 px-3 py-1.5 rounded text-indigo-600 font-mono text-sm block border border-gray-200">
                            Authorization: Bearer YOUR_API_KEY
                        </code>
                    </div>
                </div>

                <div className='flex justify-center mb-10'>
                    <div className='inline-flex bg-white/50 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm'>
                        <button
                            onClick={() => setActiveButton('public')}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${activeButton === 'public' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                        >
                            Public APIs
                        </button>
                        <button
                            onClick={() => setActiveButton('subscription')}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${activeButton === 'subscription' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                        >
                            Subscription APIs
                        </button>
                    </div>
                </div>

                {/* Mobile Quick Nav */}
                <div className="lg:hidden mb-8 sticky top-4 z-30">
                    <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl p-3 shadow-lg shadow-gray-200/20 overflow-x-auto no-scrollbar">
                        <div className="flex gap-3 min-w-max">
                            {Buttons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={button.onClick}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className="w-full lg:w-3/4 space-y-8">
                        {activeButton === 'public' ? (
                            sections.map((section, index) => (
                                <SectionCard key={index} section={section} />
                            ))
                        ) : (
                            <>
                                <div className="mb-8">
                                    <SubscriptionBanner />
                                </div>
                                {subscriptionSections.map((section, index) => (
                                    <SectionCard key={index} section={section} />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-xl shadow-gray-200/40">
                                <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-indigo-500" /> Quick Nav
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {Buttons.map((button, index) => (
                                        <button
                                            key={index}
                                            onClick={button.onClick}
                                            className="text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                        >
                                            {button.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200 overflow-hidden">
                                <p className="text-indigo-100 text-sm mb-2">Base URL</p>
                                <div className="flex items-center justify-between bg-indigo-700/50 p-2 rounded mb-4 border border-indigo-500/30">
                                    <code className="text-sm font-mono overflow-x-auto whitespace-nowrap no-scrollbar">
                                        https://onego.xastrosbuild.site
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText("https://onego.xastrosbuild.site");
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="ml-2 p-1.5 hover:bg-indigo-500/50 rounded-lg transition-colors shrink-0"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-indigo-200" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <footer className="text-center mt-20 pt-8 border-t border-gray-200 text-gray-400 text-sm">
                    © {new Date().getFullYear()} One-Go CMS — Developer-first Headless CMS API
                </footer>
            </div>
        </div>
    );
};

const SectionCard = ({ section }: { section: Section }) => {
    return (
        <div
            ref={section.ref}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-lg shadow-gray-200/40 transition-all hover:shadow-xl hover:bg-white/70"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    {section.icon && (
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                            {section.icon}
                        </div>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{section.title}</h2>
                </div>

                <div className="space-y-4">
                    {section.routes.map((route, i) => (
                        <ApiRouteItem key={i} route={route} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ApiRouteItem = ({ route }: { route: Route }) => {
    const [openTab, setOpenTab] = useState<'params' | 'response' | null>(null);

    const toggleTab = (tab: 'params' | 'response') => {
        setOpenTab(openTab === tab ? null : tab);
    };

    const methodColor =
        route.method === 'GET' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
            route.method === 'POST' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                route.method === 'PUT' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-red-100 text-red-700 border-red-200';

    return (
        <div className="border border-gray-200/60 rounded-xl bg-white/50 overflow-hidden transition-all hover:bg-white">
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${methodColor}`}>
                            {route.method}
                        </span>
                        <code className="text-sm text-gray-700 font-mono break-all opacity-80">
                            {route.path}
                        </code>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{route.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {route.body || route.params ? (
                        <button
                            onClick={() => toggleTab('params')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${openTab === 'params' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100'}`}
                        >
                            Parameters
                        </button>
                    ) : null}
                    {route.response ? (
                        <button
                            onClick={() => toggleTab('response')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${openTab === 'response' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100'}`}
                        >
                            Response
                        </button>
                    ) : null}
                </div>
            </div>

            <AnimatePresence>
                {openTab && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-100 bg-gray-50/50"
                    >
                        <div className="p-4 overflow-x-auto">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {openTab === 'params' ? 'Request Parameters' : 'Example Response'}
                            </h4>
                            <pre className="text-xs text-gray-700 font-mono bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                {JSON.stringify(openTab === 'params' ? (route.body || route.params) : route.response, null, 2)}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default APIDocumentation;
