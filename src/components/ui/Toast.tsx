"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState, createContext, useContext } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

const ToastContext = createContext<{ showToast: (msg: string, type?: ToastType) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === "success"
                                ? "bg-white border-emerald-100 text-emerald-800"
                                : toast.type === "error"
                                    ? "bg-white border-red-100 text-red-800"
                                    : "bg-white border-blue-100 text-blue-800"
                                }`}
                        >
                            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                            {toast.type === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                            {toast.type === "info" && <AlertCircle className="w-5 h-5 text-blue-500" />}
                            <span className="text-sm font-medium">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};
