<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import StatCard from '@/components/StatCard.vue'

const router = useRouter()
const user = useUserStore()

const entries = [
  { icon: '💬', title: '模拟面试', desc: '开始一场真实面试演练', path: '/interview' },
  { icon: '📄', title: '简历优化', desc: 'AI 诊断与智能改写', path: '/resume' },
  { icon: '🧭', title: '就业指导', desc: '职业规划与心理辅导', path: '/guidance' },
  { icon: '👥', title: '求职社区', desc: '面经互助（规划中）', path: '/community' },
]
</script>

<template>
  <div>
    <el-row :gutter="16" class="mb">
      <el-col :span="8"><StatCard label="累计面试次数" value="12" foot="较上周 +3 次" color="blue" /></el-col>
      <el-col :span="8"><StatCard label="面试平均分" value="82.5" foot="较上周 +4.2 分" color="green" /></el-col>
      <el-col :span="8"><StatCard label="简历评分" value="72" foot="待优化项 3 处" color="orange" /></el-col>
    </el-row>

    <el-card class="hero mb" shadow="never">
      <div class="hero-title">下午好，{{ user.nickname }} 👋</div>
      <div class="hero-sub">目标岗位：{{ user.profile.position }} · 距秋招黄金期还有 28 天，继续保持练习</div>
      <el-button class="hero-btn" size="large" @click="router.push('/interview')">
        开始模拟面试 →
      </el-button>
    </el-card>

    <el-card shadow="never" class="mb">
      <template #header>快捷入口</template>
      <el-row :gutter="16">
        <el-col v-for="e in entries" :key="e.path" :span="6">
          <el-card shadow="never" class="entry" @click="router.push(e.path)">
            <div class="entry-icon">{{ e.icon }}</div>
            <div class="entry-title">{{ e.title }}</div>
            <div class="entry-desc">{{ e.desc }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="flex-between">
          <span>最新面试报告</span>
          <el-tag type="primary">前端开发 · 综合面试</el-tag>
        </div>
      </template>
      <div class="flex-between">
        <div>
          <div class="score">
            85 分
            <el-tag type="success">表现优秀</el-tag>
          </div>
          <div class="score-sub">2026-09-05 · 10 道题 · 亮点：逻辑清晰、项目表达完整</div>
        </div>
        <el-button @click="router.push('/report')">查看完整报告</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.hero {
  background: linear-gradient(120deg, #409eff, #66b1ff);
  border: none;
  color: #fff;
}
.hero-title {
  font-size: 18px;
  font-weight: 600;
}
.hero-sub {
  font-size: 13px;
  opacity: 0.9;
  margin: 6px 0 18px;
}
.hero-btn {
  background: #fff;
  color: #409eff;
  border: none;
}
.entry {
  cursor: pointer;
  text-align: center;
  transition: box-shadow 0.2s;
}
.entry:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.entry-icon {
  font-size: 26px;
}
.entry-title {
  font-weight: 600;
  margin: 6px 0 2px;
}
.entry-desc {
  font-size: 12px;
  color: #909399;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.score {
  font-size: 22px;
  font-weight: 700;
  color: #409eff;
  margin-bottom: 4px;
}
.score-sub {
  font-size: 13px;
  color: #909399;
}
</style>
