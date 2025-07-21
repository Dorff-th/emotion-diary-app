import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const DayDetailPopup = ({ date, onClose }) => {
    return (_jsxs("div", { className: "fixed top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 p-4 shadow-lg rounded z-50", children: [_jsxs("h3", { className: "text-lg font-semibold", children: ["\uD83D\uDCD6 ", date, " \uC0C1\uC138 \uBCF4\uAE30"] }), _jsx("button", { onClick: onClose, className: "mt-4 text-blue-500", children: "\uB2EB\uAE30" })] }));
};
export default DayDetailPopup;
