import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({ page, totalPages, onChange }) {
    return (_jsxs("div", { className: "flex justify-center mt-6 gap-2", children: [_jsx("button", { className: "px-3 py-1 border rounded disabled:opacity-30", onClick: () => onChange(page - 1), disabled: page === 1, children: "Prev" }), Array.from({ length: totalPages }, (_, i) => (_jsx("button", { className: `px-3 py-1 border rounded ${i + 1 === page ? 'bg-blue-200' : ''}`, onClick: () => onChange(i + 1), children: i + 1 }, i))), _jsx("button", { className: "px-3 py-1 border rounded disabled:opacity-30", onClick: () => onChange(page + 1), disabled: page === totalPages, children: "Next" })] }));
}
