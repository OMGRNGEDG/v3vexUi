<script setup lang="ts">
import VxeTableDemo from './views/VxeTableDemo.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Vite + Vue3 + TS + vxe-table（按需引入）</h1>
      <p class="desc">
        组件通过 <code>unplugin-vue-components</code> 自动解析导入；样式在 <code>main.ts</code> 里引入。
      </p>
    </header>

    <main class="main">
      <VxeTableDemo />
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
</style>

