import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/diary/DiaryListForDateModal.tsx
import { useState } from 'react';
import { emotionEmojiMap } from '@/features/diary/types/emotionMap';
import { X } from 'lucide-react';
import { generateGptSummary } from '@/features/gpt/api/gptSummaryApi'; // ✅ 추가
import { useToastHelper } from '@/features/toast/utils/toastHelper';
const DiaryListForDateModal = ({ date, onClose, diaryEntries, summary, onSummaryGenerated }) => {
    const [openEntryId, setOpenEntryId] = useState(null);
    const [gptSummary, setGptSummary] = useState(summary || null);
    const [loading, setLoading] = useState(false);
    const dayData = diaryEntries;
    const diaryList = dayData ?? [];
    // 최신순 정렬
    const sortedList = [...diaryList].sort((a, b) => Number(b.id) - Number(a.id));
    const { showError, showSuccess } = useToastHelper();
    const handleGptSummaryClick = async () => {
        try {
            setLoading(true);
            const result = await generateGptSummary(date);
            setGptSummary(result);
            onSummaryGenerated?.(result);
            showSuccess('GPT 요약 생성 완료!');
        }
        catch (error) {
            showError('GPT 요약 생성 중 오류 발생!');
        }
        finally {
            setLoading(false);
        }
    };
    const parsedHabits = ((habitTags) => {
        try {
            return JSON.parse(habitTags);
        }
        catch (e) {
            return [];
        }
    });
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg max-w-xl w-full p-6 relative", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-black", children: _jsx(X, { size: 24 }) }), _jsxs("h2", { className: "text-xl font-bold mb-4", children: ["\uD83D\uDCC5 ", date] }), gptSummary ? (_jsxs("div", { className: "mb-4 p-3 bg-yellow-100 text-sm rounded leading-relaxed text-yellow-800", children: [_jsx("strong", { children: "GPT \uC694\uC57D:" }), " ", gptSummary] })) : (_jsx("button", { onClick: handleGptSummaryClick, disabled: loading, className: "mb-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700", children: loading ? 'GPT 요약 생성 중...' : '🧠 GPT 요약 생성' })), sortedList.map((entry, idx) => (_jsxs("div", { className: "mb-4 border rounded-md p-3", children: [_jsxs("button", { className: "w-full text-left font-semibold text-blue-900 hover:underline", onClick: () => setOpenEntryId(openEntryId === entry.id ? null : entry.id), children: ["Diary Entry ", sortedList.length - idx] }), openEntryId === entry.id && (_jsxs("div", { className: "mt-3 space-y-2 text-sm text-gray-800", children: [_jsxs("div", { children: ["\uD83D\uDE0A \uAC10\uC815 \uC0C1\uD0DC:", ' ', _jsx("span", { className: "text-xl", children: emotionEmojiMap[entry.emotion] })] }), _jsxs("div", { children: ["\u2705 \uC624\uB298\uC758 \uC2B5\uAD00: ", parsedHabits(entry.habitTags).join(', ') || '없음'] }), _jsxs("div", { children: ["\uD83D\uDCAC \uC624\uB298\uC758 \uAE30\uBD84 \uD55C\uB9C8\uB514: ", entry.feelingKo, " / ", _jsx("i", { children: entry.feelingEn })] }), _jsxs("div", { children: ["\uD83D\uDCDD \uD68C\uACE0: ", entry.content] }), _jsxs("div", { children: ["\uD83E\uDD16 GPT \uD53C\uB4DC\uBC31: ", entry.feedback] })] }))] }, entry.id))), sortedList.length === 0 && (_jsx("p", { className: "text-center text-gray-500", children: "\uD574\uB2F9 \uB0A0\uC9DC\uC5D0 \uC791\uC131\uB41C \uD68C\uACE0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }))] }) }));
};
export default DiaryListForDateModal;
