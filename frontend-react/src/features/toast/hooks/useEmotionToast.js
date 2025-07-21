// src/components/EmotionToast/useEmotionToast.ts
import { createContext, useContext, useState } from 'react';
export const ToastContext = createContext(null);
export const useEmotionToastState = () => {
    const [toasts, setToasts] = useState([]);
    const showToast = ({ message, type = 'info' }) => {
        const id = Date.now().toString();
        const newToast = { id, message, type };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };
    return { toasts, showToast, removeToast };
};
export const useEmotionToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('EmotionToastProvider로 감싸야 합니다.');
    return context;
};
