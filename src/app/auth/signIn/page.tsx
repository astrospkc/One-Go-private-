"use client"
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [clickedForgotPassword, setClickedForgotPassword] = useState(false)
    const { userLoading, setUser, setIsAuthenticated, setUserLoading, setToken } = useAuthStore();


    const router = useRouter()
    const handleSubmit = async (type: string) => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        if (type == "send-otp") {
            try {
                const forgotRes = await authService.forgotPassword(email)
                const { code } = forgotRes
                if (code == 200) {
                    toast.success("OTP sent successfully to your email")
                    router.push("/auth/resetPassword")
                }
            } catch (error) {
                console.error(error)
                toast.error("Failed to send OTP. Please try again.")
            }
        }
        if (type == "login") {
            if (!password) {
                toast.error("Please enter your password");
                return;
            }
            try {
                setUserLoading(true)
                const loginRes = await authService.login(email, password)
                setUser(loginRes.user)
                localStorage.setItem("token", loginRes.token)
                setToken(loginRes.token)
                setIsAuthenticated(true)
                toast.success("Welcome back!")
                router.push("/dashboard")
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
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">

                {clickedForgotPassword && (
                    <button
                        onClick={handleForgotPassword}
                        className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                )}

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                        {clickedForgotPassword ? 'Reset Password' : 'Welcome Back'}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {clickedForgotPassword
                            ? 'Enter your email to receive a reset code'
                            : 'Sign in to access your dashboard'}
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 pl-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {!clickedForgotPassword && (
                        <div>
                            <div className="flex items-center justify-between mb-2 pl-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                                <button
                                    onClick={handleForgotPassword}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <button
                        onClick={() => handleSubmit(clickedForgotPassword ? "send-otp" : "login")}
                        disabled={userLoading}
                        className="w-full mt-6 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {userLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {clickedForgotPassword ? 'Send Reset Code' : (userLoading ? 'Signing In...' : 'Sign In')}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/signUp" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
