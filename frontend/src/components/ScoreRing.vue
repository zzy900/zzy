<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  color?: string
}>()

const style = computed(() => ({
  background: `conic-gradient(${props.color ?? '#67c23a'} 0 ${props.score}%, #ebeef5 ${props.score}% 100%)`,
}))
</script>

<template>
  <div class="ring" :style="style">
    <div class="num">{{ score }}<small>/100</small></div>
  </div>
</template>

<style scoped>
.ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
}
.ring::before {
  content: '';
  position: absolute;
  width: 88px;
  height: 88px;
  background: #fff;
  border-radius: 50%;
}
.num {
  position: relative;
  font-size: 28px;
  font-weight: 700;
  color: #67c23a;
}
.num small {
  font-size: 12px;
  color: #909399;
}
</style>
