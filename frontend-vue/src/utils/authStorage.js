// src/utils/authStorage.js

// accessToken 저장
export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// userInfo 저장
export const saveUserInfo = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
};

// accessToken 가져오기
export const getToken = () => localStorage.getItem('accessToken');

// userInfo 가져오기
export const getUser = () => {
  const json = localStorage.getItem('userInfo');
  return json ? JSON.parse(json) : null;
};

// 로그인 여부 확인
export const isLoggedIn = () => !!getToken();

// 로그아웃 처리
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userInfo');
};
