import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLoading } from '@/features/system/context/LoadingContext';
import loadingBunny from '@/assets/characters/loading_bunny_gpt.png'; // ← 새 이미지 경로
const LoadingOverlay = () => {
    const { isLoading } = useLoading();
    if (!isLoading)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-white/80 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: loadingBunny, alt: "GPT \uD1A0\uB07C \uB85C\uB529 \uC911", className: "w-[170px] h-[256px] animate-bounce" }), _jsx("div", { className: "mt-4 text-gray-700 dark:text-white text-base font-semibold animate-pulse", children: "GPT \uD1A0\uB07C\uAC00 \uC900\uBE44 \uC911\uC774\uC5D0\uC694..." })] }) }));
};
export default LoadingOverlay;
