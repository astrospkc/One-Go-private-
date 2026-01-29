"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Layout, Globe, Briefcase, ShoppingBag, PenTool } from "lucide-react";

export default function WebsiteGeneratePage() {
    const [selectedCollection, setSelectedCollection] = useState("All");
    const [prompt, setPrompt] = useState("");

    const collections = [
        { id: "All", label: "All", icon: Sparkles },
        { id: "Portfolio", label: "Portfolio", icon: Briefcase },
        { id: "Landing Page", label: "Landing Page", icon: Globe },
        { id: "Blog", label: "Blog", icon: PenTool },

    ];

    return (
        <div className="min-h-screen bg-white text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl w-full z-10 flex flex-col gap-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl py-4 font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-400"
                    >
                        Design Your Vision
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto font-semibold"
                    >
                        Select a style, describe your dream component, and let us build it for you.
                    </motion.p>
                </div>

                {/* Collection Selector */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {collections.map((item) => {
                        const isSelected = selectedCollection === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedCollection(item.id)}
                                className={`
                  relative group px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300
                  ${isSelected
                                        ? "bg-black text-white  shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                        : "bg-black/5 text-gray-400 hover:bg-black/10 hover:text-black border border-white/5"}
                `}
                            >
                                <Icon size={16} className={isSelected ? "text-white" : "text-gray-800 group-hover:text-black"} />
                                {item.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Prompt Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group w-full max-w-2xl mx-auto"
                >
                    <div className="absolute -inset-0.5 bg-white rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative bg-white backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all duration-300 focus-within:bg-gray-300/40 focus-within:border-white/20">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your design idea... e.g., 'A minimalist portfolio hero section with large typography and a dark theme.'"
                            className="w-full bg-transparent text-black placeholder-gray-500 p-4 text-lg outline-none resize-none h-32 rounded-xl"
                        />
                        <div className="flex justify-between items-center px-4 pb-2">
                            <div className="flex gap-2">
                                {/* Placeholder for future tools/attachments */}
                            </div>
                            <button
                                className="bg-white text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!prompt.trim()}
                            >
                                Generate <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
