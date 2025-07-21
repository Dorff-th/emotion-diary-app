import { jsx as _jsx } from "react/jsx-runtime";
import Slider from '@mui/material/Slider';
const emotionMarks = [
    { value: 1, label: '😞' },
    { value: 2, label: '😐' },
    { value: 3, label: '🙂' },
    { value: 4, label: '😊' },
    { value: 5, label: '😄' },
];
const EmotionRangeSlider = ({ value, onChange }) => {
    return (_jsx("div", { className: "px-4 py-2 w-full", children: _jsx(Slider, { value: value, onChange: (e, newValue) => onChange(newValue), valueLabelDisplay: "auto", min: 1, max: 5, step: 1, marks: emotionMarks }) }));
};
export default EmotionRangeSlider;
