import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const EmojiContext = createContext(null);
export const EmojiProvider = ({ children }) => {
    const [emoji, setEmoji] = useState(() => localStorage.getItem('emoji') || '😎');
    useEffect(() => {
        localStorage.setItem('emoji', emoji);
    }, [emoji]);
    return (_jsx(EmojiContext.Provider, { value: { emoji, setEmoji }, children: children }));
};
export const useEmoji = () => useContext(EmojiContext);
