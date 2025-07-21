import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { emotionEmojiMap, emotionLabelMap } from '@/features/diary/types/emotionMap';
export default function DiaryDetail({ diary }) {
    const emotionValue = Number(diary.emotion);
    const emotionEmoji = emotionEmojiMap[emotionValue] ?? '😶';
    const emotionLabel = emotionLabelMap[emotionValue] ?? '';
    const parsedHabits = (() => {
        try {
            return JSON.parse(diary.habitTags);
        }
        catch (e) {
            return [];
        }
    })();
    return (_jsxs("div", { className: "p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 space-y-4", children: [_jsxs("div", { className: "text-xl", children: [emotionEmoji, _jsxs("span", { className: "text-gray-700 dark:text-gray-300", children: ["\uC624\uB298\uC758 \uAC10\uC815: ", _jsx("strong", { children: emotionLabel })] })] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["\u2705 \uC644\uB8CC\uD55C \uC2B5\uAD00?:", ' ', _jsx("span", { className: "font-medium text-black dark:text-white", children: parsedHabits.join(', ') || '없음' })] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["\uD83C\uDDF0\uD83C\uDDF7 \uAE30\uBD84(KO): ", _jsx("span", { className: "text-black dark:text-white", children: diary.feelingKo })] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["\uD83C\uDDFA\uD83C\uDDF8 \uAE30\uBD84(EN): ", _jsx("span", { className: "text-black dark:text-white", children: diary.feelingEn })] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["\uD83D\uDCDD \uD68C\uACE0: ", _jsx("span", { className: "text-black dark:text-white", children: diary.content })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1", children: "\uD83D\uDCAC GPT \uD53C\uB4DC\uBC31" }), _jsxs("div", { className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-lg px-4 py-3 text-sm italic shadow-inner relative", children: [diary.feedback ?? '아직 GPT 피드백이 없습니다.', _jsx("div", { className: "absolute left-2 -bottom-2 w-3 h-3 bg-blue-100 dark:bg-blue-900 transform rotate-45 shadow-inner" })] })] })] }));
}
