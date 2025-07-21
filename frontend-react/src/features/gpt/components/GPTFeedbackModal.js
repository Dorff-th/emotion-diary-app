import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/feedback/GPTFeedbackModal.tsx
import { useEffect } from 'react';
import { feedbackStyleMap } from '@/features/gpt/types/feedbackTypes';
const GPTFeedbackModal = ({ message, onClose, type = 'default', duration = 3000, }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    const style = feedbackStyleMap[type];
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm", children: _jsxs("div", { className: `animate-slideDownCenter ${style.bgColor} border-2 ${style.borderColor} text-black dark:text-black rounded-xl shadow-2xl w-[90%] max-w-md px-6 py-6`, children: [_jsx("p", { className: "text-xs text-gray-600 dark:text-black-300 mb-1", children: "\uC800\uC7A5 \uC911..." }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: style.emoji }), _jsx("span", { className: "text-base font-medium", children: message })] }), _jsx("div", { className: "mt-4 text-center", children: _jsx("button", { onClick: onClose, className: "px-5 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-semibold", children: "OK" }) })] }) }));
};
export default GPTFeedbackModal;
