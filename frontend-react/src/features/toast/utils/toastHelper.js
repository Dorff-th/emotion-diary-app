// src/components/EmotionToast/toastHelper.ts
import { useEmotionToast } from '@/features/toast/hooks/useEmotionToast';
export const useToastHelper = () => {
    const { showToast } = useEmotionToast();
    return {
        showSuccess: (msg) => showToast({ type: 'success', message: msg }),
        showError: (msg) => showToast({ type: 'error', message: msg }),
        showWarning: (msg) => showToast({ type: 'warn', message: msg }),
        showInfo: (msg) => showToast({ type: 'info', message: msg }),
        showGPT: (msg) => showToast({ type: 'gpt', message: msg }),
        // 필요 시 사용자 정의
        showCustom: (msg) => showToast({ type: 'custom', message: msg }),
    };
};
