import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { fetchEmotionStatistics } from '@/features/statistics/api/statisticsApi';
import EmotionBarChart from '@/features/statistics/components/EmotionBarChart';
import WeeklyLineChart from '@/features/statistics/components/WeeklyLineChart';
import DayOfWeekBarChart from '@/features/statistics/components/DayOfWeekBarChart';
import { getDateRange } from '@/utils/dateUtils';
import Header from '@/features/layout/components/Header';
import EmotionSummaryCard from '@/features/statistics/components/EmotionSummaryCard';
const EmotionStatsPage = () => {
    const [period, setPeriod] = useState('this-month');
    const [[startDateStr, endDateStr], setDateRange] = useState(getDateRange('this-month'));
    const [customStartDate, setCustomStartDate] = useState(null);
    const [customEndDate, setCustomEndDate] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (startDateStr && endDateStr) {
            fetchEmotionStatistics(startDateStr, endDateStr)
                .then(setData)
                .catch((err) => console.error('통계 불러오기 실패', err));
        }
    }, [startDateStr, endDateStr]);
    const handlePeriodChange = (e) => {
        const value = e.target.value;
        setPeriod(value);
        if (value !== 'custom') {
            setDateRange(getDateRange(value));
        }
    };
    // custom 범위 설정 시 문자열로 변환해서 적용
    const handleCustomDateApply = () => {
        if (customStartDate && customEndDate) {
            const format = (d) => d.toISOString().split('T')[0];
            setDateRange([format(customStartDate), format(customEndDate)]);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: "min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500", children: _jsxs("div", { className: "p-4 space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "\uAC10\uC815 \uD1B5\uACC4 \uB300\uC2DC\uBCF4\uB4DC" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("select", { value: period, onChange: handlePeriodChange, className: "border p-1 rounded", children: [_jsx("option", { value: "this-week", children: "\uC774\uBC88 \uC8FC" }), _jsx("option", { value: "this-month", children: "\uC774\uBC88 \uB2EC" }), _jsx("option", { value: "last-7-days", children: "\uCD5C\uADFC 7\uC77C" }), _jsx("option", { value: "custom", children: "\uC9C1\uC811 \uC120\uD0DD" })] }), period === 'custom' && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(DatePicker, { selected: customStartDate, onChange: (date) => setCustomStartDate(date), selectsStart: true, startDate: customStartDate, endDate: customEndDate, placeholderText: "\uC2DC\uC791 \uB0A0\uC9DC", dateFormat: "yyyy-MM-dd" }), _jsx("span", { children: "~" }), _jsx(DatePicker, { selected: customEndDate, onChange: (date) => setCustomEndDate(date), selectsEnd: true, startDate: customStartDate, endDate: customEndDate, minDate: customStartDate ?? undefined, placeholderText: "\uC885\uB8CC \uB0A0\uC9DC", dateFormat: "yyyy-MM-dd" }), _jsx("button", { onClick: handleCustomDateApply, className: "px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600", children: "\uC801\uC6A9" })] }))] }), data && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-lg", children: ["\uD3C9\uADE0 \uAC10\uC815 \uC810\uC218: ", _jsx("strong", { children: data.averageEmotion.toFixed(2) })] }), _jsx(EmotionSummaryCard, { average: data.averageEmotion }), _jsx(EmotionBarChart, { frequency: data.emotionFrequency }), _jsx(WeeklyLineChart, { trend: data.weeklyTrend }), _jsx(DayOfWeekBarChart, { dayAverage: data.dayOfWeekAverage })] }))] }) })] }));
};
export default EmotionStatsPage;
