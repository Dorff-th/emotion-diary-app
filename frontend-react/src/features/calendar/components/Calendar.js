import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { useCalendarData } from '@/features/calendar/hooks/useCalendarData';
import CalendarDayCell from './CalendarDayCell';
import clsx from 'clsx';
import { useState } from 'react';
import CalendarSelector from './CalendarSelector';
import DiaryListForDateModal from '@/features/diary/components/DiaryListForDateModal';
import { fetchMonthDiaryList } from '@/features/calendar/api/calendarApi';
const Calendar = () => {
    // 1. 현재 날짜 상태 - 초기값은 현재 날짜  (용도 : 현재날짜 기준의 캘린더를 보여주기 위함)
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear(); // ← 수정!
    const month = currentDate.getMonth() + 1; // ← 수정!
    // 해당 달의 시작일을 YYYY-MM-DD 형식으로 포맷 (API 호출용)
    const startDayStr = `${year}-${String(month).padStart(2, '0')}-01`;
    const [monthlyData, setMonthlyData] = useState([]);
    useEffect(() => {
        const load = async () => {
            const data = await fetchMonthDiaryList(startDayStr);
            setMonthlyData(data);
        };
        load();
    }, [startDayStr]);
    const diaryMapByDate = useMemo(() => {
        return monthlyData.reduce((acc, item) => {
            acc[item.date] = item;
            return acc;
        }, {});
    }, [monthlyData]);
    //2. 월 이동 버튼 클릭 함수 : 이전달, 다음달로 이동하는 함수
    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    //3. 요일 관련 
    const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    // 시작 요일 맞추기
    const { calendarData } = useCalendarData(year, month); // ← OK!
    const firstDay = new Date(`${year}-${String(month).padStart(2, '0')}-01`).getDay();
    const padding = Array(firstDay).fill(null);
    // 4. 선택된 날짜 상태
    // DiaryListForDateModal에서 사용
    const [selectedDate, setSelectedDate] = useState(null);
    // 날짜 클릭 핸들러
    // 날짜가 다이어리가 있는 경우에만 DiaryListForDateModal을 열도록
    const hasDiaryForDate = (fullDate) => {
        return diaryMapByDate[fullDate]?.entries.length > 0;
    };
    const handleDateClick = (date) => {
        if (hasDiaryForDate(date)) {
            setSelectedDate(date);
        }
    };
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 px-2", children: [_jsx("button", { onClick: handlePrevMonth, className: "text-sm sm:text-base text-gray-500 font-medium", children: "\u25C0 Prev" }), _jsx(CalendarSelector, { currentDate: currentDate, setCurrentDate: setCurrentDate }), _jsx("button", { onClick: handleNextMonth, className: "text-sm sm:text-base text-gray-500 font-medium", children: "Next \u25B6" })] }), _jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: DAYS.map((day, i) => (_jsx("div", { className: clsx('h-12 flex items-center justify-center rounded-md shadow-md', 'bg-gradient-to-b from-blue-100 to-gray-50 dark:from-gray-800 dark:to-gray-700', 'text-sm font-semibold tracking-wide', i === 0
                        ? 'text-red-500'
                        : i === 6
                            ? 'text-blue-500'
                            : 'text-gray-800 dark:text-white'), children: day }, i))) }), _jsxs("div", { className: "grid grid-cols-7 gap-1", children: [padding.map((_, i) => (_jsx("div", {}, `pad-${i}`))), calendarData.map((day) => {
                        const dateObj = new Date(day.date);
                        const weekday = dateObj.getDay();
                        const today = new Date();
                        const isToday = today.getFullYear() === dateObj.getFullYear() &&
                            today.getMonth() === dateObj.getMonth() &&
                            today.getDate() === dateObj.getDate();
                        //const paddedMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
                        //const paddedDay = String(dateObj.getDate()).padStart(2, '0');
                        //const fullDate = `${year}-${paddedMonth}-${paddedDay}`;
                        const fullDate = day.date;
                        const hasSummary = !!diaryMapByDate[fullDate]?.summary;
                        return (_jsx(CalendarDayCell, { date: day.date.split('-')[2].replace(/^0/, ''), hasSummary: hasSummary, weekday: weekday, isToday: isToday, year: dateObj.getFullYear(), month: dateObj.getMonth() + 1, onClick: handleDateClick, diaryEntries: diaryMapByDate[fullDate]?.entries }, day.date));
                    }), selectedDate && (_jsx(DiaryListForDateModal, { date: selectedDate, onClose: () => setSelectedDate(null), diaryEntries: diaryMapByDate[selectedDate].entries ?? [], summary: diaryMapByDate[selectedDate].summary || '', onSummaryGenerated: (newSummary) => {
                            // ✅ monthlyData 업데이트
                            setMonthlyData((prev) => prev.map((item) => item.date === selectedDate
                                ? { ...item, summary: newSummary } : item));
                        } }))] })] }));
};
export default Calendar;
