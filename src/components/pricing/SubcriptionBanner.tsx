// components/SubscriptionBanner.tsx
import React from "react";

interface SubscriptionBannerProps {
    plan?: "free" | "pro" | "team";
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ plan = "free" }) => {
    if (plan !== "free") return null;

    return (
        <div className="relative overflow-hidden bg-[#0A0B12] border border-white/10 rounded-3xl p-6 shadow-xl">

            {/* Gradient blurs */}
            <div className="absolute -top-16 -left-12 w-48 h-48 bg-violet-600/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -right-16 w-64 h-64 bg-indigo-500/30 blur-3xl rounded-full" />

            {/* Badge */}
            <span className="relative inline-block text-[0.65rem] font-semibold tracking-wide text-indigo-300 bg-indigo-700/20 px-3 py-1 rounded-full backdrop-blur-md">
                API ACCESS UPGRADE
            </span>

            {/* Title */}
            <h2 className="relative text-xl md:text-2xl font-extrabold text-white mt-3 leading-snug">
                Unlock Full Write Access
            </h2>

            {/* Subtitle */}
            <p className="relative mt-2 text-white/70 text-sm max-w-md">
                Upgrade your plan to enable write actions and manage content via API:
            </p>

            {/* Features List */}
            <ul className="relative mt-3 space-y-2 text-white/85 text-sm">
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <b>Create</b> new content via <code className="bg-indigo-700/30 px-1 py-0.5 rounded text-[0.7rem]">POST</code>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <b>Edit</b> content with <code className="bg-indigo-700/30 px-1 py-0.5 rounded text-[0.7rem]">PATCH</code> & <code className="bg-indigo-700/30 px-1 py-0.5 rounded text-[0.7rem]">PUT</code>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <b>Delete</b> content using <code className="bg-indigo-700/30 px-1 py-0.5 rounded text-[0.7rem]">DELETE</code>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Higher rate limits & priority support
                </li>
            </ul>

            {/* CTA Button */}
            <button
                className="relative mt-6 w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-white
        bg-linear-to-r from-indigo-600 to-violet-600 shadow-[0_0_20px_rgba(129,140,248,0.35)]
        hover:shadow-[0_0_35px_rgba(129,140,248,0.6)] transition-all hover:-translate-y-0.5 hover:cursor-pointer"
                onClick={() => (window.location.href = "/pricing")}
            >
                Upgrade to Pro
            </button>

            {/* Glow overlay */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default SubscriptionBanner;
