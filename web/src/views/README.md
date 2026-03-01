# Views 目录结构说明

## 概述
本目录包含所有页面组件，每个页面都有独立的文件夹，包含页面组件、数据文件和文档。

## 目录结构

```
views/
├── home/              # 首页
│   ├── Home.vue
│   └── README.md
├── blog/              # 博客
│   ├── Blog.vue
│   ├── BlogDetail.vue
│   ├── data/
│   │   └── blogData.js
│   └── README.md
├── about/             # 关于
│   ├── About.vue
│   └── README.md
├── learning/          # 学习笔记
│   ├── LearningNotes.vue
│   ├── data/
│   │   ├── dockerData.js
│   │   ├── linuxData.js
│   │   ├── phpData.js
│   │   ├── redisData.js
│   │   ├── elkData.js
│   │   └── index.js
│   └── README.md
└── README.md          # 本文档
```

## 页面模块

### 1. Home - 首页
**路径:** `src/views/home/`  
**路由:** `/`  
**文件:** `Home.vue`

**功能:**
- 7 个全屏展示区域
- WebGL 粒子动画
- Three.js 3D 图形
- 交互式视觉效果
- 屏幕导航系统

---

### 2. Blog - 博客
**路径:** `src/views/blog/`  
**路由:** `/blog`, `/blog/:id`  
**文件:** `Blog.vue`, `BlogDetail.vue`, `data/blogData.js`

**功能:**
- 文章列表展示
- 分类和标签筛选
- 搜索功能
- 响应式分页/无限滚动
- 文章详情页

---

### 3. About - 关于
**路径:** `src/views/about/`  
**路由:** `/about`  
**文件:** `About.vue`

**功能:**
- 个人简介
- 核心技能展示
- 技术沉淀时间线
- 社交链接

---

### 4. Learning - 学习笔记
**路径:** `src/views/learning/`  
**路由:** `/learning`  
**文件:** `LearningNotes.vue`, `data/*.js`

**功能:**
- 技术栈导航
- 课程式章节结构
- 代码示例展示
- 代码复制功能

---

## 文件组织规范

### 标准结构
每个页面文件夹应包含：

```
page-name/
├── PageName.vue       # 主页面组件（必需）
├── ComponentName.vue  # 子组件（可选）
├── data/              # 数据文件（可选）
│   └── *.js
└── README.md          # 模块文档（必需）
```

### 命名规范
- **文件夹名**: 小写字母，连字符分隔（kebab-case）
  - 例如: `home`, `blog`, `learning`
- **Vue 组件**: 大驼峰命名（PascalCase）
  - 例如: `Home.vue`, `BlogDetail.vue`
- **数据文件**: 小驼峰命名（camelCase）
  - 例如: `blogData.js`, `dockerData.js`

### 文档要求
每个页面文件夹必须包含 `README.md`，内容应包括：
- 模块说明
- 功能特性
- 文件结构
- 页面布局/结构
- 数据结构（如适用）
- 技术实现要点
- 样式设计
- 响应式设计
- 内容更新指南
- 未来扩展计划

## 添加新页面步骤

### 1. 创建页面文件夹
```bash
mkdir src/views/new-page
```

### 2. 创建页面组件
```bash
# 创建主组件
touch src/views/new-page/NewPage.vue

# 创建文档
touch src/views/new-page/README.md
```

### 3. 创建数据文件（如需要）
```bash
mkdir src/views/new-page/data
touch src/views/new-page/data/newPageData.js
```

### 4. 配置路由
在 `src/router/index.js` 添加路由：

```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('../views/new-page/NewPage.vue'),
}
```

### 5. 更新导航
在 `src/App.vue` 添加导航链接：

```vue
<router-link to="/new-page" class="nav-item">
  新页面
</router-link>
```

### 6. 编写文档
在 `README.md` 中详细说明页面功能和使用方法。

### 7. 实现功能
开发页面组件、数据文件等。

### 8. 测试
- 功能测试
- 响应式测试
- 路由跳转测试
- 性能测试

## 页面间通信

### 路由跳转
```javascript
import { useRouter } from 'vue-router';
const router = useRouter();

// 基本跳转
router.push('/blog');

// 带参数跳转
router.push({ name: 'BlogDetail', params: { id: '123' } });

// 带查询参数
router.push({ path: '/blog', query: { tag: 'vue' } });
```

### 状态管理
使用 Vuex Store（`src/store/index.js`）进行全局状态管理：

```javascript
import { useStore } from 'vuex';
const store = useStore();

// 读取状态
const theme = computed(() => store.state.theme);

// 提交 mutation
store.commit('setTheme', 'dark');
```

### 路由参数传递
```javascript
// 获取路由参数
import { useRoute } from 'vue-router';
const route = useRoute();

const articleId = route.params.id;
const tag = route.query.tag;
```

## 样式规范

### 使用 CSS 变量
在 `src/style/index.css` 中定义的变量：

```css
:root {
  --color-primary: #f472b6;
  --color-secondary: #a855f7;
  --color-text-main: #1e293b;
  --color-bg: #f7f9fc;
}
```

使用方式：
```css
.element {
  color: var(--color-primary);
  background: var(--color-bg);
}
```

### 通用类
- `.glass-panel`: 玻璃态面板效果
- `.gradient-text`: 渐变文字效果
- `.anim-fade-up`: 淡入上移动画
- `.container`: 内容容器（最大宽度和居中）

### 响应式断点
```css
/* 平板 */
@media (max-width: 1024px) { }

/* 手机 */
@media (max-width: 768px) { }

/* 小屏手机 */
@media (max-width: 576px) { }
```

## 性能优化

### 路由懒加载
```javascript
// 推荐：懒加载
component: () => import('../views/page/Page.vue')

// 不推荐：直接导入
import Page from '../views/page/Page.vue'
```

### 图片优化
- 使用适当的图片格式（WebP、AVIF）
- 提供多种尺寸（响应式图片）
- 懒加载图片

### 代码分割
- 按路由分割代码
- 按功能分割大型组件
- 使用动态导入

## 最佳实践

1. **单一职责**: 每个页面专注于一个功能
2. **组件复用**: 提取可复用组件到 `src/components/`
3. **数据分离**: 数据文件独立于组件
4. **文档完善**: 及时更新 README.md
5. **代码规范**: 遵循 ESLint 和项目编码规范
6. **响应式优先**: 移动端优先设计
7. **性能优化**: 避免不必要的重渲染
8. **可访问性**: 遵循 WCAG 标准

## 常见问题

### Q: 页面之间如何共享数据？
A: 使用 Vuex Store 或通过路由参数传递。

### Q: 如何实现页面切换动画？
A: 在 `App.vue` 中使用 `<transition>` 包裹 `<router-view>`。

### Q: 数据文件应该放在哪里？
A: 页面专用数据放在页面文件夹的 `data/` 目录，全局数据放在 `src/data/`。

### Q: 如何处理大量数据？
A: 使用分页、虚拟滚动或懒加载技术。

### Q: 页面样式冲突怎么办？
A: 使用 `scoped` 样式或 CSS Modules。
