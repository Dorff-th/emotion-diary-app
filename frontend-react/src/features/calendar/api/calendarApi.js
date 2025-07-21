import axiosInstance from "@/lib/axios/axiosInstance";
//  월별 다이어리 목록을 가져오는 API
//selectedDate : YYYY-MM-DD 형식의 날짜 문자열
export const fetchMonthDiaryList = async (selectedDate) => {
    const response = await axiosInstance.get(`/user/diaries/monthly?yearMonth=${selectedDate}`);
    return response.data;
};
