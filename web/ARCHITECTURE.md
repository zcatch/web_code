# 项目架构文档

## 概述
AIZO 是一个专注于技术与艺术融合的创意展示网站，采用 Vue 3 + Vite 构建，遵循模块化和文档化的开发规范。

## 技术栈

### 核心框架
- **Vue 3.4** - 渐进式 JavaScript 框架（Composition API）
- **Vite 5.4** - 下一代前端构建工具
- **Vue Router 4** - 官方路由管理器
- **Vuex** - 状态管理

### UI 组件库
- **Element Plus** - 基于 Vue 3 的组件库

### 视觉效果
- **Three.js** - WebGL 3D 图形库
- **GSAP** - 专业级动画库
- **ScrollTrigger** - 滚动触发动画

### 开发工具
- **ESLint** - 代码质量检查
- **Yarn** - 包管理器

## 项目结构

```
web/
├── .kiro/                          # Kiro AI 配置
│   └── specs/                      # 功能规格文档
│       └── learning-notes/
│           └── requirements.md
│
├── src/
│   ├── views/                      # 页面组件（核心）
│   │   ├── home/                   # 首页模块
│   │   │   ├── Home.vue
│   │   │   └── README.md
│   │   ├── blog/                   # 博客模块
│   │   │   ├── Blog.vue
│   │   │   ├── BlogDetail.vue
│   │   │   ├── data/
│   │   │   │   └── blogData.js
│   │   │   └── README.md
│   │   ├── about/                  # 关于模块
│   │   │   ├── About.vue
│   │   │   └── README.md
│   │   ├── learning/               # 学习笔记模块
│   │   │   ├── LearningNotes.vue
│   │   │   ├── data/
│   │   │   │   ├── dockerData.js
│   │   │   │   ├── linuxData.js
│   │   │   │   ├── phpData.js
│   │   │   │   ├── redisData.js
│   │   │   │   ├── elkData.js
│   │   │   │   └── index.js
│   │   │   └── README.md
│   │   └── README.md               # Views 目录说明
│   │
│   ├── components/                 # 全局通用组件
│   │   ├── BackToTop.vue          # 返回顶部
│   │   ├── CountUp.vue            # 数字动画
│   │   ├── CustomCursor.vue       # 自定义光标
│   │   └── Icon.vue               # 图标组件
│   │
│   ├── router/                     # 路由配置
│   │   └── index.js
│   │
│   ├── store/                      # Vuex 状态管理
│   │   └── index.js
│   │
│   ├── style/                      # 全局样式
│   │   └── index.css
│   │
│   ├── assets/                     # 静态资源
│   │   └── icons/
│   │
│   ├── App.vue                     # 根组件
│   └── main.js                     # 入口文件
│
├── public/                         # 公共静态资源
│
├── index.html                      # HTML 模板
├── vite.config.js                  # Vite 配置
├── package.json                    # 项目依赖
├── README.md                       # 项目说明
├── ARCHITECTURE.md                 # 本文档
└── DEVELOPMENT_RULES.md            # 开发规范
```

## 核心设计原则

### 1. 页面模块化
每个页面都有独立的文件夹，包含：
- 页面组件（.vue）
- 数据文件（data/*.js）
- 模块文档（README.md）

**优势:**
- 清晰的文件组织
- 便于团队协作
- 易于维护和扩展
- 文档与代码同步

### 2. 文档驱动开发
每个模块都有详细的 README.md 文档，包括：
- 功能说明
- 文件结构
- 数据格式
- 技术实现
- 使用指南
- 未来规划

### 3. 组件复用
- 全局通用组件放在 `src/components/`
- 页面专用组件放在页面文件夹内
- 使用 Composition API 提取可复用逻辑

### 4. 样式规范
- 使用 CSS 变量统一主题
- 玻璃态效果（glassmorphism）
- 渐变色和动画效果
- 响应式设计优先

## 路由架构

### 路由配置
```javascript
// src/router/index.js
const routes = [
  { path: '/', component: () => import('../views/home/Home.vue') },
  { path: '/blog', component: () => import('../views/blog/Blog.vue') },
  { path: '/blog/:id', component: () => import('../views/blog/BlogDetail.vue') },
  { path: '/about', component: () => import('../views/about/About.vue') },
  { path: '/learning', component: () => import('../views/learning/LearningNotes.vue') }
];
```

### 路由特性
- 懒加载（代码分割）
- 动态路由参数
- 查询参数支持
- 平滑过渡动画

## 状态管理

### Vuex Store
```javascript
// src/store/index.js
export default createStore({
  state: {
    theme: 'light',
    user: null
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    }
  }
});
```

### 使用场景
- 全局主题设置
- 用户信息管理
- 跨组件数据共享

## 样式系统

### CSS 变量
```css
:root {
  /* 主色调 */
  --color-primary: #f472b6;
  --color-primary-1: #fce7f3;
  --color-primary-2: #fbcfe8;
  --color-primary-3: #f9a8d4;
  --color-primary-4: #f472b6;
  
  /* 辅助色 */
  --color-secondary: #a855f7;
  --color-secondary-1: #f3e8ff;
  --color-secondary-2: #e9d5ff;
  
  /* 文字颜色 */
  --color-text-main: #1e293b;
  --color-text-secondary: #64748b;
  
  /* 背景色 */
  --color-bg: #f7f9fc;
  
  /* 渐变 */
  --gradient-main: linear-gradient(135deg, #f472b6, #a855f7);
}
```

### 通用类
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.gradient-text {
  background: var(--gradient-main);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.anim-fade-up {
  animation: fadeUp 0.6s ease forwards;
}
```

