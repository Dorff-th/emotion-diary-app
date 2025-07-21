import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { fetchDiaryList } from '@/features/diary/api/diaryApi';
import DiaryItem from '@/features/diary/components/DiaryItem';
import Pagination from '@/features/diary/components/Pagination';
import Header from '@/features/layout/components/Header';
export default function DiaryListPage() {
    const [page, setPage] = useState(1);
    const [diaryGroups, setDiaryGroups] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [openId, setOpenId] = useState(null);
    useEffect(() => {
        const load = async () => {
            const data = await fetchDiaryList(page); // data: DiaryGroup[]
            setDiaryGroups(data.content);
            setTotalPages(data.totalPages);
        };
        load();
    }, [page]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: "min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\uD83D\uDCCB \uB098\uC758 \uD68C\uACE0 \uBAA9\uB85D" }), diaryGroups.map((group) => (_jsxs("div", { className: "mb-8", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-900 dark:text-blue-300", children: group.date }), group.summary && (_jsxs("div", { className: "text-sm text-gray-500 italic mb-2", children: ["GPT \uC694\uC57D: ", group.summary] })), _jsx("div", { className: "space-y-4", children: group.entries.map((diary) => (_jsx(DiaryItem, { diary: diary, isOpen: openId === diary.id, onToggle: () => setOpenId(openId === diary.id ? null : diary.id) }, diary.id))) })] }, group.date))), _jsx(Pagination, { page: page, totalPages: totalPages, onChange: setPage })] }) })] }));
}
