import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import { useState } from 'react';
import { login } from '@/features/auth/api/authApi';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useToastHelper } from '@/features/toast/utils/toastHelper';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const { login: saveToken } = useAuth();
    const { showSuccess, showError } = useToastHelper();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        // 로그인 로직 처리
        try {
            const data = await login(username, password);
            saveToken(data.token);
            showSuccess('로그인 성공! 🎉');
            navigate('/');
        }
        catch (err) {
            showError('로그인 실패 😭');
        }
    };
    return (_jsxs("form", { onSubmit: handleLogin, className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md\r\n                 text-black dark:text-white transition-colors duration-300", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-center", children: "\uB85C\uADF8\uC778" }), _jsx("label", { className: "block mb-2", children: _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full px-3 py-2 border rounded-md \r\n                     bg-gray-100 dark:bg-gray-700 \r\n                     text-black dark:text-white \r\n                     border-gray-300 dark:border-gray-600 \r\n                     focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500" }) }), _jsx("label", { className: "block mb-4 mt-4", children: _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-3 py-2 border rounded-md \r\n                     bg-gray-100 dark:bg-gray-700 \r\n                     text-black dark:text-white \r\n                     border-gray-300 dark:border-gray-600 \r\n                     focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500" }) }), _jsx("button", { type: "submit", className: "w-full py-2 bg-blue-500 hover:bg-blue-600 \r\n                   dark:bg-blue-600 dark:hover:bg-blue-700 \r\n                   text-white rounded-md font-semibold transition", children: "\uB85C\uADF8\uC778" })] }));
};
export default LoginForm;
