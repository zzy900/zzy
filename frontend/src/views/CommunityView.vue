<script setup lang="ts">
</script>

<template>
  <el-card shadow="never" class="center">
    <div class="icon">👥</div>
    <div class="title">求职社区 · 规划中</div>
    <div class="sub">面经互助、题库众创、模拟面试搭子匹配</div>
    <div class="tags">
      <el-tag type="primary">问答 / 经验分享</el-tag>
      <el-tag type="primary">面经题库众创</el-tag>
      <el-tag type="primary">互助匹配搭子</el-tag>
    </div>
    <div class="foot">预计 V2.0 上线，敬请期待</div>
  </el-card>
</template>

<style scoped>
.center {
  text-align: center;
  padding: 40px;
}
.icon {
  font-size: 40px;
  margin-bottom: 8px;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
.sub {
  font-size: 13px;
  color: #909399;
  margin: 8px 0 16px;
}
.tags {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.foot {
  font-size: 13px;
  color: #909399;
  margin-top: 16px;
}
</style>
