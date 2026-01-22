<script setup lang="ts">
import { useAuth } from '@/auth/auth'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const route = useRoute()

const form = reactive({
  username: '',
  password: ''
})

const state = reactive({
  submitting: false,
  error: ''
})

const redirect = computed(() => {
  const q = route.query.redirect
  return typeof q === 'string' && q ? q : '/'
})

async function onSubmit() {
  state.error = ''
  state.submitting = true
  try {
    await auth.login({ username: form.username, password: form.password })
    await router.replace(redirect.value)
  } catch (e) {
    state.error = e instanceof Error ? e.message : '登录失败'
  } finally {
    state.submitting = false
  }
}
</script>

<template>
  <div class="wrap">
    <div class="card">
      <h2 class="title">登录</h2>
      <p class="desc">示例鉴权：输入任意非空用户名/密码即可登录（mock token）。</p>

      <form class="form" @submit.prevent="onSubmit">
        <label class="label">
          <span>用户名</span>
          <input v-model.trim="form.username" class="input" autocomplete="username" />
        </label>

        <label class="label">
          <span>密码</span>
          <input v-model="form.password" class="input" type="password" autocomplete="current-password" />
        </label>

        <p v-if="state.error" class="error">{{ state.error }}</p>

        <button class="btn" type="submit" :disabled="state.submitting">
          {{ state.submitting ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  min-height: 360px;
  display: grid;
  place-items: center;
}
.card {
  width: min(420px, 100%);
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}
.title {
  margin: 0 0 8px;
  font-size: 18px;
}
.desc {
  margin: 0 0 14px;
  font-size: 13px;
  color: #666;
}
.form {
  display: grid;
  gap: 10px;
}
.label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: #333;
}
.input {
  height: 34px;
  padding: 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
}
.input:focus {
  border-color: #cbd5e1;
}
.error {
  margin: 2px 0 0;
  font-size: 13px;
  color: #b91c1c;
}
.btn {
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

