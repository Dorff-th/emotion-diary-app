import axiosInstance from "@/lib/axios/axiosInstance";
export const generateGptSummary = async (date) => {
    const response = await axiosInstance.post('/user/diary/gpt-summary', {
        date
    });
    return response.data.summary;
};
