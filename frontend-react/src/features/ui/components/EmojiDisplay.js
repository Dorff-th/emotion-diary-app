import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEmoji } from '@/features/system/context/EmojiContext';
const emojiList = ['😎', '😭', '😡', '🤔', '😴', '🤯'];
const EmojiDisplay = () => {
    const { emoji, setEmoji } = useEmoji();
    return (_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "text-6xl relative -top-1 mb-4", children: emoji }), _jsx("div", { className: "flex gap-2 justify-center flex-wrap", children: emojiList.map((e) => (_jsx("button", { onClick: () => setEmoji(e), className: `text-2xl transition-transform transform hover:scale-125
              ${e === emoji
                        ? 'opacity-100 scale-125'
                        : 'opacity-50 hover:opacity-80'}
              dark:text-white`, children: e }, e))) })] }));
};
export default EmojiDisplay;
