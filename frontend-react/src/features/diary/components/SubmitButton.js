import { jsx as _jsx } from "react/jsx-runtime";
const SubmitButton = ({ isLoading, onClick }) => {
    return (_jsx("div", { className: "mt-6 text-center", children: _jsx("button", { onClick: onClick, disabled: isLoading, className: "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all", children: isLoading ? '저장 중...' : '저장하기' }) }));
};
export default SubmitButton;
