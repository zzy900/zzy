<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <header class="topbar">
    <div class="title">{{ title }}</div>
    <div class="right">
      <span class="quota">免费版 · 今日剩余 3 次面试</span>
      <el-avatar :size="34" style="background: #409eff">陈</el-avatar>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}
.quota {
  font-size: 13px;
  color: #909399;
}
</style>
