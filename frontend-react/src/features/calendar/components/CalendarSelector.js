import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/calendar/components/CalendarSelector.tsx
import { useState } from 'react';
const CalendarSelector = ({ currentDate, setCurrentDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
        setIsOpen(false); // 자동 닫기
    };
    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10) - 1;
        setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
        setIsOpen(false); // 자동 닫기
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-end gap-2 focus:outline-none", children: [_jsx("span", { className: "text-4xl font-bold text-blue-900", children: currentDate.getMonth() + 1 }), _jsx("span", { className: "text-base font-medium text-black uppercase tracking-wide", children: currentDate.toLocaleString('en-US', { month: 'long' }) }), _jsx("span", { className: "text-base text-gray-500 font-medium", children: currentDate.getFullYear() })] }), isOpen && (_jsxs("div", { className: "absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border rounded-md shadow-md z-10 p-2 flex gap-2", children: [_jsx("select", { value: year, onChange: handleYearChange, className: "border rounded px-2 py-1", children: Array.from({ length: 10 }, (_, i) => {
                            const y = new Date().getFullYear() - 5 + i;
                            return (_jsxs("option", { value: y, children: [y, "\uB144"] }, y));
                        }) }), _jsx("select", { value: month, onChange: handleMonthChange, className: "border rounded px-2 py-1", children: Array.from({ length: 12 }, (_, i) => (_jsxs("option", { value: i + 1, children: [i + 1, "\uC6D4"] }, i + 1))) })] }))] }));
};
export default CalendarSelector;
