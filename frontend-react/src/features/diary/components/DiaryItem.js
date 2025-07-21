import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import DiaryDetail from './DiaryDetail';
import { emotionEmojiMap, emotionLabelMap } from '@/features/diary/types/emotionMap';
export default function DiaryItem({ diary, isOpen, onToggle }) {
    const emotionValue = Number(diary.emotion);
    const emotionEmoji = emotionEmojiMap[emotionValue] ?? '😶';
    const emotionLabel = emotionLabelMap[emotionValue] ?? '';
    return (_jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md border p-4 cursor-pointer transition-transform hover:scale-[1.02]", onClick: onToggle, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold", children: new Date(diary.createdAt).toLocaleDateString() }), _jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 line-clamp-2", children: diary.content })] }), _jsxs("div", { className: "flex items-center gap-2 text-right", children: [_jsx("span", { className: "text-2xl", children: emotionEmoji }), _jsx("span", { className: "text-sm text-gray-500", children: emotionLabel })] })] }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3 }, children: _jsx(DiaryDetail, { diary: diary }) })) })] }));
}
