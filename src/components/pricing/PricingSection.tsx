"use client"

import { paymentService } from "@/services/paymentService";
import { useAuthStore } from "@/store/authStore";
import { usePaymentStore } from "@/store/paymentStore";
import toast from "react-hot-toast";
import { Check } from 'lucide-react';


const plans = [
    {
        id: 1,
        plan_name: "Starter",
        about: "For personal projects and testing",
        price: "₹0",
        button: "Get Started",
        highlight: false,
        features: [
            "1 GB storage",
            "Basic API access",
            "Public file hosting",
            "Community support"
        ]
    },
    {
        id: 2,
        plan_name: "Creator",
        about: "Most Popular – for indie devs",
        price: "₹99",
        button: "Upgrade Now",
        highlight: true,
        features: [
            "10 GB storage",
            "Standard bandwidth",
            "Unlimited projects",
            "Email support"
        ]
    },
    {
        id: 3,
        plan_name: "Pro",
        about: "For teams & high-traffic apps",
        price: "₹299",
        button: "Talk to Sales",
        highlight: false,
        features: [
            "100 GB storage",
            "Priority support",
            "Analytics & versioning",
            "Secure access controls"
        ]
    }
]

export default function PricingSection() {

    const { token, isAuthenticated } = useAuthStore()
    const { plan, isActive } = usePaymentStore()

    const handleSubscriptionPlan = async (selectedPlan: string) => {
        try {
            if (isAuthenticated) {
                const payload = {
                    plan: selectedPlan
                }
                const { data } = await paymentService.createPaymentLink(payload, token)
                window.location.href = data.short_url
            } else {
                window.location.href = "/auth/signIn"
                toast.error("Your need to first have an account to subscribe. Login first or create an account.")
            }
        } catch (error: unknown) {
            console.error("Error fetching subscription plan: ", error)
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <div className="bg-white text-gray-900 py-16 flex flex-col items-center border-t border-gray-100">

            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                    Simple, transparent pricing
                </h2>
                <p className="max-w-xl mx-auto text-lg text-gray-500">
                    Choose the plan that's right for you. Change or cancel at any time.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
                {
                    plans && plans.map((p, id) => (
                        <div
                            key={id}
                            className={`
                                relative p-8 rounded-3xl border transition-all duration-300 flex flex-col
                                ${p.highlight
                                    ? "bg-black text-white border-black shadow-2xl scale-105"
                                    : "bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:shadow-xl"
                                }
                            `}
                        >
                            {p.highlight && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">{p.plan_name}</h3>
                            <p className={`text-sm mb-6 ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>{p.about}</p>

                            <div className="flex items-baseline mb-8">
                                <span className="text-5xl font-extrabold">{p.price}</span>
                                <span className={`ml-2 text-sm font-medium ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>/month</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {p.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm font-medium">
                                        <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${p.highlight ? "text-indigo-400" : "text-indigo-600"}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {
                                p.plan_name.toLocaleLowerCase() === plan && isActive ? (
                                    <button disabled className="w-full py-3 rounded-xl border border-transparent bg-green-500 text-white font-semibold cursor-default">
                                        Active Plan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSubscriptionPlan(p.plan_name.toLocaleLowerCase())}
                                        className={`
                                            w-full py-3 rounded-xl font-semibold transition-all shadow-sm
                                            ${p.highlight
                                                ? "bg-white text-black hover:bg-gray-100"
                                                : "bg-black text-white hover:bg-gray-800"
                                            }
                                        `}
                                    >
                                        {p.button}
                                    </button>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
