import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '@headlessui/react';
import { Sparkles } from 'lucide-react'; // 또는 다른 감성적인 아이콘
const GptFeelingLoadingModal = ({ isOpen }) => {
    if (!isOpen)
        return null;
    return (_jsx(Dialog, { open: isOpen, onClose: () => { }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center max-w-sm mx-auto animate-pulse", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(Sparkles, { className: "w-10 h-10 text-blue-500 animate-spin-slow" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-2", children: "GPT\uAC00 \uB2F9\uC2E0\uC758 \uAE30\uBD84\uC744 \uB9D0\uB85C \uC815\uB9AC \uC911\uC774\uC5D0\uC694..." }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: "\uAC10\uC815\uC5D0 \uB531 \uB9DE\uB294 \uC601\uC5B4 \uD45C\uD604\uC744 \uACE0\uBBFC\uD558\uACE0 \uC788\uC5B4\uC694 \uD83D\uDCAD" })] }) }));
};
export default GptFeelingLoadingModal;
