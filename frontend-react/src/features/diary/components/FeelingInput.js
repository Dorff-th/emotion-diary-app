import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import axiosInstance from "@/lib/axios/axiosInstance";
import clsx from 'clsx';
import { useToastHelper } from '@/features/toast/utils/toastHelper';
import GptFeelingLoadingModal from '@/features/ui/components/GptFeelingLoadingModal';
const FeelingInput = ({ value, onChange, selectedEnglish, onEnglishSelect }) => {
    const { showError } = useToastHelper();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchGptSuggestions = async (feelingKo) => {
        if (!feelingKo.trim())
            return;
        setLoading(true);
        try {
            const response = await axiosInstance.post('/user/gpt/feeling', { feelingKo }, { meta: { skipGlobalLoading: true } } // 요게 핵심! 👈
            );
            setSuggestions(response.data.suggestions || []);
        }
        catch (error) {
            showError('GPT 영어 표현 추천 실패');
            console.error('GPT 추천 실패:', error);
            setSuggestions([]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleGenerate = () => {
        fetchGptSuggestions(value);
    };
    return (_jsxs(_Fragment, { children: [_jsx(GptFeelingLoadingModal, { isOpen: loading }), _jsxs("div", { className: "bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg transition-colors duration-500 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uC624\uB298 \uAE30\uBD84 \uD55C\uB9C8\uB514 (\uD55C\uAE00\uB85C)" }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { type: "text", placeholder: "\uC608: \uBB54\uAC00 \uBB34\uAE30\uB825\uD588\uC5B4...", value: value, onChange: (e) => onChange(e.target.value), className: "w-full border border-gray-300 rounded px-3 py-2 text-black bg-white dark:bg-white dark:text-black placeholder:text-gray-400" }), _jsx("button", { onClick: handleGenerate, disabled: loading, className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: loading ? '추천 중...' : 'GPT 추천' })] }), suggestions.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-3 dark:text-black", children: suggestions.map((s, idx) => (_jsx("button", { onClick: () => onEnglishSelect(s), className: clsx('px-4 py-2 rounded border text-sm transition-all', selectedEnglish === s
                                ? 'bg-blue-100 border-blue-400'
                                : 'bg-gray-100 border-gray-300 hover:border-gray-400'), children: s }, idx))) }))] })] }));
};
export default FeelingInput;
