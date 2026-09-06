<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScoreRing from '@/components/ScoreRing.vue'
import RadarChart from '@/components/RadarChart.vue'
import ScoreBar from '@/components/ScoreBar.vue'
import type { ReportQuestion } from '@/types'

const router = useRouter()

const dimensions = [
  { name: '沟通表达', score: 86 },
  { name: '逻辑思维', score: 90 },
  { name: '专业知识', score: 78 },
  { name: '岗位匹配', score: 84 },
  { name: '临场应变', score: 80 },
]

const questions: ReportQuestion[] = [
  { question: 'Q1 请做个自我介绍', comment: '回答完整、突出项目亮点，建议补充量化成果', level: 'success', tag: '亮点' },
  { question: 'Q2 谈谈你在实习中的性能优化经验', comment: '逻辑清晰，但缺少具体性能数据支撑', level: 'warning', tag: '待改进' },
  { question: 'Q3 Vue3 响应式原理？', comment: '回答准确，能结合源码理解', level: 'success', tag: '亮点' },
  { question: 'Q4 为什么选择我们公司？', comment: '对公司了解不足，建议提前调研', level: 'danger', tag: '不足' },
  { question: 'Q5 你有什么想问我的？', comment: '提问有针对性，展现求职动机', level: 'success', tag: '亮点' },
]

const tagType: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
}
</script>

<template>
  <div>
    <el-row :gutter="16" class="mb">
      <el-col :span="10">
        <el-card shadow="never" class="center">
          <template #header>综合评分</template>
          <ScoreRing :score="85" />
          <div class="desc">表现优秀 · 超越 78% 同岗位求职者</div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never">
          <template #header>能力维度分析</template>
          <RadarChart
            :labels="dimensions.map((d) => d.name)"
            :values="dimensions.map((d) => d.score)"
          />
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="mb">
      <template #header>维度评分</template>
      <ScoreBar v-for="d in dimensions" :key="d.name" :name="d.name" :score="d.score" />
    </el-card>

    <el-card shadow="never">
      <template #header>逐题回顾</template>
      <div v-for="q in questions" :key="q.question" class="q-item">
        <div class="flex-between">
          <div class="q-title">{{ q.question }}</div>
          <el-tag :type="tagType[q.level]">{{ q.tag }}</el-tag>
        </div>
        <div class="q-comment">{{ q.comment }}</div>
      </div>
      <el-button type="primary" @click="router.push('/interview')">再次练习</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.center {
  text-align: center;
}
.desc {
  font-size: 13px;
  color: #67c23a;
  margin-top: 12px;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.q-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}
.q-title {
  font-weight: 600;
  font-size: 13px;
}
.q-comment {
  font-size: 13px;
  color: #606266;
  margin-top: 6px;
}
</style>
