import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import AppRouter from '@/app/routes/AppRouter';
import { EmotionToastProvider } from '@/features/toast/context/EmotionToastProvider';
import { EmotionToastContainer } from '@/features/toast/components/EmotionToastContainer';
import { LoadingProvider } from '@/features/system/context/LoadingContext';
import LoadingOverlay from '@/features/ui/components/LoadingOverlay';
import { ThemeProvider } from '@/features/system/context/ThemeContext';
const App = () => {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (!saved) {
            const hour = new Date().getHours();
            const isDark = hour >= 18 || hour < 6;
            const autoTheme = isDark ? 'dark' : 'light';
            setTheme(autoTheme);
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem('theme', autoTheme);
        }
        else {
            setTheme(saved);
            document.documentElement.classList.toggle('dark', saved === 'dark');
        }
    }, []);
    return (_jsx(ThemeProvider, { children: _jsx(EmotionToastProvider, { children: _jsxs(LoadingProvider, { children: [_jsx(LoadingOverlay, {}), _jsx(EmotionToastContainer, {}), _jsx(AuthProvider, { children: _jsx(AppRouter, {}) })] }) }) }));
};
export default App;
