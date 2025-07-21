import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
const EmotionBarChart = ({ frequency }) => {
    const data = Object.entries(frequency).map(([score, count]) => ({
        score,
        count,
    }));
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "\uAC10\uC815 \uC810\uC218 \uBE48\uB3C4" }), _jsxs(BarChart, { width: 350, height: 200, data: data, children: [_jsx(XAxis, { dataKey: "score" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "count" })] })] }));
};
export default EmotionBarChart;
