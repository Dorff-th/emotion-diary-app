import axios from 'axios';
import { getLoadingControl } from '@/features/system/context/LoadingControl';
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 3000,
});
// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    // 🔐 토큰 첨부
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // ✅ 👇 전역 로딩 제외 조건 추가
    const skipGlobalLoading = config.meta?.skipGlobalLoading;
    if (!skipGlobalLoading) {
        getLoadingControl().showLoading();
    }
    return config;
}, (error) => {
    getLoadingControl().hideLoading();
    return Promise.reject(error);
});
// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use((response) => {
    const skipGlobalLoading = response.config.meta?.skipGlobalLoading;
    if (!skipGlobalLoading) {
        getLoadingControl().hideLoading();
    }
    return response;
}, (error) => {
    const skipGlobalLoading = error.config?.meta?.skipGlobalLoading;
    if (!skipGlobalLoading) {
        getLoadingControl().hideLoading();
    }
    const status = error.response?.status;
    console.log(status, error.response?.data);
    if (status === 401 || status === 403) {
        // ✅ 만료된 토큰이거나 권한 오류 → 자동 로그아웃 처리
        localStorage.removeItem('token');
        alert('세션이 만료되어 로그아웃되었습니다.');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default axiosInstance;
