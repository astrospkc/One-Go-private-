"use client"
import React from 'react';
import { Code2, Globe, Layout, RefreshCw, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function LandingPage() {
    const { isAuthenticated } = useAuthStore()
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-indigo-100">
            {/* --- Navbar --- */}


            {/* --- Hero Section --- */}
            <header className="px-8 pt-20 pb-12 max-w-7xl mx-auto text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
                    Your Projects. Your Data. <br />
                    <span className="text-indigo-600">One API.</span>
                </h1>
                <p className="max-w-2xl text-lg text-gray-500 mb-10 leading-relaxed">
                    The headless portfolio engine for developers. Upload your work, connect via API,
                    or let our AI generate a custom frontend in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/auth/signUp">
                                <button className="bg-black cursor-pointer text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform">
                                    Get Started for Free
                                </button>
                            </Link>
                            <Link href="/auth/signIn">
                                <button className="border border-gray-200 cursor-pointer px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                    Read API Docs
                                </button>
                            </Link>
                        </>

                    ) :
                        <>
                            <Link href="/dashboard">
                                <button className="bg-black cursor-pointer text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <Link href="/dashboard/apiDocumentation">
                                <button className="border border-gray-200 cursor-pointer px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                    Read API Docs
                                </button>
                            </Link>
                        </>

                    }

                </div>
            </header>

            {/* --- Hero Visual (The Code/UI Split) --- */}
            <section className="px-8 py-12 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    {/* Mock Code Editor */}
                    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed text-indigo-300">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <pre className="text-gray-400">
                            <code>
                                {`{
  "project_title": "One-go Case Study",
  "description": "Led the UX/UI overhaul...",
  "media": {
    "url": "https://cdn.one-go.io/v1/img_01",
    "tags": ["SAAS", "Mobile"]
  }
}`}
                            </code>
                        </pre>
                    </div>

                    {/* Mock UI Preview */}
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <div className="w-20 h-3 bg-gray-100 rounded" />
                            <div className="flex gap-2">
                                <div className="w-4 h-4 bg-gray-100 rounded-full" />
                                <div className="w-4 h-4 bg-indigo-500 rounded-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="aspect-video bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-[10px] text-gray-400">Project Card</div>
                            <div className="aspect-video bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-[10px] text-gray-400">Project Card</div>
                            <div className="aspect-video bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-[10px] text-gray-400">Project Card</div>
                            <div className="aspect-video bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-[10px] text-gray-400">Project Card</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Features Grid --- */}
            <section className="px-8 py-24 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-12">Core Features</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={<Globe className="w-6 h-6 text-indigo-600" />}
                        title="Unified Storage"
                        desc="Upload docs, case studies, and media in one central hub."
                    />
                    <FeatureCard
                        icon={<Code2 className="w-6 h-6 text-indigo-600" />}
                        title="Headless API"
                        desc="Fetch projects via REST or GraphQL to build your own React site."
                    />
                    <FeatureCard
                        icon={<Layout className="w-6 h-6 text-indigo-600" />}
                        title="AI Site Builder"
                        desc="AI analyzes your data and deploys a high-conversion portfolio."
                    />
                    <FeatureCard
                        icon={<RefreshCw className="w-6 h-6 text-indigo-600" />}
                        title="Live Updates"
                        desc="One change in the CMS updates all your frontends instantly."
                    />
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="px-8 py-12 border-t border-gray-100 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex gap-8 text-sm text-gray-500">
                    <a href="#" className="hover:text-black">Documentation</a>
                    <a href="#" className="hover:text-black">Status Page</a>
                    <a href="#" className="hover:text-black">Privacy Policy</a>
                </div>
                <div className="flex gap-6">
                    <Github className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer" />
                    <Twitter className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer" />
                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer" />
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="mb-4 p-3 bg-indigo-50 rounded-lg w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}