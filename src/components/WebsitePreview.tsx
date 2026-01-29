import React from "react";
import { motion } from "framer-motion";

interface WebsitePreviewProps {
    isComplete: boolean;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
    isComplete,
}) => {
    return (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-gray-200 shadow-2xl flex flex-col relative text-black">
            {/* Mock Browser Header */}
            <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-xs text-gray-500 font-mono bg-white mx-4 rounded-md py-0.5 border border-gray-200">
                    one-go-generated.com
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto bg-white relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col"
                >
                    {/* Hero Section */}
                    <header className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-gray-50 to-white">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: isComplete ? 1 : 0.5 }}
                            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-slate-800 to-gray-600 mb-6"
                        >
                            Create Something Extraordinary.
                        </motion.h1>
                        <div className="w-24 h-1 bg-black mb-8 rounded-full opacity-10"></div>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: isComplete ? 1 : 0.5 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 max-w-lg text-lg leading-relaxed"
                        >
                            This is a preview of the website structure generated based on your prompt.
                            The design emphasizes minimalism and readability.
                        </motion.p>
                        <div className="mt-10 flex gap-4">
                            <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform">Get Started</button>
                            <button className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">Learn More</button>
                        </div>
                    </header>

                    {/* Features Mock */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-white">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Loading Overlay */}
                {!isComplete && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                            <p className="text-sm font-medium text-gray-500">Rendering Preview...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
