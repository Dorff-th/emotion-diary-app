// src/api/statisticsApi.ts
import axiosInstance from "@/lib/axios/axiosInstance";
export const fetchEmotionStatistics = async (startDate, endDate) => {
    const res = await axiosInstance.get('/user/statistics/emotion', {
        params: { startDate, endDate },
    });
    return res.data;
};
