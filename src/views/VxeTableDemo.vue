<script setup lang="ts">
import { reactive } from 'vue'

type Row = {
  id: number
  name: string
  age: number
  address: string
}

const state = reactive<{
  loading: boolean
  rows: Row[]
}>({
  loading: false,
  rows: [
    { id: 10001, name: '张三', age: 28, address: '上海' },
    { id: 10002, name: '李四', age: 32, address: '北京' },
    { id: 10003, name: '王五', age: 25, address: '深圳' }
  ]
})
</script>

<template>
  <section>
    <h2 class="h2">基础表格</h2>

    <!-- vxe-table 组件：通过 vite.config.ts 的 resolver 实现按需自动导入 -->
    <vxe-table
      border
      height="360"
      :loading="state.loading"
      :data="state.rows"
    >
      <vxe-column field="id" title="ID" width="100" />
      <vxe-column field="name" title="姓名" min-width="160" />
      <vxe-column field="age" title="年龄" width="120" />
      <vxe-column field="address" title="地址" min-width="220" />
    </vxe-table>

    <p class="tip">
      参考安装与 useTable 指引：
      <a
        href="https://vxetable.cn/v4/#/start/useTable/install"
        target="_blank"
        rel="noreferrer"
      >
        vxetable v4 安装文档
      </a>
    </p>
  </section>
</template>

<style scoped>
.h2 {
  font-size: 16px;
  margin: 0 0 12px;
}
.tip {
  margin: 12px 0 0;
  font-size: 13px;
  color: #666;
}
</style>

