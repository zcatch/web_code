# 学习笔记模块

## 模块说明
技术学习笔记/知识库，系统化展示技术学习路线图和详细学习内容。

## 功能特性
- 多技术栈支持（Docker, Linux, PHP, Redis, ELK）
- 左侧技术栈导航
- 课程式章节结构
- 可展开/收起内容
- 代码语法展示
- 代码一键复制
- 响应式设计

## 文件结构
```
learning/
├── LearningNotes.vue      # 学习笔记主页（章节列表）
├── LearningSection.vue    # 小节详情页
├── data/                  # 学习内容数据
│   ├── docker/            # Docker 数据（按章节拆分）
│   │   ├── chapter1.js    # 第一章：基础概念
│   │   ├── chapter2.js    # 第二章：安装与配置
│   │   ├── chapter3.js    # 第三章：镜像管理
│   │   ├── chapter4.js    # 第四章：容器操作
│   │   ├── chapter5.js    # 第五章：网络管理
│   │   └── chapters6-10.js # 第6-10章
│   ├── dockerData.js      # Docker 主文件
│   ├── linuxData.js       # Linux 内容
│   ├── phpData.js         # PHP 内容
│   ├── redisData.js       # Redis 内容
│   ├── elkData.js         # ELK 内容
│   └── index.js           # 数据导出
└── README.md              # 本文档
```

## 页面布局

### 主页（LearningNotes.vue）
**布局：**
- 左侧：固定技术栈导航（280px，可滚动）
- 右侧：章节列表（可滚动）

**功能：**
- 显示所有技术栈列表
- 显示学习状态（学习中/已完成/计划中）
- 点击技术栈切换内容
- 显示章节和小节列表
- 点击小节进入详情页

**技术栈列表：**
1. 🐳 Docker - 学习中（10章完整内容）
2. 🐧 Linux - 计划中
3. 🐘 PHP - 计划中
4. 🔴 Redis - 计划中
5. 📊 ELK Stack - 计划中

### 详情页（LearningSection.vue）
**布局：**
- 左侧：章节导航（320px，可滚动）
- 右侧：小节内容（可滚动）

**功能：**
- 显示当前技术栈的所有章节和小节
- 高亮当前小节
- 显示小节详细内容
- 代码示例展示
- 代码一键复制
- 上一节/下一节导航
- 返回主页按钮

## 数据结构

### 技术栈对象
```javascript
{
  id: 'docker',
  name: 'Docker',
  icon: '🐳',
  status: 'learning', // learning | completed | planned
  description: '容器化技术与 Ubuntu Linux 部署实践',
  chapters: [...]
}
```

### 章节对象
```javascript
{
  id: 'docker-basics',
  title: '第一章：基础入门',
  sections: [...]
}
```

### 小节对象
```javascript
{
  title: 'Docker 是什么',
  content: '文字内容...',
  code: '代码示例...',
  language: 'bash' // 可选
}
```

## Docker 学习内容（7个阶段，针对 PHP/TP6 开发）

### 第一阶段：Docker 基础概念（1-2天）
- 1.1 理解核心概念
- 1.2 基础命令练习
- 1.3 实战练习：运行多个 Nginx
- 1.4 常用命令总结

### 第二阶段：数据持久化和端口映射（2-3天）
- 2.1 端口映射详解
- 2.2 数据卷挂载（重要！）
- 2.3 实战：搭建静态网站
- 2.4 只读挂载
- 2.5 数据卷 vs 绑定挂载
- 2.6 实战总结

### 第三阶段：运行 PHP 项目（3-4天）
- 3.1 单独运行 PHP-FPM
- 3.2 Nginx + PHP-FPM 联动
- 3.3 测试 PHP 功能
- 3.4 常见问题排查

### 第四阶段：添加 MySQL 和 Redis（2-3天）
- 4.1 运行 MySQL 容器
- 4.2 运行 Redis 容器
- 4.3 PHP 安装扩展
- 4.4 PHP 连接 MySQL
- 4.5 PHP 连接 Redis
- 4.6 完整的 LNMP 环境

