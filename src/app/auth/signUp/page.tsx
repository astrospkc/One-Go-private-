"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
// import axios from 'axios';

export default function SignUpPage() {
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")
    const [ProfilePic, setProfilePic] = useState("")
    const [clickedSendOtp, setClickedSendOtp] = useState(false)
    const [Otp, setOtp] = useState("")
    const { setUser, setIsAuthenticated, setUserLoading, setToken } = useAuthStore();
    const router = useRouter()
    const handleSubmit = async (type: string) => {
        if (type == "send-otp") {
            try {
                setClickedSendOtp(true)
                await authService.registerSendOtp({ name: Name, email: Email, password: Password, role: Role, file: ProfilePic })
            } catch (error) {
                console.error(error)
            }
        }
        if (type == "verify-otp") {
            try {
                const registerVerifyOtpRes = await authService.registerVerifyOtp(Email, Otp)
                const { token, user, code } = registerVerifyOtpRes
                if (code == 200) {
                    setUser(user)
                    localStorage.setItem("token", token)
                    setToken(token)
                    setIsAuthenticated(true)
                    setUserLoading(false)
                    router.push("/dashboard")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (

        <div className="w-full flex flex-col relative gap-2 z-10 max-w-md p-8  font-serif border-2 border-black justify-center rounded-3xl items-center">

            <h1 className="text-4xl font-bold mb-4 text-black text-center">SIGN UP</h1>
            {
                clickedSendOtp ? (<><input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded w-full"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                    <input
                        type="text"
                        placeholder="Otp"
                        className="border p-2 rounded w-full"
                        value={Otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </>) : (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-2 rounded w-full "
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-2 rounded w-full"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2 rounded w-full"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            placeholder="File"
                            className="border p-2 rounded w-full"

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
                            className="border p-2 rounded w-full"
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </>
                )

            }
            {
                !clickedSendOtp ? (
                    <button onClick={() => handleSubmit("send-otp")} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                        Send Otp
                    </button>
                ) : (
                    <button onClick={() => handleSubmit("verify-otp")} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                        Verify Otp
                    </button>
                )
            }
            <p className="mt-4 text-sm">
                Already have an account? <Link href="/auth/signin" className="text-blue-500 underline">Sign In</Link>
            </p>
        </div>

    );
}
