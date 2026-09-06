<script setup lang="ts">
const cards = [
  { icon: '🧭', title: '职业规划咨询', desc: '基于你的求职档案，生成个性化职业方向与发展路径建议', items: ['职业方向分析', '能力差距评估', '学习提升路线'], color: '#409eff' },
  { icon: '💗', title: '求职心理辅导', desc: '面对求职焦虑与挫败情绪，提供 AI 情绪疏导与减压支持', items: ['AI 情绪疏导', '呼吸放松训练', '正向激励'], color: '#67c23a' },
  { icon: '📚', title: '干货内容', desc: '面试技巧、简历方法、行业知识等求职干货', items: ['面试攻略', '简历指南', '行业洞察'], color: '#e6a23c' },
  { icon: '📊', title: '就业数据', desc: '行业薪酬、岗位需求、招聘动态等资讯', items: ['薪酬水平', '岗位热度', '招聘趋势'], color: '#f56c6c' },
]
</script>

<template>
  <el-row :gutter="16">
    <el-col v-for="c in cards" :key="c.title" :span="12">
      <el-card shadow="never" class="mb">
        <div class="icon">{{ c.icon }}</div>
        <div class="title">{{ c.title }}</div>
        <div class="desc">{{ c.desc }}</div>
        <div class="tags">
          <el-tag
            v-for="it in c.items"
            :key="it"
            :style="{ color: c.color, borderColor: c.color, background: c.color + '1a' }"
          >{{ it }}</el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.icon {
  font-size: 28px;
}
.title {
  font-weight: 600;
  font-size: 16px;
  margin: 8px 0 4px;
}
.desc {
  font-size: 13px;
  color: #909399;
  margin-bottom: 12px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
