<script setup lang="ts"></script>

<template>
  <div class="wrap">
    <h2 class="title">404</h2>
    <p class="desc">页面不存在。</p>
    <router-link class="btn" :to="{ name: 'home' }">回首页</router-link>
  </div>
</template>

<style scoped>
.wrap {
  min-height: 320px;
  display: grid;
  place-items: center;
  gap: 8px;
}
.title {
  margin: 0;
  font-size: 22px;
}
.desc {
  margin: 0;
  font-size: 13px;
  color: #666;
}
.btn {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fafafa;
  color: #111;
  text-decoration: none;
  font-size: 13px;
}
.btn:hover {
  background: #f3f3f3;
}
</style>

