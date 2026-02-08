# 🏗 架构参考手册 (Architecture Reference)

> 记录本项目的关键技术链路与数据结构模式。

## 📦 数据结构映射 (Data Schema)

### 文章模型 `blogData.js`
所有内容加载均依赖于此文件的 `articles` 数组。
```javascript
{
  id: Number,             // 必须唯一，详情页索引关键
  title: String,          // 标题
  excerpt: String,        // 列表展示摘要
  date: String,           // YYYY-MM-DD
  category: String,       // 对应 categories 中的 value
  tags: [String],         // 字符串数组
  gradient: String,       // CSS 渐变字符串，用于 Hero 头部光晕
  content: String         // HTML 格式的长文内容，支持 pre 标签
}
```

## 🔄 核心逻辑链路

### 1. 详情页 -> 列表页联动 (The Linkage)
- **触发**: 在 `BlogDetail.vue` 中点击分类/标签。
- **传递**: 通过 `router.push` 携带 `query.category` 或 `query.tag`。
- **接收**: 在 `Blog.vue` 的 `onMounted` 中通过 `route.query` 获取参数并赋值给对应的响应式状态 `selectedCategory` / `selectedTags`。

### 2. 混合滚动加载 (Hybrid Scroller)
- **PC 控制**: 使用 **Element Plus** 的 `el-pagination` 组件，触发 `handlePageChange` 时执行 `window.scrollTo({ top: 0 })`。
- **移动控制**: 
  - 组件底部设有一个名为 `scrollTrigger` 的 `ref` 元素（哨兵点）。
  - `IntersectionObserver` 实时观察该元素。当其进入视口 10% 时，触发 `loadMore`。

### 3. 全局导航高亮 (Navigation Persistence)
由于详情页（如 `/blog/1`）与列表页（`/blog`）在路由层级上通常是平级的，本项目在 `App.vue` 中使用了 **路径匹配模式**：
- 通过 `:class="{ 'router-link-active': $route.path.startsWith('/path') }"` 确保子路径能够正确激活父级菜单高亮。

## 🛠 技术底座概览 (Tech Stack)
- **框架**: Vue 3.4 (Composition API)
- **构建**: Vite 5.3
- **组件**: Element Plus 2.7
- **路由**: Vue Router 4.3 (History Mode)
- **动画**: GSAP 3.12 + Three.js 0.165 🌸🚀

---
*理解架构，才能让改动不违和。* 🌸🚀
