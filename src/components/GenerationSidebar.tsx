import React from "react";
import { Check, Circle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface GenerationSidebarProps {
    currentStep: number;
    steps: string[];
}

export const GenerationSidebar: React.FC<GenerationSidebarProps> = ({
    currentStep,
    steps,
}) => {
    return (
        <div className="w-full bg-white/5 text-black backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 text-black bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-400">
                Building Process
            </h3>
            <div className="relative border-l border-white/10 ml-3.5 space-y-8 pb-2">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8"
                        >
                            {/* Timeline Dot */}
                            <div
                                className={`absolute -left-[11px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isCompleted
                                    ? "bg-green-500 border-green-500"
                                    : isCurrent
                                        ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                        : "bg-gray-900 border-gray-700"
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check size={12} className="text-white" />
                                ) : isCurrent ? (
                                    <Loader2 size={12} className="text-white animate-spin" />
                                ) : (
                                    <Circle size={6} className="text-gray-500" />
                                )}
                            </div>

                            {/* Text */}
                            <p
                                className={`text-sm font-medium transition-colors duration-300 ${isCompleted || isCurrent ? "text-black" : "text-gray-500"
                                    }`}
                            >
                                {step}
                            </p>
                            {isCurrent && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-blue-400 block mt-1"
                                >
                                    Processing...
                                </motion.span>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
