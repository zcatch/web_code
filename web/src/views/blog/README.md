# 博客模块

## 模块说明
技术博客功能，展示技术文章、设计思考和生活感悟。

## 功能特性
- 文章列表展示（网格布局）
- 分类和标签筛选
- 全文搜索功能
- 响应式分页/无限滚动
- 文章详情页
- URL 参数联动

## 文件结构
```
blog/
├── Blog.vue           # 博客列表页
├── BlogDetail.vue     # 文章详情页
├── data/
│   └── blogData.js    # 文章数据
└── README.md          # 本文档
```

## 页面说明

### Blog.vue - 列表页
**核心功能:**
- 胶囊式搜索控制面板
- 分类和标签筛选
- 文章卡片展示
- 空状态提示

**交互模式:**
- PC 端：分页器（el-pagination）
- 移动端：无限滚动（Intersection Observer）

**设计特点:**
- 玻璃态效果
- 渐变色卡片
- 悬停动画
- 平滑过渡

### BlogDetail.vue - 详情页
**核心功能:**
- 文章内容展示
- 代码高亮
- 标签联动
- 相关文章推荐

## 数据结构

### 文章对象
```javascript
{
  id: 'article-1',
  title: '文章标题',
  excerpt: '文章摘要',
  content: '文章内容（支持 HTML）',
  date: '2024-01-01',
  category: 'frontend',
  tags: ['Vue', 'JavaScript'],
  gradient: 'linear-gradient(...)'
}
```

### 分类配置
```javascript
{
  value: 'frontend',
  label: '前端开发',
  children: [
    { value: 'vue', label: 'Vue.js' },
    { value: 'react', label: 'React' }
  ]
}
```

## 技术实现

### 高级筛选
- 搜索：标题、摘要、标签全文匹配
- 分类：级联选择器（el-cascader）
- 标签：多选下拉（el-select）
- 重置：一键清空所有筛选条件

### 响应式交互
```javascript
// PC 端分页
const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredArticles.value.slice(start, start + pageSize);
});

// 移动端无限滚动
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !isLoading.value) {
    loadMore();
  }
});
```

### URL 联动
- 支持通过 URL 参数传递筛选条件
- 从详情页点击标签自动跳转并筛选
- 刷新页面保持筛选状态

## 样式规范

### 颜色变量
- `--color-primary`: 主色调（粉色）
- `--color-secondary`: 辅助色（紫色）
- `--color-text-main`: 主文字色
- `--color-bg`: 背景色

### 通用类
- `.glass-panel`: 玻璃态面板
- `.gradient-text`: 渐变文字
- `.anim-fade-up`: 淡入上移动画

## 性能优化
- 懒加载路由组件
- 计算属性缓存筛选结果
- 防抖搜索输入
- 虚拟滚动（大数据量时）

## 未来扩展
- [ ] 文章点赞功能
- [ ] 评论系统
- [ ] 阅读进度条
- [ ] 目录导航
- [ ] 深色模式
- [ ] RSS 订阅
