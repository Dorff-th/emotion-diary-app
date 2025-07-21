import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { emotionList } from '@/features/diary/types/emotionMap';
const EmotionSelector = ({ selected, onChange }) => {
    return (_jsxs("div", { className: "bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg transition-colors duration-500 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uC624\uB298 \uAC10\uC815\uC740 \uC5B4\uB560\uB098\uC694?" }), _jsx("div", { className: "flex justify-between gap-4", children: emotionList.map((item) => (_jsx("button", { onClick: () => onChange(item.value), className: clsx('text-3xl transition-transform duration-200', selected === item.value ? 'scale-125 border-2 border-blue-400 rounded-full' : 'opacity-70'), title: item.label, children: item.emoji }, item.value))) })] }));
};
export default EmotionSelector;
