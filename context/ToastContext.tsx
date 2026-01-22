"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer, ToastType, ToastProps } from "@/components/common/Toast";

interface ToastContextType {
    showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<Omit<ToastProps, "onClose">[]>([]);

    const showToast = useCallback(
        (message: string, type: ToastType, duration = 3000) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type, duration }]);
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
