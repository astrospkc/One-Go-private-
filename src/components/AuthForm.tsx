"use client"

import { UserContext } from "@/context/UserProvider";


import { useRouter } from "next/navigation";

import { useContext, useState } from "react";

// import { useState } from 'react';

interface AuthFormProps {
    type: 'signin' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")
    const [ProfilePic, setProfilePic] = useState("")
    const { setUser } = useContext(UserContext)
    const { setIsUserLoading, setIsAuthenticated } = useContext(UserContext)


    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (type === 'signin') {
            setIsUserLoading(true)
            // console.log("env : ", process.env.NEXT_PUBLIC_BACKEND_URL)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    Email: Email,

                    Password: Password
                })
            })
            const data = await res.json()

            if (data.token) {
                localStorage.setItem("token", data.token)
                setUser(data.user)
                setIsAuthenticated(true)
                router.push("/dashboard")
                setIsUserLoading(false)
            } else {
                alert("Invalid credentials")
            }
        } else if (type === 'signup') {
            const formData = new FormData()
            formData.append('name', Name)
            formData.append('email', Email)
            formData.append('file', ProfilePic)
            formData.append('role', Role)
            formData.append('password', Password)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/createUser`, {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            console.log("data: ", data)

            if (data.token) {
                localStorage.setItem("token", data.token)
                setUser(data.user)
                setIsAuthenticated(true)
                router.push("/dashboard")
                setIsUserLoading(false)
            } else {
                alert("Invalid credentials")
            }

        }
    };




    return (
        <div className="flex flex-col space-y-4">
            {
                type === "signup" ? (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-2 rounded "
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-2 rounded"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2 rounded"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            placeholder="File"
                            className="border p-2 rounded"

                            onChange={(e) => {
                                const file = e.target.files
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        setProfilePic(reader.result as string)
                                    }
                                    reader.readAsDataURL(file[0])
                                }
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Role - Developer , designer, etc"
                            className="border p-2 rounded"
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                            Sign Up
                        </button>
                    </>
                ) : (
                    <>

                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-2 rounded"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2 rounded"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                            Sign In
                        </button>
                    </>
                )
            }

        </div>
    );
}
