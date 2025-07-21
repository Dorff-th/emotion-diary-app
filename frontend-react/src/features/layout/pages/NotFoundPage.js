import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/NotFoundPage.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToastHelper } from '@/features/toast/utils/toastHelper';
const NotFoundPage = () => {
    const { showCustom } = useToastHelper();
    useEffect(() => {
        showCustom('존재하지 않는 페이지예요 🥲');
    }, []);
    return (_jsxs("div", { className: "min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDC30 404" }), _jsx("p", { className: "text-xl mb-4", children: "\uC557! \uAE38\uC744 \uC783\uC5C8\uC5B4\uC694... \uC5EC\uAE34 \uC5C6\uB294 \uD398\uC774\uC9C0\uC608\uC694." }), _jsx(Link, { to: "/", className: "mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600", children: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })] }));
};
export default NotFoundPage;
