import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// 기본 습관 목록 (필요 시 props로 받는 구조도 가능)
const defaultHabits = [
    '운동',
    '명상',
    '일찍 일어나기',
    '물 2L 마시기',
    '디지털 디톡스',
];
const HabitChecklist = ({ selectedHabits, onChange }) => {
    const toggleHabit = (habit) => {
        if (selectedHabits.includes(habit)) {
            onChange(selectedHabits.filter((h) => h !== habit));
        }
        else {
            onChange([...selectedHabits, habit]);
        }
    };
    return (_jsxs("div", { className: "bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg transition-colors duration-500 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uC624\uB298 \uC644\uB8CC\uD55C \uC2B5\uAD00" }), _jsx("div", { className: "flex flex-wrap gap-3", children: defaultHabits.map((habit) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedHabits.includes(habit), onChange: () => toggleHabit(habit), className: "accent-blue-500" }), _jsx("span", { children: habit })] }, habit))) })] }));
};
export default HabitChecklist;
