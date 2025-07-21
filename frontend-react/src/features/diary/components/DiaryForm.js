import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionSelector from './EmotionSelector';
import HabitChecklist from './HabitChecklist';
import FeelingInput from './FeelingInput';
import DiaryTextarea from './DiaryTextarea';
import FeedbackTypeSelect from './FeedbackTypeSelect';
import SubmitButton from './SubmitButton';
import GPTFeedbackModal from '@/features/gpt/components/GPTFeedbackModal';
import axiosInstance from "@/lib/axios/axiosInstance";
import { format } from 'date-fns';
const DiaryForm = () => {
    const [emotion, setEmotion] = useState(0);
    const [habits, setHabits] = useState([]);
    const [feelingText, setFeelingText] = useState('');
    const [feelingEnglish, setFeelingEnglish] = useState('');
    const [diary, setDiary] = useState('');
    const [feedbackType, setFeedbackType] = useState('random');
    const [showModal, setShowModal] = useState(false);
    const [gptMessage, setGptMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const navigate = useNavigate();
    const fetchGptFeedback = async (content, feedbackType) => {
        setGptMessage('🤖 GPT 피드백 생성 중입니다...');
        setShowModal(true); // 모달 먼저 띄우기
        try {
            const response = await axiosInstance.post('/user/gpt/diary-feedback', {
                content,
                feedbackType,
            });
            return response.data.feedback;
        }
        catch (error) {
            console.error('GPT 피드백 실패:', error);
            return '오늘도 수고했어요. 내일은 더 잘할 수 있을 거예요!'; // fallback
        }
    };
    const handleSubmit = async () => {
        if (!emotion || !diary.trim()) {
            alert('감정과 회고 일기를 작성해주세요!');
            return;
        }
        setIsSaving(true);
        setIsSaveSuccess(false); // 초기화
        try {
            // 1. GPT 피드백 생성
            const gptFeedback = await fetchGptFeedback(diary, feedbackType);
            setGptMessage(gptFeedback); // ✅ 모달 내 문구 교체
            // 2. 회고 저장 요청
            const payload = {
                diaryDate: format(new Date(), 'yyyy-MM-dd'),
                emotionScore: emotion,
                habitTags: habits,
                feelingKo: feelingText,
                feelingEn: feelingEnglish,
                content: diary,
                feedback: gptFeedback,
            };
            await axiosInstance.post('/user/diary', payload);
            setIsSaveSuccess(true);
        }
        catch (e) {
            console.error('저장 중 오류 발생:', e);
            setGptMessage('저장에 실패했어요. 다시 시도해주세요. 😢');
            setIsSaveSuccess(false);
        }
        finally {
            setIsSaving(false);
        }
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "\uC624\uB298\uC758 \uAC10\uC815 & \uD68C\uACE0" }), _jsx(EmotionSelector, { selected: emotion, onChange: setEmotion }), _jsx(HabitChecklist, { selectedHabits: habits, onChange: setHabits }), _jsx(FeelingInput, { value: feelingText, onChange: setFeelingText, selectedEnglish: feelingEnglish, onEnglishSelect: setFeelingEnglish }), _jsx(DiaryTextarea, { value: diary, onChange: setDiary }), _jsx(FeedbackTypeSelect, { value: feedbackType, onChange: setFeedbackType }), _jsx(SubmitButton, { isLoading: isSaving, onClick: handleSubmit }), showModal && (_jsx(GPTFeedbackModal, { message: gptMessage, type: feedbackType, onClose: () => {
                    setShowModal(false);
                    if (isSaveSuccess) {
                        navigate('/user/calendar');
                    }
                }, duration: 3000 }))] }));
};
export default DiaryForm;
