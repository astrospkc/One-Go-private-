"use client"

import { authService } from "@/services/authService"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [clickedResendOtp, setClickedResendOtp] = useState(false)
    const router = useRouter()
    const resetPassword = async (email: string, newPassword: string, otp: string) => {
        try {
            const resetPasswordRes = await authService.resetPassword(email, newPassword, confirmPassword, otp)
            const { message, code } = resetPasswordRes
            if (code === 200) {
                router.push("/auth/signIn")
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleResendOtp = async (email: string) => {
        try {
            await authService.forgotPassword(email)

        } catch (error) {
            console.error(error)
        } finally {
            setClickedResendOtp(false)
        }
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2 font-serif relative z-10 max-w-md p-8  shadow-lg shadow-violet-300 justify-center rounded-3xl items-center">
                <h1 className=" font-bold mb-4 text-violet-300 text-4xl text-center">Reset Password</h1>
                {
                    clickedResendOtp ? (
                        <>
                            <>
                                <>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-2 rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </>
                            </>
                        </>
                    ) : (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                className="border p-2 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="border p-2 rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="border p-2 rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Otp"
                                className="border p-2 rounded"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </>
                    )
                }
                {
                    clickedResendOtp ? (
                        <button onClick={() => handleResendOtp(email)} className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">Resend Otp</button>
                    ) : (
                        <button onClick={() => resetPassword(email, newPassword, otp)} className="bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:scale-90">Reset Password</button>
                    )
                }
                {
                    !clickedResendOtp && (
                        <p className='hover:cursor-pointer hover:text-blue-400' onClick={() => setClickedResendOtp(prev => !prev)}>Resend Otp</p>
                    )
                }

                <p className="mt-4 text-sm">
                    Don&apos;t have an account? <Link href="/auth/signUp" className="text-blue-500 underline">Sign Up</Link>
                </p>
            </div>
        </>
    )
}

export default ResetPassword