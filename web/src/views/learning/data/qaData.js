export const qaCategories = [
  {
    id: 'linux',
    title: 'Linux 系统',
    icon: '🐧',
    description: 'Linux 系统、命令行、WSL 相关问答',
    color: '#FCC419'
  },
  {
    id: 'docker',
    title: 'Docker 容器',
    icon: '🐳',
    description: 'Docker 容器、镜像、编排相关问答',
    color: '#1C7ED6'
  },
  {
    id: 'vue',
    title: 'Vue.js',
    icon: '💚',
    description: 'Vue.js 框架、组件、路由相关问答',
    color: '#42B883'
  },
  {
    id: 'frontend',
    title: '前端技术',
    icon: '🎨',
    description: 'HTML、CSS、JavaScript、构建工具等',
    color: '#E64980'
  },
  {
    id: 'backend',
    title: '后端技术',
    icon: '⚙️',
    description: 'PHP、Redis、数据库等后端技术',
    color: '#7950F2'
  },
  {
    id: 'general',
    title: '通用知识',
    icon: '📚',
    description: '学习方法、开发工具、通用技术问答',
    color: '#868E96'
  }
]

// 动态导入 Markdown 文件
export const loadQAContent = async (categoryId) => {
  try {
    const module = await import(`./qa/${categoryId}.md?raw`)
    return module.default
  } catch (error) {
    console.error(`Failed to load ${categoryId}.md:`, error)
    return `# ${categoryId}\n\n暂无内容`
  }
}