### 第五阶段：使用 Docker Compose（3-4天）
- 5.1 Docker Compose 简介
- 5.2 编写 docker-compose.yml
- 5.3 Compose 常用命令
- 5.4 完整项目示例

### 第六阶段：自定义镜像（Dockerfile）（3-5天）
- 6.1 为什么需要自定义镜像
- 6.2 编写 Dockerfile
- 6.3 构建镜像
- 6.4 在 Compose 中使用自定义镜像
- 6.5 优化 Dockerfile
- 6.6 常用 PHP 扩展安装

### 第七阶段：TP6 实战项目（5-7天）
- 7.1 创建 TP6 项目
- 7.2 配置 Nginx 支持 TP6
- 7.3 完整的 docker-compose.yml
- 7.4 配置 TP6 数据库连接
- 7.5 启动项目
- 7.6 常用开发命令
- 7.7 项目部署到生产环境

**学习时间：** 约 2-3 周完成全部内容  
**学习建议：** 每个阶段都要动手实践，遇到问题先看日志

## 技术实现

### 章节展开/收起
```javascript
const expandedChapters = ref([]);

const toggleChapter = (chapterId) => {
  const index = expandedChapters.value.indexOf(chapterId);
  if (index > -1) {
    expandedChapters.value.splice(index, 1);
  } else {
    expandedChapters.value.push(chapterId);
  }
};
```

### 代码复制功能
```javascript
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    ElMessage.success('代码已复制到剪贴板');
  } catch (err) {
    ElMessage.error('复制失败');
  }
};
```

### 内容格式化
```javascript
const formatContent = (content) => {
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.+)$/, '<p>$1</p>');
};
```

## 样式设计

### 技术栈导航
- 玻璃态面板
- 悬停高亮效果
- 选中状态渐变背景
- 状态标签颜色区分

### 章节卡片
- 白色背景
- 圆角边框
- 悬停阴影效果
- 展开/收起动画

### 代码块
- 深色背景（#1e293b）
- 语法标签显示
- 复制按钮
- 横向滚动

## 响应式设计

### 1024px 以下
- 左侧导航改为顶部
- 技术栈网格布局
- 单列内容展示

### 768px 以下
- 减小字体大小
- 缩小内边距
- 优化代码块显示

## 添加新技术栈

### 1. 创建数据文件
```javascript
// src/views/learning/data/newTechData.js
export default {
  id: 'newtech',
  name: 'New Tech',
  icon: '🚀',
  status: 'planned',
  description: '技术描述',
  chapters: [
    {
      id: 'chapter-1',
      title: '第一章：标题',
      sections: [
        {
          title: '小节标题',
          content: '内容...',
          code: '代码...',
          language: 'javascript'
        }
      ]
    }
  ]
};
```

### 2. 导入到 index.js
```javascript
import newTechData from './newTechData';

export const techStacks = [
  dockerData,
  linuxData,
  phpData,
  redisData,
  elkData,
  newTechData // 添加新技术栈
];
```

## 内容编写规范

### 文字内容
- 简洁明了，避免冗长
- 使用列表和分段提高可读性
- 突出重点概念
- 提供实际应用场景

### 代码示例
- 提供完整可运行的代码
- 添加必要的注释
- 指定正确的语言类型
- 避免过长的代码块

### 章节组织
- 由浅入深，循序渐进
- 每章聚焦一个主题
- 理论结合实践
- 提供实战案例

## 未来扩展
- [ ] 搜索功能
- [ ] 学习进度跟踪
- [ ] 代码语法高亮（highlight.js）
- [ ] 内容收藏/标记
- [ ] 笔记导出（PDF/Markdown）
- [ ] 练习题和测验
- [ ] 视频教程嵌入
- [ ] 评论和讨论区
