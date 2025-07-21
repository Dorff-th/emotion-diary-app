import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { emotionEmojiMap } from '@/features/diary/types/emotionMap';
const TodayEmotionCard = ({ emotion, feelingKo, feelingEn }) => {
    return (_jsxs("div", { className: "rounded-xl bg-yellow-100 p-4 shadow-sm", children: [_jsx("div", { className: "text-4xl text-center", children: emotionEmojiMap[emotion] }), _jsx("div", { className: "text-center mt-2 text-lg font-semibold", children: feelingKo }), _jsxs("div", { className: "text-center text-sm text-gray-500", children: ["\"", feelingEn, "\""] })] }));
};
export default TodayEmotionCard;
