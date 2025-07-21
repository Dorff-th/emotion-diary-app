import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Header from '@/features/layout/components/Header';
import Calendar from '@/features/calendar/components/Calendar';
const CalendarPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: "min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500", children: _jsx("main", { className: "max-w-4xl mx-auto py-10 px-4", children: _jsxs("div", { className: "bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-lg p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\uD83D\uDCC5 \uCE98\uB9B0\uB354 \uD398\uC774\uC9C0" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-6", children: "\uAC10\uC815 & \uD68C\uACE0 \uC785\uB825 \uC5EC\uBD80\uB97C \uB2EC\uB825\uC5D0\uC11C \uD55C\uB208\uC5D0 \uD655\uC778\uD574\uBCF4\uC138\uC694." }), _jsx(Calendar, {})] }) }) })] }));
};
export default CalendarPage;
