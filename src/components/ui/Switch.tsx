"use client";

import { motion } from "framer-motion";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
    return (
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChange(!checked)}>
            <div
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? "bg-blue-600" : "bg-slate-300"
                    }`}
            >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`bg-white w-5 h-5 rounded-full shadow-md`}
                    animate={{ x: checked ? 20 : 0 }}
                />
            </div>
            {label && <span className="text-sm font-medium text-slate-700 select-none">{label}</span>}
        </div>
    );
}
