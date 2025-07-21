import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSummaryData } from '../hooks/useSummaryData';
import TodayEmotionCard from '../components/TodayEmotionCard';
import TodayHabitCard from '../components/TodayHabitCard';
import SummaryCard from '../components/SummaryCard';
import FeedbackCard from '../components/FeedbackCard';
const SummaryPage = () => {
    const { summary, loading } = useSummaryData();
    const [gptSummary, setGptSummary] = useState('');
    const [gptFeedback, setGptFeedback] = useState('');
    // ✅ summary 값이 로드되면 내부 상태 초기화
    useEffect(() => {
        if (summary) {
            setGptSummary(summary.summary ?? '');
            setGptFeedback(summary.feedback ?? '');
        }
    }, [summary]);
    if (loading)
        return _jsx("div", { className: "text-center", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." });
    if (!summary)
        return _jsx("div", { className: "text-center", children: "\uC624\uB298 \uD68C\uACE0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
    const parsedHabits = (() => {
        try {
            return JSON.parse(summary.habitTags);
        }
        catch (e) {
            return [];
        }
    })();
    return (_jsxs("div", { className: "max-w-md mx-auto p-4 space-y-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "\uC624\uB298\uC758 \uAC10\uC815 \uC694\uC57D" }), _jsx(TodayEmotionCard, { emotion: summary.emotion, feelingKo: summary.feelingKo, feelingEn: summary.feelingEn }), _jsx(TodayHabitCard, { habits: parsedHabits }), _jsx(SummaryCard, { summary: gptSummary, onSummaryUpdated: (newSummary) => setGptSummary(newSummary) }), _jsx(FeedbackCard, { feedback: gptFeedback, onFeedbackUpdated: (newFeedback) => setGptFeedback(newFeedback) })] }));
};
export default SummaryPage;
