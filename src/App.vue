<script setup lang="ts">
import { useAuth } from '@/auth/auth'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const route = useRoute()

const username = computed(() => auth.state.user?.username ?? '')

function onLogout() {
  auth.logout()
  router.push({ name: 'login', query: { redirect: route.fullPath } })
}
</script>

<template>
  <div class="app">
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji',
    'Segoe UI Emoji';
}
.header {
  margin-bottom: 16px;
}
.title {
  font-size: 20px;
  margin: 0 0 8px;
}
.desc {
  margin: 0;
  color: #666;
  font-size: 14px;
}
.main {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
}
.actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.user {
  font-size: 13px;
  color: #333;
}
.btn {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
  color: #111;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
}
.btn:hover {
  background: #f3f3f3;
}
</style>

