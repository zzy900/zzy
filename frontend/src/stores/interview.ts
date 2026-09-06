import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { InterviewConfig, ChatMessage, InterviewStep } from '@/types'

const SCRIPT: InterviewStep[] = [
  {
    ai: '你好，欢迎参加本次前端开发工程师模拟面试。我是你的 AI 面试官。\n\n请先做一个简短的自我介绍，让我快速了解你的背景。',
    quick: ['我是计算机专业应届生，熟悉 Vue3 与 TypeScript', '我有半年前端实习经验，做过组件化重构'],
  },
  {
    ai: '感谢你的介绍。了解到你熟悉 Vue 3 与响应式系统。\n\n第一个问题：请谈谈 Vue 3 的响应式原理，与 Vue 2 相比有什么改进？',
    quick: ['基于 Proxy 实现，能拦截对象动态属性的增删'],
  },
  {
    ai: '不错的回答，提到了 Proxy 的核心优势。\n\n追问：如果让你优化一个首屏加载缓慢的中后台项目，你会从哪些方面入手？',
    quick: ['路由懒加载、组件按需引入、图片与第三方库优化'],
  },
  {
    ai: '思路很清晰。\n\n最后一个问题：你为什么选择我们公司？对未来的职业规划是怎样的？',
    quick: ['看好贵司技术栈与业务方向，希望深耕前端领域'],
  },
  {
    ai: '好的，本次面试到这里就结束了。\n\n感谢你的参与，AI 正在为你生成面试报告……',
    quick: [],
  },
]

export const useInterviewStore = defineStore('interview', () => {
  const config = ref<InterviewConfig>({
    position: '前端开发工程师',
    type: '综合面试',
    level: '中级',
    rounds: '5 题',
    language: '中文',
    style: '温和引导',
  })
  const messages = ref<ChatMessage[]>([])
  const stepIndex = ref(0)
  const started = ref(false)
  const finished = ref(false)

  function reset() {
    messages.value = []
    stepIndex.value = 0
    started.value = true
    finished.value = false
    messages.value.push({ role: 'ai', content: SCRIPT[0].ai, typing: true })
  }

  function currentStep(): InterviewStep | undefined {
    return SCRIPT[stepIndex.value]
  }

  function nextStep() {
    stepIndex.value++
    return SCRIPT[stepIndex.value]
  }

  function send(content: string) {
    if (finished.value) return
    messages.value.push({ role: 'user', content })
    const next = nextStep()
    if (next) {
      setTimeout(() => {
        messages.value.push({ role: 'ai', content: next.ai, typing: true })
      }, 500)
    } else {
      finished.value = true
    }
  }

  function finish() {
    finished.value = true
  }

  return { config, messages, stepIndex, started, finished, reset, currentStep, send, finish, SCRIPT }
})
