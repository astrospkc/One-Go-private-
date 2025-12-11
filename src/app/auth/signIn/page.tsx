"use client"
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ArrowBigLeft } from 'lucide-react';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';


export default function SignInPage() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [clickedForgotPassword, setClickedForgotPassword] = useState(false)
    const { userLoading, setUser, setIsAuthenticated, setUserLoading, setToken } = useAuthStore();

    const router = useRouter()
    const handleSubmit = async (type: string) => {
        if (type == "send-otp") {
            try {
                const forgotRes = await authService.forgotPassword(Email)
                const { code } = forgotRes
                if (code == 200) {
                    toast.success("Otp sent successfully, check your provided email")
                    router.push("/auth/resetPassword")
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        }
        if (type == "login") {
            try {

                const loginRes = await authService.login(Email, Password)
                setUser(loginRes.user)
                localStorage.setItem("token", loginRes.token)
                setToken(loginRes.token)
                setIsAuthenticated(true)
                router.push("/dashboard")
                setUserLoading(false)
            } catch (error) {
                console.error(error)
                toast.error("Invalid email or password")

            } finally {
                setUserLoading(false)
            }
        }

    }
    const handleForgotPassword = () => {
        setClickedForgotPassword(prev => !prev)
    }
    return (

        <div className="w-full flex flex-col gap-2 font-serif relative z-10 max-w-md p-8  shadow-lg shadow-violet-300 justify-center rounded-3xl items-center">
            <h1 className=" font-bold mb-4 text-violet-300 text-4xl text-center">SIGN IN</h1>
            {
                clickedForgotPassword ? (
                    <>
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                className="border p-2 rounded"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
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
                    </>

                )
            }
            {
                clickedForgotPassword ? (
                    <><button onClick={() => handleSubmit("send-otp")} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                        Send Otp
                    </button>
                        {/* <span className='flex flex-row gap-2 '><ArrowBigLeft />Back</span> */}
                    </>
                ) : (
                    <>
                        {
                            userLoading &&
                            <div>Loading...</div>
                        }
                        <button disabled={userLoading} onClick={() => handleSubmit("login")} type="submit" className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">
                            Sign In
                        </button>
                    </>


                )
            }
            {
                !clickedForgotPassword && (
                    <p className='hover:cursor-pointer hover:text-blue-400' onClick={handleForgotPassword}>Forgot Password?</p>
                )
            }
            <p className="mt-4 text-sm">
                Don&apos;t have an account? <Link href="/auth/signUp" className="text-blue-500 underline">Sign Up</Link>
            </p>
        </div >

    );
}
