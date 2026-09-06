import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/',
      component: MainLayout,
      redirect: '/home',
      children: [
        { path: 'home', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: '首页' } },
        { path: 'profile', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { title: '求职档案' } },
        { path: 'interview', name: 'interview', component: () => import('@/views/InterviewView.vue'), meta: { title: 'AI 模拟面试' } },
        { path: 'report', name: 'report', component: () => import('@/views/InterviewReportView.vue'), meta: { title: '面试报告' } },
        { path: 'resume', name: 'resume', component: () => import('@/views/ResumeView.vue'), meta: { title: '简历优化' } },
        { path: 'guidance', name: 'guidance', component: () => import('@/views/GuidanceView.vue'), meta: { title: '就业指导' } },
        { path: 'community', name: 'community', component: () => import('@/views/CommunityView.vue'), meta: { title: '求职社区' } },
        { path: 'me', name: 'me', component: () => import('@/views/MeView.vue'), meta: { title: '个人中心' } },
      ],
    },
  ],
})

export default router
