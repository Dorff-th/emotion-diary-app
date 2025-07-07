import axiosInstance from './axiosInstance';

// 로그인 API
export const login = async (username, password) => {
  const res = await axiosInstance.post('/auth/login', {
    username,
    password
  });
  return res.data; // { accessToken, user }
};

// 사용자 정보 조회 (선택)
export const getCurrentUser = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data;
};
