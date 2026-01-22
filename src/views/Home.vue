<script setup lang="ts">
import VxeTableDemo from './VxeTableDemo.vue'
</script>

<template>
  <section>
    <h2 class="h2">受保护页面（需要登录）</h2>
    <p class="tip">下面这个 vxe-table demo 只有登录后才能访问。</p>
    <VxeTableDemo />
  </section>
</template>

<style scoped>
.h2 {
  font-size: 16px;
  margin: 0 0 8px;
}
.tip {
  margin: 0 0 12px;
  font-size: 13px;
  color: #666;
}
</style>

