"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';
import { Loader2, ArrowLeft, Upload, Check, User, Mail, Lock, Briefcase } from 'lucide-react';

export default function SignUpPage() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [clickedSendOtp, setClickedSendOtp] = useState(false)
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false);

    const { setUser, setIsAuthenticated, setUserLoading, setToken } = useAuthStore();
    const router = useRouter()

    const handleSubmit = async (type: string) => {
        if (type == "send-otp") {
            if (!name || !email || !password || !role) {
                toast.error("Please fill in all fields");
                return;
            }
            try {
                setLoading(true);
                await authService.registerSendOtp({ name, email, password, role, file: profilePic })
                setClickedSendOtp(true)
                toast.success("OTP sent to your email!");
            } catch (error) {
                console.error(error)
                toast.error("Failed to send OTP. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        if (type == "verify-otp") {
            if (!otp) {
                toast.error("Please enter the OTP");
                return;
            }
            try {
                setLoading(true);
                const registerVerifyOtpRes = await authService.registerVerifyOtp(email, otp)
                const { token, user, code } = registerVerifyOtpRes
                if (code == 200) {
                    setUser(user)
                    localStorage.setItem("token", token)
                    setToken(token)
                    setIsAuthenticated(true)
                    setUserLoading(false)
                    toast.success("Account created successfully!");
                    router.push("/dashboard")
                }
            } catch (error) {
                console.error(error)
                toast.error("Invalid OTP or registration failed.");
            } finally {
                setLoading(false);
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file && file[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                setProfilePic(reader.result as string)
                toast.success("Profile picture uploaded")
            }
            reader.readAsDataURL(file[0])
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">

                {clickedSendOtp && (
                    <button
                        onClick={() => setClickedSendOtp(false)}
                        className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                )}

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                        {clickedSendOtp ? 'Verify Account' : 'Create Account'}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {clickedSendOtp
                            ? 'Enter the code sent to your email'
                            : 'Join us to start your journey'}
                    </p>
                </div>

                <div className="space-y-4">
                    {clickedSendOtp ? (
                        <>
                            {/* Step 2: OTP Verification */}
                            <div className="bg-indigo-50 p-4 rounded-xl mb-4 text-center">
                                <p className="text-xs text-indigo-800 font-medium">Code sent to: {email}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 pl-1">OTP Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400 text-center tracking-widest text-lg"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Step 1: Registration Form */}
                            <div className="relative flex items-center">
                                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Role (e.g., Developer, Designer)"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>

                            {/* Custom File Upload */}
                            <div className="relative">
                                <input
                                    type="file"
                                    id="profile-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="profile-upload"
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${profilePic ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'}`}
                                >
                                    {profilePic ? (
                                        <>
                                            <Check className="w-4 h-4" /> <span>Profile Picture Selected</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" /> <span>Upload Profile Picture</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </>
                    )}

                    <button
                        onClick={() => handleSubmit(clickedSendOtp ? "verify-otp" : "send-otp")}
                        disabled={loading}
                        className="w-full mt-4 bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {clickedSendOtp ? 'Verify & Create Account' : (loading ? 'Processing...' : 'Send OTP')}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/auth/signIn" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
