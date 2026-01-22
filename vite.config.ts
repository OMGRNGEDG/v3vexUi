import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

/**
 * vxe-table 按需引入（不依赖额外 resolver 包，直接用自定义 resolver）
 * 说明：模板里写 <vxe-table/> 会被编译成组件名 VxeTable；<vxe-column/> -> VxeColumn
 */
function vxeTableResolver(componentName: string) {
  const map: Record<string, string> = {
    VxeTable: 'VxeTable',
    VxeColumn: 'VxeColumn',
    VxeColgroup: 'VxeColgroup',
    VxeToolbar: 'VxeToolbar',
    VxePager: 'VxePager',
    VxeForm: 'VxeForm',
    VxeFormItem: 'VxeFormItem',
    VxeInput: 'VxeInput',
    VxeSelect: 'VxeSelect',
    VxeOption: 'VxeOption',
    VxeButton: 'VxeButton',
    VxeModal: 'VxeModal'
  }

  const named = map[componentName]
  if (!named) return

  return {
    from: 'vxe-table',
    name: named
  }
}

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [vxeTableResolver]
    })
  ]
})

