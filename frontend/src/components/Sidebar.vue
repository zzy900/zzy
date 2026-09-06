<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const menus = [
  { path: '/home', icon: 'HomeFilled', label: '首页' },
  { path: '/profile', icon: 'Document', label: '求职档案' },
  { path: '/interview', icon: 'ChatDotRound', label: 'AI 模拟面试' },
  { path: '/resume', icon: 'Tickets', label: '简历优化' },
  { path: '/guidance', icon: 'Compass', label: '就业指导' },
  { path: '/community', icon: 'UserFilled', label: '求职社区', badge: '规划中' },
  { path: '/me', icon: 'User', label: '个人中心' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-logo">AI</div>
      <div class="brand-name">
        offerAI 智能面试官
        <small>AI 模拟面试系统</small>
      </div>
    </div>

    <el-menu :default-active="route.path" router class="menu">
      <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
        <el-icon><component :is="m.icon" /></el-icon>
        <span>{{ m.label }}</span>
        <el-tag v-if="m.badge" size="small" type="info" class="badge">{{ m.badge }}</el-tag>
      </el-menu-item>
    </el-menu>

    <div class="foot">
      offerAI 智能面试官 v0.1<br />
      产品原型 · 仅供演示
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid #ebeef5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
}
.brand {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
}
.brand-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #409eff, #79bbff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}
.brand-name {
  font-size: 15px;
  font-weight: 600;
}
.brand-name small {
  display: block;
  font-size: 11px;
  color: #909399;
  font-weight: 400;
}
.menu {
  flex: 1;
  border-right: none;
  padding: 12px 8px;
}
.badge {
  margin-left: auto;
}
.foot {
  padding: 12px 20px;
  border-top: 1px solid #ebeef5;
  font-size: 12px;
  color: #909399;
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
