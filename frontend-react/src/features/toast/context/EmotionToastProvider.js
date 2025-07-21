import { jsx as _jsx } from "react/jsx-runtime";
import { ToastContext, useEmotionToastState } from '@/features/toast/hooks/useEmotionToast';
export const EmotionToastProvider = ({ children }) => {
    const state = useEmotionToastState();
    return (_jsx(ToastContext.Provider, { value: state, children: children }));
};
