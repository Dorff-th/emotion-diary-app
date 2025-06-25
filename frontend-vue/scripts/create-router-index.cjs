const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../src/router/index.js');

const content = `import { createRouter, createWebHistory } from 'vue-router'

// 레이아웃
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

// 관리자 뷰
import AdminLogin from '@/views/admin/Login.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import GptUsageStats from '@/views/admin/GptUsageStats.vue'

// 사용자 뷰
import UserLogin from '@/views/user/Login.vue'
import DailyLogForm from '@/views/user/DailyLogForm.vue'
import DailyLogList from '@/views/user/DailyLogList.vue'
import MyPage from '@/views/user/MyPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/user/daily-log'
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'login', component: AdminLogin },
      { path: 'dashboard', component: Dashboard },
      { path: 'gpt-stats', component: GptUsageStats }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: 'login', component: UserLogin },
      { path: 'daily-log', component: DailyLogForm },
      { path: 'daily-logs', component: DailyLogList },
      { path: 'mypage', component: MyPage }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`✅ created: ${outputPath}`);
