"use client"

import { authService } from "@/services/authService"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


const OTP_TIMEOUT = 10 * 60
const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [clickedResendOtp, setClickedResendOtp] = useState(false)
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState(OTP_TIMEOUT)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // clear interval safely
    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const startTimer = () => {
        clearTimer()
        setTimeLeft(OTP_TIMEOUT)
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearTimer()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => {
            clearTimer()
        }
    }, [])

    const resetPassword = async (email: string, newPassword: string, otp: string) => {
        try {

            const resetPasswordRes = await authService.resetPassword(email, newPassword, confirmPassword, otp)
            const { code } = resetPasswordRes
            if (code === 200) {
                router.push("/auth/signIn")
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleResendOtp = async (email: string) => {
        try {
            clearTimer()
            await authService.forgotPassword(email)
            startTimer()
        } catch (error) {
            console.error(error)
        } finally {
            setClickedResendOtp(false)
        }
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2 font-serif relative z-10 max-w-md p-8 bg-black  shadow-lg shadow-violet-300 justify-center rounded-3xl items-center">
                <h1 className=" font-bold mb-4 text-violet-300 text-4xl text-center">Reset Password</h1>
                {!clickedResendOtp && timeLeft > 0 && (
                    <div className="text-xl font-bold text-blue-400 mb-2">
                        OTP expires in: {formatTime(timeLeft)}
                    </div>
                )}
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
                                className="border p-2 rounded w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative w-full">
                                <input
                                    type={showPassword.newPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className="border p-2 rounded w-full pr-10"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                                >
                                    {showPassword.newPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            <div className="relative w-full">
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="border p-2 rounded w-full pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                >
                                    {showPassword.confirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Otp"
                                className="border p-2 rounded w-full"
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