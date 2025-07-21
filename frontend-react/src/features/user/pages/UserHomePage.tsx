import Header from '@/features/layout/components/Header';
import { useTheme } from '@/features/system/context/ThemeContext';
import SummaryPage from '@/features/summary/pages/SummaryPage';
import clsx from 'clsx';

const UserHomePage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={clsx(
        'min-h-screen transition-colors duration-500 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800',
        isDarkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-blue-100 to-white'
      )}
    >
      <Header />

       <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8">
        {/* <h2 className="text-2xl font-semibold mb-4">여기는 사용자 페이지 🎯</h2>
        <p>로그인 하면 처음 만나는 페이지. (회고 요약 컨텐츠로 채울예정) </p> */}
      <SummaryPage />
      </div>
    </main>
    </div>
  );
};

export default UserHomePage;
