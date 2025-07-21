import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useToastHelper } from '@/features/toast/utils/toastHelper';
const FeedbackCard = ({ feedback, onFeedbackUpdated }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToastHelper();
    const { showSuccess, showError } = useToastHelper();
    // const handleGenerateFeedback = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await createGptFeedback();
    //     onFeedbackUpdated(res.feedback);
    //     showSuccess('GPT 피드백이 생성되었어요!');
    //   } catch (e) {
    //     showError('피드백 생성에 실패했어요 😢');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    return (_jsxs("div", { className: "rounded-xl bg-green-50 p-4 shadow-sm", children: [_jsx("h3", { className: "text-md font-semibold mb-2", children: "GPT \uD53C\uB4DC\uBC31" }), feedback ? (_jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: feedback })) : (_jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500 mb-2", children: "\uC544\uC9C1 GPT \uD53C\uB4DC\uBC31\uC774 \uC5C6\uC5B4\uC694." }) }))] }));
};
export default FeedbackCard;
