import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmojiProvider } from '@/features/system/context/EmojiContext';
import EmojiDisplay from '@/features/ui/components/EmojiDisplay';
import LoginForm from '@/features/auth/components/LoginForm';
import FooterMessage from '@/features/ui/components/FooterMessage';
import ThemeToggle from '@/features/ui/components/ThemeToggle';
const LoginPage = () => {
    return (_jsx("div", { className: "min-h-screen flex flex-col justify-center items-center \r\n                    bg-gradient-to-b from-blue-100 to-white \r\n                    dark:from-gray-800 dark:to-gray-900 \r\n                    text-black dark:text-white \r\n                    transition-colors duration-300 px-4", children: _jsx(EmojiProvider, { children: _jsxs("div", { className: "bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-sm text-center relative", children: [_jsx(ThemeToggle, {}), _jsx(EmojiDisplay, {}), _jsx("h2", { className: "text-2xl font-semibold mt-4 mb-6", children: "\uC624\uB298 \uD558\uB8E8 \uC5B4\uB560\uB098\uC694?" }), _jsx(LoginForm, {}), _jsx(FooterMessage, {})] }) }) }));
};
export default LoginPage;
