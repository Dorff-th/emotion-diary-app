import { jsx as _jsx } from "react/jsx-runtime";
// src/features/auth/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginFn = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };
    // ✅ 토큰 만료 여부 검사 함수
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp < now;
        }
        catch (e) {
            return true;
        }
    };
    const navigate = useNavigate();
    const logoutFn = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const tokenExpired = isTokenExpired(token);
        console.log('토큰:', token, '만료 여부:', tokenExpired);
        if (!token || tokenExpired) {
            logoutFn(); // ⛔ 토큰 없거나 만료 시
        }
        else {
            setIsAuthenticated(true); // ✅ 로그인 상태 유지
        }
    }, []);
    return (_jsx(AuthContext.Provider, { value: { token, isAuthenticated: !!token, login: loginFn, logout: logoutFn }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('AuthContext not found!');
    return ctx;
};
