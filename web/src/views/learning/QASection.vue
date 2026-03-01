<template>
  <div class="qa-section">
    <!-- 分类导航 -->
    <div class="qa-categories">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-card"
        :class="{ active: activeCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        <div class="category-icon">{{ category.icon }}</div>
        <div class="category-info">
          <h3>{{ category.title }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>

    <!-- 问答内容 -->
    <div class="qa-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="markdown-body" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { qaCategories, loadQAContent } from './data/qaData'
import 'highlight.js/styles/github-dark.css'

export default {
  name: 'QASection',
  setup() {
    const categories = ref(qaCategories)
    const activeCategory = ref('linux')
    const renderedContent = ref('')
    const loading = ref(false)

    // 配置 marked
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value
        }
        return hljs.highlightAuto(code).value
      },
      breaks: true,
      gfm: true
    })

    const loadContent = async (categoryId) => {
      loading.value = true
      try {
        const content = await loadQAContent(categoryId)
        renderedContent.value = marked(content)
      } catch (error) {
        console.error('Failed to render content:', error)
        renderedContent.value = '<p>加载失败</p>'
      } finally {
        loading.value = false
      }
    }

    const selectCategory = (categoryId) => {
      activeCategory.value = categoryId
    }

    watch(activeCategory, (newCategory) => {
      loadContent(newCategory)
    })

    onMounted(() => {
      loadContent(activeCategory.value)
    })

    return {
      categories,
      activeCategory,
      renderedContent,
      loading,
      selectCategory
    }
  }
}
</script>

<style scoped>
.qa-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.qa-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  border-color: #42B883;
  transform: translateY(-2px);
}

.category-card.active {
  border-color: #42B883;
  background: #1e2a24;
}

.category-icon {
  font-size: 2.5rem;
}

.category-info h3 {
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-size: 1.2rem;
}

.category-info p {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}

.qa-content {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 2rem;
  min-height: 400px;
}

.loading {
  text-align: center;
  color: #888;
  padding: 2rem;
}

/* Markdown 样式 */
.markdown-body {
  color: #e0e0e0;
  line-height: 1.8;
}

.markdown-body h1 {
  color: #42B883;
  border-bottom: 2px solid #42B883;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

.markdown-body h2 {
  color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  border-left: 4px solid #42B883;
}

.markdown-body h3 {
  color: #42B883;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
}

.markdown-body p {
  margin-bottom: 1rem;
}

.markdown-body code {
  background: #2a2a2a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #42B883;
  font-family: 'Consolas', 'Monaco', monospace;
}

.markdown-body pre {
  background: #0d1117;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-body pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid #2a2a2a;
  padding: 0.8rem;
  text-align: left;
}

.markdown-body th {
  background: #2a2a2a;
  color: #42B883;
  font-weight: bold;
}

.markdown-body tr:hover {
  background: #1e1e1e;
}

.markdown-body ul,
.markdown-body ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-body li {
  margin-bottom: 0.5rem;
}

.markdown-body hr {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 2rem 0;
}

.markdown-body blockquote {
  border-left: 4px solid #42B883;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #888;
  font-style: italic;
}
</style>
