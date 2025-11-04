"use client"
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore()

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        router.push("/auth/signIn")

    }

    return (
        <div>
            <nav className="flex justify-between items-center py-4 px-4 md:px-8 border-b border-gray-600 shadow-md shadow-violet-500">
                <Link href="/">
                    <div className="text-2xl font-bold text-violet-300 hover:cursor-pointer">One-Go</div>

                </Link>
                <ul className="hidden md:flex items-center space-x-6 text-gray-300 font-semibold">
                    <li><Link href="/about" className="hover:text-violet-300">About</Link></li>
                    <li><Link href="#features" className="hover:text-violet-300">Features</Link></li>
                    <li><Link href="/pricing" className="hover:text-violet-300">Pricing</Link></li>
                    <li><Link href="#contact" className="hover:text-violet-300">Contact</Link></li>
                    {
                        isAuthenticated ?
                            (
                                <>
                                    <li>
                                        <Link href="/dashboard">
                                            <button className="text-sm hover:cursor-pointer hover:bg-violet-300 px-4 py-2 rounded-2xl hover:text-black">Dashboard</button>
                                        </Link>
                                    </li>

                                    <li>

                                        <button onClick={handleLogout} className="text-sm hover:cursor-pointer hover:bg-violet-300 px-4 py-2 rounded-2xl hover:text-black">Logout</button>

                                    </li>
                                </>

                            ) : (
                                <>

                                    <li>
                                        <Link href="/auth/signIn">
                                            <button className="text-sm hover:cursor-pointer hover:bg-violet-300 px-4 py-2 rounded-2xl hover:text-black">Login</button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/signUp">
                                            <button className="text-sm hover:cursor-pointer hover:bg-violet-300 px-4 py-2 rounded-2xl hover:text-black">SignUp</button>
                                        </Link>
                                    </li>
                                </>)
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
