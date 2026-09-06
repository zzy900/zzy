<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useInterviewStore } from '@/stores/interview'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const interview = useInterviewStore()
const user = useUserStore()

const config = ref({ ...interview.config })
const chatBody = ref<HTMLElement>()
const input = ref('')

const quick = computed(() => interview.currentStep()?.quick ?? [])

function scrollBottom() {
  nextTick(() => {
    if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight
  })
}

watch(() => interview.messages.length, scrollBottom)

function start() {
  interview.config = { ...config.value }
  interview.reset()
  scrollBottom()
}

function send(text?: string) {
  const content = (text ?? input.value).trim()
  if (!content || interview.finished) return
  interview.send(content)
  input.value = ''
  scrollBottom()
}

function pickQuick(q: string) {
  send(q)
}

function generateReport() {
  router.push('/report')
}
</script>

<template>
  <div>
    <!-- 未开始：配置面板 -->
    <el-card v-if="!interview.started" shadow="never">
      <template #header>面试配置</template>
      <el-form label-position="top">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="目标岗位">
              <el-input v-model="config.position" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面试类型">
              <el-select v-model="config.type" style="width: 100%">
                <el-option label="综合面试" value="综合面试" />
                <el-option label="技术面试" value="技术面试" />
                <el-option label="行为面试" value="行为面试" />
                <el-option label="HR 面试" value="HR 面试" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度">
              <el-select v-model="config.level" style="width: 100%">
                <el-option label="初级" value="初级" />
                <el-option label="中级" value="中级" />
                <el-option label="高级" value="高级" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="问题轮数">
              <el-select v-model="config.rounds" style="width: 100%">
                <el-option label="3 题" value="3 题" />
                <el-option label="5 题" value="5 题" />
                <el-option label="10 题" value="10 题" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面试语言">
              <el-select v-model="config.language" style="width: 100%">
                <el-option label="中文" value="中文" />
                <el-option label="英文" value="英文" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面试风格">
              <el-select v-model="config.style" style="width: 100%">
                <el-option label="温和引导" value="温和引导" />
                <el-option label="压力面" value="压力面" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="note">已根据你的求职档案自动预填岗位与难度，可手动修改</div>
      <el-button type="primary" size="large" class="start-btn" @click="start">开始面试</el-button>
    </el-card>

    <!-- 进行中：对话面板 -->
    <el-card v-else shadow="never">
      <template #header>
        <div class="flex-between">
          <span>💬 {{ interview.config.position }} · {{ interview.config.type }} · {{ interview.config.level }}</span>
          <el-tag type="primary">第 {{ Math.min(interview.stepIndex + 1, interview.SCRIPT.length - 1) }} 轮</el-tag>
        </div>
      </template>

      <div ref="chatBody" class="chat-body">
        <div
          v-for="(m, i) in interview.messages"
          :key="i"
          class="msg"
          :class="m.role"
        >
          <div v-if="m.role === 'ai'" class="ai-avatar">AI</div>
          <div class="bubble">
            <span v-if="m.typing" class="typing"><span></span><span></span><span></span></span>
            <template v-else>{{ m.content }}</template>
          </div>
        </div>
      </div>

      <div v-if="!interview.finished" class="quick">
        <el-tag
          v-for="(q, i) in quick"
          :key="i"
          type="primary"
          class="quick-tag"
          @click="pickQuick(q)"
        >{{ q }}</el-tag>
      </div>

      <div v-if="!interview.finished" class="input-row">
        <el-input
          v-model="input"
          placeholder="输入你的回答，或点击上方快捷回复…"
          @keyup.enter="send()"
        />
        <el-button type="primary" @click="send()">发送</el-button>
      </div>

      <el-button v-else type="primary" size="large" class="start-btn" @click="generateReport">
        生成面试报告 →
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.note {
  font-size: 12px;
  color: #909399;
  background: #f4f4f5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.start-btn {
  width: 100%;
}
.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.quick-tag {
  cursor: pointer;
  padding: 7px 12px;
  height: auto;
}
.input-row {
  display: flex;
  gap: 10px;
  border-top: 1px solid #ebeef5;
  padding-top: 14px;
}
.ai-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff, #79bbff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}
</style>
