import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProfileForm } from '@/types'

export const useUserStore = defineStore('user', () => {
  const nickname = ref('陈晓明')
  const isLogin = ref(false)
  const profile = ref<ProfileForm>({
    name: '陈晓明',
    education: '本科',
    school: '华南理工大学',
    major: '计算机科学与技术',
    position: '前端开发工程师',
    industry: '互联网 / IT',
    city: '广州',
    salary: '15-20K',
    skills: ['Vue 3', 'TypeScript', 'Element Plus', 'Node.js'],
    experience:
      '2024.07-2024.10 某互联网公司 前端开发实习生，负责后台管理系统的组件化重构与性能优化。',
  })

  function login() {
    isLogin.value = true
  }
  function logout() {
    isLogin.value = false
  }

  return { nickname, isLogin, profile, login, logout }
})
