"use client"

import { paymentService } from "@/services/paymentService";
import { useAuthStore } from "@/store/authStore";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const plans = [
    {
        id: 1,
        plan_name: "Starter",
        about: "For personal projects and testing",
        price: "₹0",
        button: "Get Started",
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
        about: ">For teams & high-traffic apps",
        price: "₹299",
        button: "Talk to Sales",
        features: [
            "100 GB storage",
            "Priority support",
            "Analytics & versioning",
            "Secure access controls"
        ]
    }
]

// const handleSubscriptionPlan = 


export default function PricingSection() {

    const { user, token, isAuthenticated } = useAuthStore()

    const handleSubscriptionPlan = async (plan: string) => {
        try {
            if (isAuthenticated) {
                const payload = {
                    plan: plan
                }
                const { success, data } = await paymentService.createPaymentLink(payload, token)
                window.location.href = data.short_url


            } else {
                window.location.href = "/auth/signIn"
                toast.error("Your need to first have an account to subscribe. Login first or create an account.")

            }

        } catch (error) {
            throw new Error("Something went wrong while handling subscription plan.")
        }
    }
    return (
        <div className="p-8 bg-[#0b0b0e] text-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-6xl   font-bold  bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
                    Pricing
                </h1>
            </div>

            <p className="text-center max-w-2xl text-gray-300 mb-16">
                Simple, scalable pricing for developers and teams. Start for free and grow as you go.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {
                    plans && plans.map((plan, id) => (
                        <div key={id} className={`relative bg-linear-to-r from-[#1d1d35]/20 to-[#121226]/20 p-8 rounded-2xl shadow-xl border border-[#2b2b40] hover:cursor-pointer  hover:from-purple-500 hover:to-violet-700/20 hover:scale-105 transform transition-all duration-500 ease-in-out
    `}>
                            <div className="absolute w-32 h-32 top-0 left-0 rounded-full bg-linear-to-r from-purple-500 to-violet-700 blur-xl opacity-30"></div>
                            <div className="absolute w-32 h-32 bottom-0 right-0 rounded-full bg-linear-to-r from-purple-500 to-violet-700 blur-xl opacity-30"></div>

                            <h2 className="text-2xl font-semibold mb-2"> {plan.plan_name}</h2>
                            <p className="text-lg text-gray-300 mb-6">{plan.about}</p>
                            <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg text-gray-400">/month</span></p>
                            <button onClick={() => handleSubscriptionPlan(plan.plan_name.toLocaleLowerCase())} className="w-full py-2 rounded-xl border border-gray-400 hover:bg-white hover:text-black transition hover:cursor-pointer">{plan.button}</button>

                            <ul className="mt-6 space-y-3 text-sm">
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className={"text-gray-200"}
                                    >
                                        ✔ {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

