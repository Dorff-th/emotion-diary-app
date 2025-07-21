import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { feedbackStyleMap } from '@/features/gpt/types/feedbackTypes';
//export type FeedbackType = '위로' | '칭찬' | '갈굼' | '비웃음' | '랜덤';
//const options: FeedbackType[] = ['위로', '칭찬', '갈굼', '비웃음', '랜덤'];
const FeedbackTypeSelect = ({ value, onChange }) => {
    return (_jsxs("div", { className: "bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg transition-colors duration-500 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "GPT \uD53C\uB4DC\uBC31 \uC2A4\uD0C0\uC77C \uC120\uD0DD" }), _jsx("select", { value: value, onChange: (e) => onChange(e.target.value), className: "border border-gray-300 px-4 py-2 rounded w-full text-black bg-white dark:bg-white", children: Object.entries(feedbackStyleMap).map(([key, style]) => (_jsxs("option", { value: key, children: [style.emoji, " ", style.label] }, key))) })] }));
};
export default FeedbackTypeSelect;
