"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase, Globe, PenTool, Layout, Save } from "lucide-react";
import { GenerationSidebar } from "@/components/GenerationSidebar";
import { WebsitePreview } from "@/components/WebsitePreview";

export default function WebsiteGeneratePage() {
    const [selectedCollection, setSelectedCollection] = useState("All");
    const [prompt, setPrompt] = useState("");

    // State for generation flow
    const [viewState, setViewState] = useState<"input" | "generating" | "preview">("input");
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        "Analyzing your requirements...",
        "Identifying key components...",
        "Drafting layout structure...",
        "Applying design system...",
        "Refining typography and colors...",
        "Finalizing preview..."
    ];

    const collections = [
        { id: "All", label: "All", icon: Sparkles },
        { id: "Portfolio", label: "Portfolio", icon: Briefcase },
        { id: "Landing Page", label: "Landing Page", icon: Globe },
        { id: "Blog", label: "Blog", icon: PenTool },
    ];

    const handleGenerate = () => {
        setViewState("generating");
        setCurrentStep(0);
    };

    // Simulate generation progress
    useEffect(() => {
        if (viewState === "generating") {
            const interval = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        // Optional: automatically switch to preview mode conceptual distinctness 
                        // but here we keep the "generating" layout visible as "preview" final state matches layout
                        setViewState("preview");
                        return prev;
                    }
                });
            }, 1200); // 1.2s per step

            return () => clearInterval(interval);
        }
    }, [viewState]);

    const isGenerationComplete = viewState === "preview";

    return (
        <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%]  rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%]  rounded-full blur-[120px]" />
            </div>

            <AnimatePresence mode="wait">
                {viewState === "input" ? (
                    <motion.div
                        key="input-view"
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        className="max-w-4xl w-full z-10 flex flex-col gap-12"
                    >
                        {/* Header */}
                        <div className="text-center space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl py-4 font-extrabold tracking-tight text-black"
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
                                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"}
                                        `}
                                    >
                                        <Icon size={16} className={isSelected ? "text-black" : "text-gray-400 group-hover:text-white"} />
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
                            {/* <div className="absolute -inset-0.5 bg-black rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div> */}
                            <div className="relative  backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all duration-300 focus-within:bg-gray-400/20 focus-within:border-white/20">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe your design idea... e.g., 'A minimalist portfolio hero section with large typography and a dark theme.'"
                                    className="w-full text-black placeholder-gray-500 p-4 text-lg outline-none resize-none h-32 rounded-xl"
                                />
                                <div className="flex justify-between items-center px-4 pb-2">
                                    <div className="flex gap-2">
                                        {/* Placeholder for future tools */}
                                    </div>
                                    <button
                                        onClick={handleGenerate}
                                        className="bg-white text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!prompt.trim()}
                                    >
                                        Generate <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto"
                    >
                        {/* Left Sidebar: Process & Actions */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            <div className="flex-1">
                                <GenerationSidebar currentStep={currentStep} steps={steps} />
                            </div>

                            {/* Actions (Only visible/active when done or for early exit) */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                                <button
                                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isGenerationComplete
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-white/5 text-black cursor-not-allowed"
                                        }`}
                                    disabled={!isGenerationComplete}
                                >
                                    <Layout size={18} />
                                    Create Site
                                </button>
                                <button
                                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border ${isGenerationComplete
                                        ? "border-white/20 text-black hover:bg-white/5"
                                        : "border-white/5 text-black cursor-not-allowed"
                                        }`}
                                    disabled={!isGenerationComplete}
                                >
                                    <Save size={18} />
                                    Save Draft
                                </button>
                            </div>
                        </div>

                        {/* Main Preview Area */}
                        <div className="lg:col-span-9 h-full">
                            <WebsitePreview isComplete={isGenerationComplete} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
