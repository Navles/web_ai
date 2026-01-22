"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    onClose: (id: string) => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
};

const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
};

export const Toast: React.FC<ToastProps> = ({
    id,
    message,
    type,
    duration = 3000,
    onClose,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, id, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            layout
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${bgColors[type]} min-w-[300px] max-w-md pointer-events-auto`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-medium text-slate-800 flex-1">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="p-1 rounded-full hover:bg-black/5 transition-colors text-slate-500"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: Omit<ToastProps, "onClose">[];
    removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    removeToast,
}) => {
    // Use createPortal to render toasts at the document root level
    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};
