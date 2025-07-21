import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axios/axiosInstance';
import Header from '@/features/layout/components/Header';
import EmotionRangeSlider from '@/features/ui/components/EmotionRangeSlider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
const defaultFields = ['feelingKo', 'feelingEn', 'content', 'feedback'];
const fieldLabels = {
    feelingKo: '감정 한마디 (한글)',
    feelingEn: '감정 한마디 (영문)',
    content: '회고 본문',
    feedback: 'GPT 피드백',
};
const highlightKeyword = (text, keyword) => {
    if (!keyword)
        return text;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 정규식 이스케이프
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
};
const SearchResultPage = () => {
    const [emotionRange, setEmotionRange] = useState([1, 5]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const formatDate = (date) => date.toISOString().split('T')[0];
    const [selectedFields, setSelectedFields] = useState([]);
    const effectiveFields = selectedFields.length > 0 ? selectedFields : defaultFields;
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // ✅ 추가
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('query') ?? '';
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const size = parseInt(searchParams.get('size') ?? '10', 10);
    const fetchResults = async () => {
        try {
            const response = await axiosInstance.post(`/user/diaries/search?page=${page - 1}&size=${size}`, {
                query,
                fields: effectiveFields,
                emotionMap: {
                    min: emotionRange[0],
                    max: emotionRange[1],
                },
                diaryDateMap: startDate && endDate
                    ? {
                        startDate: formatDate(startDate),
                        endDate: formatDate(endDate),
                    }
                    : undefined,
            });
            setResults(response.data.content || []);
            setTotalPages(response.data.totalPages || 1); // ✅ totalPages 세팅
        }
        catch (error) {
            console.error('검색 실패:', error);
        }
    };
    useEffect(() => {
        fetchResults();
    }, [searchParams]);
    const handleSearchClick = () => {
        setSearchParams({
            query,
            page: '1',
            size: size.toString(),
        });
    };
    const handlePageChange = (newPage) => {
        setSearchParams((prev) => {
            prev.set('page', String(newPage));
            return prev;
        });
    };
    const toggleField = (field) => {
        setSelectedFields((prev) => prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: "min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500", children: _jsxs("div", { className: "p-4", children: [_jsxs("h2", { className: "text-lg font-bold mb-2", children: ["\uD83D\uDD0D \u2018", query, "\u2019 \uAC80\uC0C9 \uACB0\uACFC"] }), query && (_jsxs("p", { className: "text-sm text-gray-500 mb-4", children: ["\uCD1D ", _jsx("strong", { children: results.length }), "\uAC74\uC758 \uACB0\uACFC\uAC00 \uAC80\uC0C9\uB418\uC5C8\uC2B5\uB2C8\uB2E4."] })), _jsxs("div", { className: "p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border border-blue-200 mb-8", children: [_jsx("div", { className: "flex gap-3 flex-wrap mb-4", children: defaultFields.map((field) => (_jsxs("label", { className: "flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300", children: [_jsx("input", { type: "checkbox", checked: selectedFields.includes(field), onChange: () => toggleField(field), className: "accent-blue-600 w-4 h-4" }), fieldLabels[field]] }, field))) }), _jsxs("div", { className: "w-full max-w-[400px] px-4 mb-6", children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2", children: "\uAC10\uC815 \uC810\uC218 (\uBC94\uC704 \uC124\uC815)" }), _jsx(EmotionRangeSlider, { value: emotionRange, onChange: setEmotionRange })] }), _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, adapterLocale: ko, children: _jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700", children: [_jsx(DatePicker, { label: "\uC2DC\uC791\uC77C", value: startDate, onChange: (newValue) => setStartDate(newValue) }), _jsx("span", { className: "text-gray-500", children: "~" }), _jsx(DatePicker, { label: "\uC885\uB8CC\uC77C", value: endDate, onChange: (newValue) => setEndDate(newValue) })] }) }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: fetchResults, className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-200", children: "\uD83D\uDD0D \uAC80\uC0C9" }) })] }), _jsx("ul", { className: "space-y-4", children: results.map((entry) => (_jsxs("li", { className: "p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["\uD83D\uDCC5 ", entry.diaryDate] }), _jsx("div", { className: "text-xl mt-1", dangerouslySetInnerHTML: { __html: highlightKeyword(entry.content, query) } }), _jsx("div", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", dangerouslySetInnerHTML: {
                                            __html: highlightKeyword(`감정: ${entry.feelingKo} / ${entry.feelingEn} | 😶 감정 점수: ${entry.emotion}`, query),
                                        } })] }, entry.id))) }), _jsxs("div", { className: "flex justify-center gap-3 mt-6", children: [_jsx("button", { onClick: () => handlePageChange(page - 1), disabled: page <= 1, className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50", children: "\u25C0 \uC774\uC804" }), _jsxs("span", { className: "text-sm text-gray-700", children: [page, " / ", totalPages] }), _jsx("button", { onClick: () => handlePageChange(page + 1), disabled: page >= totalPages, className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50", children: "\uB2E4\uC74C \u25B6" })] })] }) })] }));
};
export default SearchResultPage;
