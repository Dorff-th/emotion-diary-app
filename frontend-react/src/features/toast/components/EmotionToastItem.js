import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/EmotionToast/EmotionToastItem.tsx
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
export const toastImageMap = {
    success: '/assets/toast/toast_char_1.png',
    error: '/assets/toast/toast_char_2.png',
    warn: '/assets/toast/toast_char_3.png',
    info: '/assets/toast/toast_char_4.png',
    gpt: '/assets/toast/toast_char_5.png',
    custom: '/assets/toast/toast_char_6.png',
};
const EmotionToastItem = ({ toast, onRemove }) => {
    const [animateOut, setAnimateOut] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => {
        // 2.8초에 사라짐 애니메이션 시작 → 3초 후 제거
        const timeout1 = setTimeout(() => setAnimateOut(true), 2800);
        const timeout2 = setTimeout(() => onRemove(toast.id), 3000);
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [toast.id, onRemove]);
    //마우스 오버시 토스트 멈춤 그리고 클릭시 사라지게 start
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setAnimateOut(true);
            setTimeout(() => onRemove(toast.id), 200); // 제거는 부드럽게
        }, 3000);
        return () => {
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, [toast.id, onRemove]);
    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setAnimateOut(true);
            setTimeout(() => onRemove(toast.id), 200);
        }, 2000); // 다시 2초만 기다림
    };
    const handleClick = () => {
        setAnimateOut(true);
        setTimeout(() => onRemove(toast.id), 200);
    };
    //마우스 오버시 토스트 멈춤 그리고 클릭시 사라지게 end
    return (_jsxs("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onClick: handleClick, className: clsx('w-[280px] flex items-start gap-3 rounded-lg p-4 shadow-lg', 'text-gray-800 dark:text-gray-100', 'border border-gray-200 dark:border-gray-700', 'transform transition-all duration-300 ease-out', !animateOut ? 'animate-popBounce opacity-100' : 'opacity-0 translate-y-2', {
            'bg-green-500 bg-opacity-80': toast.type === 'success',
            'bg-red-500 bg-opacity-80': toast.type === 'error',
            'bg-blue-500 bg-opacity-80': toast.type === 'info',
            'bg-yellow-500 bg-opacity-80': toast.type === 'warn',
            'bg-purple-500 bg-opacity-80': toast.type === 'gpt',
            'bg-gray-700 bg-opacity-80': toast.type === 'custom',
            'dark:bg-opacity-80 bg-opacity-70': true,
        }), children: [_jsx("button", { onClick: handleClick, className: "absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-black dark:hover:text-white transition cursor-pointer", "aria-label": "\uB2EB\uAE30", children: "\u00D7" }), _jsxs("div", { className: "flex items-start gap-2 w-full", children: [_jsx("div", { className: "w-10 h-10 flex-shrink-0", children: _jsx("img", { src: toastImageMap[toast.type], alt: "toast icon", className: "w-full h-full object-contain" }) }), _jsx("div", { className: "flex-1 text-[15px] font-medium break-words whitespace-pre-line", children: toast.message })] }), _jsx("div", { className: "absolute bottom-0 left-0 w-full h-1 bg-transparent", children: _jsx("div", { className: "h-full bg-blue-400 animate-progressBar" }) })] }));
};
export default EmotionToastItem;
