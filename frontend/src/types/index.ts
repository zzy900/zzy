export interface DimensionScore {
  name: string
  score: number
}

export interface InterviewConfig {
  position: string
  type: string
  level: string
  rounds: string
  language: string
  style: string
}

export interface ChatMessage {
  role: 'ai' | 'user'
  content: string
  typing?: boolean
}

export interface InterviewStep {
  ai: string
  quick: string[]
}

export interface ProfileForm {
  name: string
  education: string
  school: string
  major: string
  position: string
  industry: string
  city: string
  salary: string
  skills: string[]
  experience: string
}

export interface ReportQuestion {
  question: string
  comment: string
  level: 'success' | 'warning' | 'danger' | 'info'
  tag: string
}
