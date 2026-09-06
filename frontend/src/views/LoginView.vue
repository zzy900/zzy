<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()

const activeTab = ref<'password' | 'code'>('password')
const phone = ref('138****6688')
const password = ref('12345678')

function handleLogin() {
  user.login()
  router.push('/home')
}
</script>

<template>
  <div class="login-wrap">
    <el-card class="login-card" shadow="always">
      <div class="login-logo">
        <div class="logo">AI</div>
        <div class="t">offerAI 智能面试官</div>
      </div>
      <div class="login-sub">让每一次模拟，都更接近真实的 offer</div>

      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane label="密码登录" name="password">
          <el-form label-position="top">
            <el-form-item label="手机号">
              <el-input v-model="phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="code">
          <el-form label-position="top">
            <el-form-item label="手机号">
              <el-input v-model="phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="验证码">
              <div class="code-row">
                <el-input placeholder="请输入验证码" />
                <el-button>获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-button type="primary" size="large" class="login-btn" @click="handleLogin">
        登 录
      </el-button>
      <div class="reg">还没有账号？<el-link type="primary" @click="handleLogin">立即注册</el-link></div>
    </el-card>
  </div>
</template>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e6f0ff 0%, #f5f7fa 60%);
  padding: 20px;
}
.login-card {
  width: 400px;
  border-radius: 12px;
  padding: 8px 16px 24px;
}
.login-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin: 8px 0 4px;
}
.logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #409eff, #79bbff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
}
.t {
  font-size: 22px;
  font-weight: 700;
}
.login-sub {
  text-align: center;
  color: #909399;
  margin-bottom: 8px;
  font-size: 13px;
}
.code-row {
  display: flex;
  gap: 10px;
  width: 100%;
}
.login-btn {
  width: 100%;
  margin-top: 4px;
}
.reg {
  text-align: center;
  font-size: 13px;
  color: #909399;
  margin-top: 16px;
}
</style>
