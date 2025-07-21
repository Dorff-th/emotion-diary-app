import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const habitEmojiMap = {
    명상: '🧘',
    운동: '🏃',
    독서: '📚',
    일찍일어나기: '⏰',
    감사일기: '🙏',
    영어공부: '🇬🇧',
    글쓰기: '✍️',
    // 새로운 습관 생기면 여기에 추가!
};
const TodayHabitCard = ({ habits }) => {
    if (habits.length === 0) {
        return _jsx("div", { className: "text-gray-400 text-sm", children: "\uC624\uB298\uC740 \uAE30\uB85D\uB41C \uC2B5\uAD00\uC774 \uC5C6\uC5B4\uC694 \uD83D\uDE36" });
    }
    return (_jsxs("div", { className: "rounded-xl bg-blue-50 p-4 shadow-sm", children: [_jsx("h3", { className: "text-md font-semibold mb-2", children: "\uC624\uB298 \uC2E4\uCC9C\uD55C \uC2B5\uAD00" }), _jsx("div", { className: "flex flex-wrap gap-2", children: habits.map((habit, idx) => (_jsxs("span", { className: "bg-white px-3 py-1 rounded-full text-sm border border-gray-300 shadow-sm", children: [habitEmojiMap[habit] || '🔸', " ", habit] }, idx))) })] }));
};
export default TodayHabitCard;
