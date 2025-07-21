import { useState, useEffect } from 'react';
import { getDaysInMonth } from '@/utils/calendarUtils';
export const useCalendarData = (year, month) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const days = getDaysInMonth(year, month);
        const enrichedData = days.map((dateStr) => {
            let averageScore = undefined;
            let emoji = undefined;
            return {
                date: dateStr,
                emotionScore: averageScore,
                emotionEmoji: emoji,
            };
        });
        setData(enrichedData);
    }, [year, month]);
    return {
        calendarData: data,
    };
};
