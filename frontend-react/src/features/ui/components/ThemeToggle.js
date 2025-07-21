import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@/features/system/context/ThemeContext';
const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (_jsx("button", { onClick: toggleTheme, className: "flex items-center", children: isDarkMode ? '☀️' : '🌙' }));
};
export default ThemeToggle;
