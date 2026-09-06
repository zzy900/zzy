<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()

const profile = ref({ ...user.profile })
const skillInput = ref('')

function addSkill() {
  const v = skillInput.value.trim()
  if (v && !profile.value.skills.includes(v)) {
    profile.value.skills.push(v)
  }
  skillInput.value = ''
}

function save(goInterview = false) {
  user.profile = { ...profile.value }
  ElMessage.success('档案已保存')
  if (goInterview) router.push('/interview')
}
</script>

<template>
  <div>
    <el-card shadow="never" class="mb">
      <template #header>
        <div class="flex-between">
          <span>求职档案</span>
          <el-tag type="success">已完成 80%</el-tag>
        </div>
      </template>
      <el-progress :percentage="80" class="mb" />

      <el-form label-position="top">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="姓名" required><el-input v-model="profile.name" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高学历" required>
              <el-select v-model="profile.education" style="width: 100%">
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
                <el-option label="大专" value="大专" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校"><el-input v-model="profile.school" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业"><el-input v-model="profile.major" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标岗位" required><el-input v-model="profile.position" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标行业">
              <el-select v-model="profile.industry" style="width: 100%">
                <el-option label="互联网 / IT" value="互联网 / IT" />
                <el-option label="金融" value="金融" />
                <el-option label="制造业" value="制造业" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="期望城市"><el-input v-model="profile.city" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="期望薪资"><el-input v-model="profile.salary" /></el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="技能标签">
          <div>
            <el-tag
              v-for="s in profile.skills"
              :key="s"
              type="primary"
              closable
              class="skill"
              @close="profile.skills = profile.skills.filter((x) => x !== s)"
            >{{ s }}</el-tag>
            <el-input
              v-model="skillInput"
              placeholder="添加技能后回车"
              class="skill-input"
              @keyup.enter="addSkill"
            />
          </div>
        </el-form-item>

        <el-form-item label="工作 / 项目经历">
          <el-input v-model="profile.experience" type="textarea" :rows="3" />
          <div class="hint">档案将用于 AI 面试出题、简历生成与就业指导个性化推荐</div>
        </el-form-item>
      </el-form>

      <el-button @click="save(false)">存为草稿</el-button>
      <el-button type="primary" @click="save(true)">保存并开始面试</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.skill {
  margin: 0 8px 8px 0;
}
.skill-input {
  width: 160px;
  display: inline-block;
}
.hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
