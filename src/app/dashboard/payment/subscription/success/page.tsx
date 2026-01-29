"use client";

import { paymentService } from "@/services/paymentService";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, Suspense } from "react";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

function PaymentSuccessContent() {
    const sp = useSearchParams()
    const { token } = useAuthStore()

    useLayoutEffect(() => {
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
        const subscribe = async () => {
            if (token && RazorpayPaymentId) {
                const response = await paymentService.subscriptionActive(token, queries)
                if (response.success) {
                    console.log("subscribed")
                }
                toast.success(response.message)
            }
        }
        subscribe()
    }, [token, sp])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black font-sans p-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center max-w-lg text-center p-8 bg-white"
            >
                <div className="mb-8 rounded-full bg-green-50 p-6 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900"
                >
                    Payment Successful
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-8 text-lg text-gray-500 max-w-sm mx-auto leading-relaxed"
                >
                    Your subscription is now active. You have full access to all premium features.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Link
                        href="/dashboard"
                        className="group inline-flex h-12 items-center justify-center rounded-xl bg-black px-8 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] shadow-sm"
                    >
                        <span>Continue to Dashboard</span>
                        <svg
                            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div></div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
