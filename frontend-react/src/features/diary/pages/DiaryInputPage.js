import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '@/features/layout/components/Header';
import { useTheme } from '@/features/system/context/ThemeContext';
import clsx from 'clsx';
import DiaryForm from '@/features/diary/components/DiaryForm';
const DiaryInputPage = () => {
    const { isDarkMode } = useTheme();
    return (_jsxs("div", { className: clsx('min-h-screen transition-colors duration-500 bg-gradient-to-b', isDarkMode
            ? 'from-gray-900 to-gray-800'
            : 'from-blue-100 to-white'), children: [_jsx(Header, {}), _jsx("main", { className: "max-w-4xl mx-auto py-10 px-4", children: _jsx("div", { className: "bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8", children: _jsx(DiaryForm, {}) }) })] }));
};
export default DiaryInputPage;
