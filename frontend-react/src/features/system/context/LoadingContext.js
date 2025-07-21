import { jsx as _jsx } from "react/jsx-runtime";
// src/context/LoadingContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { setLoadingControl } from './LoadingControl';
const LoadingContext = createContext(null);
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);
    useEffect(() => {
        setLoadingControl({ showLoading, hideLoading });
    }, []);
    return (_jsx(LoadingContext.Provider, { value: { isLoading, showLoading, hideLoading }, children: children }));
};
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context)
        throw new Error('useLoading must be used within a LoadingProvider');
    return context;
};
