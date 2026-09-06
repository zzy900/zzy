<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import ScoreRing from '@/components/ScoreRing.vue'
import ScoreBar from '@/components/ScoreBar.vue'

const analyzed = ref(false)
const uploading = ref(false)

const dimensions = [
  { name: '完整性', score: 80 },
  { name: '结构清晰度', score: 75 },
  { name: '关键词匹配', score: 68 },
  { name: '量化成果', score: 55 },
  { name: '语言表达', score: 82 },
  { name: '岗位匹配', score: 72 },
]

const suggestions = [
  { title: '缺少量化成果', detail: '实习经历中「负责后台系统重构」未体现具体数据，建议补充「首屏加载时间降低 40%」等量化指标', original: '负责后台管理系统的组件化重构与性能优化' },
  { title: '关键词匹配不足', detail: '简历未突出「Vue 3 / TypeScript」等目标岗位高频关键词，建议在技能与经历中强化', original: '熟悉前端框架与开发语言' },
  { title: '结构可优化', detail: '项目经历未按 STAR 法则组织，建议补充背景、任务、行动、结果', original: '参与多个项目开发，积累实战经验' },
]

function analyze() {
  uploading.value = true
  setTimeout(() => {
    uploading.value = false
    analyzed.value = true
    ElMessage.success('简历解析完成，已生成诊断报告')
  }, 1200)
}
</script>

<template>
  <div>
    <!-- 上传态 -->
    <el-card v-if="!analyzed" shadow="never" class="center">
      <div class="upload-icon">📄</div>
      <div class="upload-title">上传简历，AI 智能诊断</div>
      <div class="upload-sub">支持 PDF / Word / 图片格式</div>
      <el-button type="primary" size="large" :loading="uploading" @click="analyze">
        上传并解析简历
      </el-button>
    </el-card>

    <!-- 结果态 -->
    <template v-else>
      <el-row :gutter="16" class="mb">
        <el-col :span="10">
          <el-card shadow="never" class="center">
            <template #header>简历综合评分</template>
            <ScoreRing :score="72" color="#e6a23c" />
            <div class="desc">良好 · 有较大提升空间</div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card shadow="never">
            <template #header>诊断维度</template>
            <ScoreBar v-for="d in dimensions" :key="d.name" :name="d.name" :score="d.score" />
          </el-card>
        </el-col>
      </el-row>

      <el-card shadow="never">
        <template #header>优化建议（3 处）</template>
        <div v-for="s in suggestions" :key="s.title" class="sug">
          <div class="flex-between">
            <div class="sug-title">{{ s.title }}</div>
            <el-tag type="warning">待改进</el-tag>
          </div>
          <div class="sug-detail">{{ s.detail }}</div>
          <div class="sug-row">
            <span class="sug-original">原文：{{ s.original }}</span>
            <el-button size="small">一键改写</el-button>
          </div>
        </div>
        <el-button type="primary" @click="ElMessage.info('导出功能开发中')">选择模板导出</el-button>
      </el-card>
    </template>
  </div>
</template>

<style scoped>
.center {
  text-align: center;
}
.upload-icon {
  font-size: 40px;
  margin: 24px 0 8px;
}
.upload-title {
  font-size: 15px;
}
.upload-sub {
  font-size: 13px;
  color: #909399;
  margin: 8px 0 16px;
}
.mb {
  margin-bottom: 16px;
}
.desc {
  font-size: 13px;
  color: #e6a23c;
  margin-top: 12px;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sug {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}
.sug-title {
  font-weight: 600;
  font-size: 13px;
}
.sug-detail {
  font-size: 13px;
  color: #606266;
  margin: 8px 0;
}
.sug-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sug-original {
  font-size: 12px;
  color: #909399;
  background: #f4f4f5;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
