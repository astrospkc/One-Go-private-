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
    const buttonCss = "text-sm hover:cursor-pointer hover:bg-black hover:text-white px-4 py-2 rounded-2xl"

    return (
        <div>

            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">1</div>
                    <span className="text-xl font-bold tracking-tight">One-go</span>
                </div>

                <div className="hidden md:flex items-center  text-sm font-medium text-gray-600">
                    <Link href="/about" className={buttonCss}>About</Link>
                    <Link href="/features" className={buttonCss}>Features</Link>
                    <Link href="/pricing" className={buttonCss}>Pricing</Link>
                    <Link href="/subscription" className={buttonCss}>Subscription</Link>
                    <Link href="/contact" className={buttonCss}>Contact</Link>
                    <Link href="/dashboard/apiDocumentation" className={buttonCss}>API</Link>
                    {
                        isAuthenticated && (
                            <>
                                <Link href="/dashboard" className={buttonCss}>
                                    Dashboard
                                </Link>
                                <Link href="/dashboard/websiteGenerate" className={buttonCss}>
                                    Portfolio Generate
                                </Link>
                            </>
                        )
                    }
                </div>
                {
                    isAuthenticated ?
                        (
                            <>
                                <button className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all">
                                    Profile
                                </button>
                                <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all">
                                    Logout
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
