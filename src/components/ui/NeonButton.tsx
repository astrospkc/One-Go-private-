// components/NeonButton.tsx
import React from "react";

interface NeonButtonProps {
    label: string;
    onClick?: () => void;
    fullWidth?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({
    label,
    onClick,
    fullWidth = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        relative px-6 py-3 w-full my-2 rounded-xl font-semibold text-sm text-white
        bg-linear-to-r from-indigo-600 to-violet-600
        shadow-[0_0_15px_rgba(129,140,248,0.35)]
        hover:shadow-[0_0_30px_rgba(129,140,248,0.6)]
        transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer
        ${fullWidth ? "w-full" : "w-auto"}
      `}
        >
            {label}

            {/* glow overlay */}
            <span className="absolute inset-0 rounded-xl bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
        </button>
    );
};

export default NeonButton;
