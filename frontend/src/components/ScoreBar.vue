<script setup lang="ts">
defineProps<{
  name: string
  score: number
}>()

function color(s: number): string {
  return s >= 85 ? '#67c23a' : s >= 75 ? '#409eff' : '#e6a23c'
}
</script>

<template>
  <div class="score-row">
    <div class="name">{{ name }}</div>
    <el-progress :percentage="score" :color="color(score)" :stroke-width="8" class="bar" />
    <div class="val">{{ score }}</div>
  </div>
</template>

<style scoped>
.score-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.name {
  width: 88px;
  font-size: 13px;
  color: #606266;
  text-align: right;
  flex-shrink: 0;
}
.bar {
  flex: 1;
}
.val {
  width: 40px;
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
  flex-shrink: 0;
}
</style>
