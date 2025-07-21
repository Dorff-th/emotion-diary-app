import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DiaryTextarea = ({ value, onChange }) => {
    return (_jsxs("div", { className: "bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg transition-colors duration-500 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uC624\uB298\uC758 \uD68C\uACE0" }), _jsx("textarea", { placeholder: "\uD558\uB8E8\uB97C \uB418\uB3CC\uC544\uBCF4\uBA70 \uC790\uC720\uB86D\uAC8C \uC801\uC5B4\uBCF4\uC138\uC694...", value: value, onChange: (e) => onChange(e.target.value), className: "w-full h-40 border border-gray-300 rounded px-3 py-2 resize-none text-black bg-white dark:bg-white dark:text-black placeholder:text-gray-400" })] }));
};
export default DiaryTextarea;
