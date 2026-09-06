<script setup lang="ts">
defineProps<{
  label: string
  value: string
  foot?: string
  color?: 'blue' | 'green' | 'orange'
}>()
</script>

<template>
  <el-card shadow="never">
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value" :class="color">{{ value }}</div>
    <div v-if="foot" class="stat-foot">{{ foot }}</div>
  </el-card>
</template>

<style scoped>
.stat-label {
  font-size: 13px;
  color: #909399;
}
.stat-value {
  font-size: 26px;
  font-weight: 700;
  margin: 6px 0 2px;
}
.stat-value.blue {
  color: #409eff;
}
.stat-value.green {
  color: #67c23a;
}
.stat-value.orange {
  color: #e6a23c;
}
.stat-foot {
  font-size: 12px;
  color: #909399;
}
</style>
