import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { emotionEmojiMap } from '@/features/diary/types/emotionMap';
const CalendarDayCell = ({ date, hasSummary, weekday, isToday, year, month, onClick, diaryEntries }) => {
    // YYYY-MM-DD
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = date.toString().padStart(2, '0');
    const fullDate = `${year}-${paddedMonth}-${paddedDay}`;
    // 평균 감정 점수 계산 (1~5 사이로 제한)
    const averageScore = diaryEntries?.length && diaryEntries.length > 0
        ? Math.min(5, Math.max(1, Math.round(diaryEntries.reduce((sum, entry) => sum + entry.emotion, 0) /
            diaryEntries.length)))
        : null;
    // 이모지 가져오기 (범위 밖이거나 없으면 null)
    const emotion = averageScore && emotionEmojiMap[averageScore]
        ? emotionEmojiMap[averageScore]
        : null;
    const isClickable = !!emotion;
    const dayColor = weekday === 0
        ? 'text-red-500'
        : weekday === 6
            ? 'text-blue-500'
            : 'text-black dark:text-white';
    const highlightStyle = isToday
        ? 'ring-2 ring-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
        : '';
    return (_jsxs("div", { onClick: () => isClickable && onClick?.(fullDate), className: clsx('h-20 w-full rounded-xl p-2 relative group transition-all duration-200 select-none', isClickable
            ? 'cursor-pointer bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-neutral-50 dark:hover:bg-gray-700'
            : 'cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400', highlightStyle), children: [_jsx("div", { className: `text-lg font-bold absolute top-1 left-2 ${dayColor}`, children: date }), _jsx("div", { className: "text-2xl mx-auto mt-5", children: emotion || '' }), hasSummary && isClickable && (_jsx("div", { className: "text-green-500 text-xs mx-auto mt-1 group-hover:scale-105 transition-transform", children: "GPT\u2705" }))] }));
};
export default CalendarDayCell;
