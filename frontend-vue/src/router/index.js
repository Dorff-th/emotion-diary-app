import { createRouter, createWebHistory } from 'vue-router'

//로그인 뷰 (사용자/관리자 공용)
import LoginView from '@/views/login/LoginView.vue'

// 레이아웃
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'


// 관리자 뷰
//import AdminLogin from '@/views/admin/AdminLogin.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import GptStats from '@/views/admin/GptStats.vue'

// 사용자 뷰
//import UserLogin from '@/views/user/UserLogin.vue'
import DailyLogForm from '@/views/user/DailyLogForm.vue'
import DailyLogList from '@/views/user/DailyLogList.vue'
import MyPage from '@/views/user/MyPage.vue'



const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'gpt-stats', component: GptStats }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
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

// router/index.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    // 토큰 없으면 로그인 화면으로
    if (to.path !== '/login') {
      return next('/login')
    } else {
      return next()
    }
  }

  // 토큰 있으면 파싱해서 role 확인
  const payload = JSON.parse(atob(token.split('.')[1]))
  const role = payload.role.replace('ROLE_', '');


  // 일반 사용자가 관리자 페이지 접근 → 차단
  if (to.path.startsWith('/admin') && role !== 'ADMIN') {
    alert('접근 권한이 없습니다.')
    return next('/user/daily-log')
  }

  // 그 외에는 통과
  next()
})



export default router
