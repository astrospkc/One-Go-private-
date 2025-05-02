"use client"

import { UserContext } from "@/context/UserProvider";
import axios from "axios";

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
        // const endpoint = type === 'signin' ? '/api/login' : '/api/createUser';
        console.log("Name, Password: ", Email, Password)
        if (type === 'signin') {
            setIsUserLoading(true)
            const res = await fetch("http://localhost:8080/auth/login", {
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
            console.log("data: ", data)
        } else if (type === 'signup') {
            const formData = new FormData()
            formData.append('Name', Name)
            formData.append('Email', Email)
            formData.append('ProfilePic', ProfilePic)
            formData.append('Role', Role)
            formData.append('Password', Password)
            const res = await axios.post("http://localhost:6000/api/createUser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const data = await res.data

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
                                    console.log("file: ", file)
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
