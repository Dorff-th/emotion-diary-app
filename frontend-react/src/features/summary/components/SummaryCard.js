import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useToastHelper } from '@/features/toast/utils/toastHelper'; // 너의 토스트 헬퍼 기준
import { fetchTodayGptSummary } from '../api/summaryApi';
const SummaryCard = ({ summary, onSummaryUpdated }) => {
    const { showSuccess, showError } = useToastHelper();
    const [loading, setLoading] = useState(false);
    const toast = useToastHelper();
    const [gptSummary, setGptSummary] = useState(null);
    useEffect(() => {
        fetchTodayGptSummary()
            .then(data => setGptSummary(data.summary))
            .finally(() => setLoading(false));
    }, []);
    return (_jsxs("div", { className: "rounded-xl bg-purple-50 p-4 shadow-sm", children: [_jsx("h3", { className: "text-md font-semibold mb-2", children: "GPT \uC694\uC57D" }), gptSummary ? (_jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: gptSummary })) : (_jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500 mb-2", children: "\uC544\uC9C1 \uC694\uC57D\uC774 \uC5C6\uC5B4\uC694." }) }))] }));
};
export default SummaryCard;
