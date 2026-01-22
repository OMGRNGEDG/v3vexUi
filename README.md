# v3vexUi

Vite 构建的 Vue3 + TypeScript 项目，并集成 `vxe-table v4`（按需引入）。

## 开发

```bash
npm install
npm run dev
```

如果你的机器上 `~/.npm` 缓存权限有问题（例如报 `EPERM`），可以改用项目内缓存目录：

```bash
mkdir -p .npm-cache
npm install --cache ".npm-cache"
```

## 构建

```bash
npm run build
npm run preview
```

## vxe-table（按需引入）

- 组件按需：使用 `unplugin-vue-components` + 自定义 resolver（见 `vite.config.ts`）
- 样式：在 `src/main.ts` 里引入 `vxe-table/lib/style.css`

如果你安装的 `vxe-table` 版本命名导出与 resolver 不一致（不同版本可能存在差异），最稳妥的兜底方式是全量注册（不按需）：

```ts
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
createApp(App).use(VXETable).mount('#app')
```

官方安装与 useTable 文档：[`https://vxetable.cn/v4/#/start/useTable/install`](https://vxetable.cn/v4/#/start/useTable/install)

