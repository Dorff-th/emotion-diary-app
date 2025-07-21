import { jsx as _jsx } from "react/jsx-runtime";
// ThemeContext.tsx
import { useState, useEffect, createContext, useContext } from "react";
const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored === 'dark';
    });
    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    return (_jsx(ThemeContext.Provider, { value: { isDarkMode, toggleTheme }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