## 数据流

### 数据组织
```
页面数据 → data/*.js → 页面组件 → 渲染
```

### 示例：博客数据流
```javascript
// 1. 定义数据
// src/views/blog/data/blogData.js
export const articles = [
  { id: '1', title: '文章标题', ... }
];

// 2. 导入使用
// src/views/blog/Blog.vue
import { articles } from './data/blogData';

// 3. 响应式处理
const articleList = ref([...articles]);

// 4. 计算属性
const filteredArticles = computed(() => {
  return articleList.value.filter(/* 筛选逻辑 */);
});
```

## 性能优化

### 1. 代码分割
- 路由懒加载
- 动态导入组件
- 按需加载第三方库

### 2. 资源优化
- 图片懒加载
- WebP 格式
- 压缩和缓存

### 3. 渲染优化
- 虚拟滚动（大列表）
- 防抖和节流
- 计算属性缓存

### 4. 构建优化
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'three': ['three'],
          'gsap': ['gsap']
        }
      }
    }
  }
};
```

## 响应式设计

### 断点系统
```css
/* 超大屏 */
@media (min-width: 1400px) { }

/* 大屏 */
@media (max-width: 1200px) { }

/* 平板 */
@media (max-width: 1024px) { }

/* 手机 */
@media (max-width: 768px) { }

/* 小屏手机 */
@media (max-width: 576px) { }
```

### 响应式策略
- 移动端优先
- 弹性布局（Flexbox/Grid）
- 相对单位（rem/em/%）
- 媒体查询

## 开发工作流

### 1. 添加新页面
```bash
# 创建页面文件夹
mkdir src/views/new-page

# 创建文件
touch src/views/new-page/NewPage.vue
touch src/views/new-page/README.md

# 配置路由
# 编辑 src/router/index.js

# 更新导航
# 编辑 src/App.vue
```

### 2. 开发流程
```bash
# 启动开发服务器
yarn dev

# 代码检查
yarn lint

# 构建生产版本
yarn build
```

### 3. 部署流程
```bash
# 构建到 PHPStudy WWW 目录
yarn build

# 访问
http://localhost/
```

## 构建配置

### Vite 配置
```javascript
// vite.config.js
export default defineConfig({
  base: './',
  build: {
    outDir: '../../web_deploy/web',
    emptyOutDir: false
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
```

### 输出目录
- 开发环境: `http://localhost:3000`
- 生产环境: `D:/phpstudy_pro/WWW/web_deploy/web/`

## 浏览器支持

### 目标浏览器
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills
- 使用 Vite 自动注入必要的 polyfills
- 支持现代 ES6+ 特性

## 未来规划

### 短期目标
- [ ] 完善 Linux、PHP、Redis、ELK 学习内容
- [ ] 添加代码语法高亮
- [ ] 实现搜索功能
- [ ] 优化移动端体验

### 中期目标
- [ ] 添加深色模式
- [ ] 实现用户评论系统
- [ ] 添加文章点赞功能
- [ ] 集成 CMS 后台

### 长期目标
- [ ] 多语言支持
- [ ] PWA 支持
- [ ] 性能监控
- [ ] SEO 优化

## 维护指南

### 日常维护
1. 定期更新依赖包
2. 检查安全漏洞
3. 优化性能指标
4. 更新文档

### 问题排查
1. 查看浏览器控制台
2. 检查路由配置
3. 验证数据格式
4. 测试响应式布局

### 备份策略
1. 代码版本控制（Git）
2. 定期备份数据文件
3. 保存构建产物

## 参考资源

### 官方文档
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/)
- [Three.js 文档](https://threejs.org/)
- [GSAP 文档](https://greensock.com/gsap/)

### 设计规范
- UI-UX-Pro-Max 设计标准
- 玻璃态设计（Glassmorphism）
- 响应式设计原则

---

**最后更新:** 2024-02-28  
**维护者:** AIZO  
**版本:** 1.0.0
