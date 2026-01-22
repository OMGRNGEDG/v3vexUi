import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// vxe-table 样式（基础表格）
import 'vxe-table/lib/style.css'

createApp(App).use(router).mount('#app')

