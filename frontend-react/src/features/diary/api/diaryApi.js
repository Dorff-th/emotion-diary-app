import axiosInstance from "@/lib/axios/axiosInstance";
export const fetchDiaryList = async (page, size = 10) => {
    const response = await axiosInstance.get(`/user/diaries?page=${page - 1}&size=${size}`);
    return response.data;
};
