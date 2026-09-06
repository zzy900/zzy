<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()

const menus = [
  { icon: '📋', label: '我的求职档案', path: '/profile' },
  { icon: '💬', label: '面试历史与报告', path: '/report' },
  { icon: '📄', label: '简历管理', path: '/resume' },
  { icon: '👑', label: '会员与权益', path: '' },
  { icon: '🔔', label: '消息通知', path: '' },
  { icon: '💬', label: '意见反馈', path: '' },
]

function handleMenu(path: string) {
  if (path) {
    router.push(path)
  } else {
    ElMessage.info('功能开发中')
  }
}

function logout() {
  user.logout()
  router.push('/login')
}
</script>

<template>
  <el-card shadow="never">
    <div class="profile">
      <el-avatar :size="64" style="background: #409eff; font-size: 26px">陈</el-avatar>
      <div>
        <div class="name">{{ user.nickname }}</div>
        <div class="sub">目标：{{ user.profile.position }} · {{ user.profile.city }}</div>
        <div class="mt">
          <el-tag type="warning">免费版</el-tag>
          <el-link type="primary" class="ml">升级会员</el-link>
        </div>
      </div>
    </div>

    <el-divider />

    <div
      v-for="m in menus"
      :key="m.label"
      class="menu-item"
      @click="handleMenu(m.path)"
    >
      <span>{{ m.icon }} {{ m.label }}</span>
      <span class="arrow">›</span>
    </div>
    <div class="menu-item" @click="logout">
      <span>🚪 退出登录</span>
      <span class="arrow">›</span>
    </div>
  </el-card>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 8px;
}
.name {
  font-size: 18px;
  font-weight: 600;
}
.sub {
  font-size: 13px;
  color: #909399;
}
.mt {
  margin-top: 8px;
}
.ml {
  margin-left: 8px;
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  font-size: 14px;
}
.menu-item:hover {
  color: #409eff;
}
.arrow {
  color: #909399;
}
</style>
