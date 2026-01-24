"use client"
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const Navbar = () => {
    const { isAuthenticated, setToken, setIsAuthenticated } = useAuthStore()

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken("")
        setIsAuthenticated(false)
        router.push("/auth/signIn")

    }

    return (
        <div>

            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">1</div>
                    <span className="text-xl font-bold tracking-tight">One-go</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="/about" className="hover:text-black transition-colors">About</Link>
                    <Link href="/features" className="hover:text-black transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                    <Link href="/subscription" className="hover:text-black transition-colors">Subscription</Link>
                    <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                    <Link href="/dashboard/apiDocumentation" className="hover:text-black transition-colors underline decoration-2 underline-offset-4 decoration-indigo-500">API</Link>
                </div>
                {
                    isAuthenticated ?
                        (
                            <>
                                <li>
                                    <Link href="/dashboard">
                                        <button className="text-sm hover:cursor-pointer hover:bg-violet-300 px-4 py-2 rounded-2xl hover:text-black">Dashboard</button>
                                    </Link>
                                </li>
                                <button className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all">
                                    Sign Up
                                </button>
                            </>

                        ) :
                        (
                            <>
                                <div className="flex items-center gap-4">
                                    <Link href="/auth/signIn">
                                        <button className="text-sm font-medium hover:text-gray-600">Login</button>
                                    </Link>
                                    <Link href="/auth/signUp">
                                        <button className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )
                }
            </nav>

        </div>
    )
}

export default Navbar
