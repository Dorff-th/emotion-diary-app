import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const WeeklyLineChart = ({ trend }) => {
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-2", children: "\uC8FC\uAC04 \uD3C9\uADE0 \uAC10\uC815 \uCD94\uC774" }), _jsxs(LineChart, { width: 350, height: 250, data: trend, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "weekLabel" }), _jsx(YAxis, { domain: [1, 5], tickCount: 5 }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "averageEmotion", stroke: "#8884d8" })] })] }));
};
export default WeeklyLineChart;
