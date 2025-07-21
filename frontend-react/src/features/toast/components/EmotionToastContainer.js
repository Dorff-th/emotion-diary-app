import { jsx as _jsx } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import { useEmotionToast } from '@/features/toast/hooks/useEmotionToast';
import EmotionToastItem from '@/features/toast/components/EmotionToastItem';
export const EmotionToastContainer = () => {
    const { toasts, removeToast } = useEmotionToast();
    return createPortal(_jsx("div", { className: "fixed top-4 right-4 flex flex-col gap-2 z-[9999]", children: toasts.map((toast) => (_jsx(EmotionToastItem, { toast: toast, onRemove: removeToast }, toast.id))) }), document.body);
};
