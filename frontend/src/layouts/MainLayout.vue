<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import TopBar from '@/components/TopBar.vue'

const route = useRoute()
const title = computed(() => (route.meta.title as string) ?? '')
</script>

<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <TopBar :title="title" />
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
}
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
}
</style>
