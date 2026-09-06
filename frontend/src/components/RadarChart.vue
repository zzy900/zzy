<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const R = 90
const CX = 150
const CY = 115

function point(r: number, i: number): string {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / props.labels.length
  return `${(CX + r * Math.cos(a)).toFixed(1)},${(CY + r * Math.sin(a)).toFixed(1)}`
}

const grid = computed(() =>
  [1, 0.8, 0.6, 0.4, 0.2]
    .map((s) => props.labels.map((_, i) => point(R * s, i)).join(' '))
    .map((pts) => pts),
)

const spokes = computed(() =>
  props.labels.map((label, i) => {
    const [x, y] = point(R, i).split(',')
    const [tx, ty] = point(R * 1.16, i).split(',')
    return {
      x1: CX, y1: CY,
      x2: Number(x), y2: Number(y),
      tx: Number(tx), ty: Number(ty) + 4,
      label,
    }
  }),
)

const dataPolygon = computed(() =>
  props.values.map((v, i) => point((R * v) / 100, i)).join(' '),
)

const dataPoints = computed(() =>
  props.values.map((v, i) => point((R * v) / 100, i).split(',')),
)
</script>

<template>
  <svg viewBox="0 0 300 240" class="radar">
    <polygon
      v-for="(pts, i) in grid"
      :key="i"
      :points="pts"
      fill="none"
      stroke="#ebeef5"
      stroke-width="1"
    />
    <line
      v-for="(s, i) in spokes"
      :key="'s' + i"
      :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2"
      stroke="#ebeef5"
    />
    <text
      v-for="(s, i) in spokes"
      :key="'t' + i"
      :x="s.tx" :y="s.ty"
      font-size="11" fill="#909399" text-anchor="middle"
    >{{ s.label }}</text>
    <polygon
      :points="dataPolygon"
      fill="rgba(64,158,255,.25)"
      stroke="#409eff"
      stroke-width="2"
    />
    <circle
      v-for="(p, i) in dataPoints"
      :key="'d' + i"
      :cx="p[0]" :cy="p[1]" r="3.5" fill="#409eff"
    />
  </svg>
</template>

<style scoped>
.radar {
  width: 100%;
  max-width: 340px;
  display: block;
  margin: 0 auto;
}
</style>
