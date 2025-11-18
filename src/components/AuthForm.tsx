"use client"

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface AuthFormProps {
    type: 'signin' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")
    const [ProfilePic, setProfilePic] = useState("")
    const { user, isAuthenticated, setUser, setIsAuthenticated, setUserLoading } = useAuthStore();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (type === 'signin') {
            setUserLoading(true)
            // console.log("env : ", process.env.NEXT_PUBLIC_BACKEND_URL)
            const res = await authService.login(Email, Password)
            const { token, user } = res

            if (token) {
                localStorage.setItem("token", token)
                setUser(user)
                setIsAuthenticated(true)
                router.push("/dashboard")
                setUserLoading(false)
            } else {
                alert("Invalid credentials")
                setUserLoading(false)
            }
        } else if (type === 'signup') {
            const payload = {
                name: Name,
                email: Email,
                password: Password,
                role: Role,
                file: ProfilePic
            }
            const res = await authService.registerSendOtp(payload)
            const { message, email, otp } = res


            if (data.token) {
                localStorage.setItem("token", data.token)
                setUser(data.user)
                setIsAuthenticated(true)
                router.push("/dashboard")
                setUserLoading(false)
            } else {
                alert("Invalid credentials")
                setUserLoading(false)
            }
        }
    };

    console.log("user and is authenticated: ", user, isAuthenticated)

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
