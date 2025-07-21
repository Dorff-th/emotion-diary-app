import { useEffect, useState } from 'react';
import { fetchTodaySummary } from '../api/summaryApi';
export const useSummaryData = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchTodaySummary()
            .then(data => setSummary(data))
            .finally(() => setLoading(false));
    }, []);
    return { summary, loading };
};
