import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DayOfWeekBarChart = ({ dayAverage }) => {
    const data = dayOrder.map((day) => ({
        day,
        average: dayAverage[day] || 0,
    }));
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-2", children: "\uC694\uC77C\uBCC4 \uD3C9\uADE0 \uAC10\uC815" }), _jsxs(BarChart, { width: 350, height: 200, data: data, children: [_jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, { domain: [1, 5], tickCount: 5 }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "average", fill: "#82ca9d" })] })] }));
};
export default DayOfWeekBarChart;
