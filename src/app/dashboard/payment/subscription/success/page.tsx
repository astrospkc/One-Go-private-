"use client";

import { paymentService } from "@/services/paymentService";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
    const sp = useSearchParams()
    const RazorpayPaymentId = sp.get("razorpay_payment_id")
    const RazorpayPaymentLinkId = sp.get("razorpay_payment_link_id")
    const RazorpayPaymentLinkReferenceId = sp.get("razorpay_payment_link_reference_id")
    const RazorpayPaymentLinkStatus = sp.get("razorpay_payment_link_status")
    const RazorpaySignature = sp.get("razorpay_signature")
    const queries = {
        RazorpayPaymentId,
        RazorpayPaymentLinkId,
        RazorpayPaymentLinkReferenceId,
        RazorpayPaymentLinkStatus,
        RazorpaySignature
    }
    const { token } = useAuthStore()
    useLayoutEffect(() => {
        const subscribe = async () => {
            const response = await paymentService.subscriptionActive(token, queries)
            if (response.success) {
                console.log("subscribed")
            }
            toast.success(response.message)
        }
        subscribe()
    }, [token])
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0b0e] text-white p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center max-w-md text-center"
            >
                <div className="mb-8 rounded-full bg-green-500/10 p-8 ring-1 ring-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <svg
                        className="w-16 h-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-3 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600"
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mb-10 text-lg text-gray-400"
                >
                    Thank you for subscribing. Your account has been successfully upgraded.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Link
                        href="/dashboard"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-8 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    >
                        <span className="mr-2">Go to Dashboard</span>
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
