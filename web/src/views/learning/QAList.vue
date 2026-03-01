<template>
  <div class="qa-list-page">
    <!-- 顶部搜索栏 -->
    <div class="qa-header">
      <h1>🎯 问答中心</h1>
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索问题、标签..." 
          @input="handleSearch"
        />
        <select v-model="sortBy" @change="handleSort">
          <option value="latest">最新</option>
          <option value="oldest">最早</option>
          <option value="views">浏览最多</option>
        </select>
      </div>
    </div>

    <div class="qa-container">
      <!-- 左侧分类导航 -->
      <aside class="qa-sidebar">
        <div 
          class="category-item"
          :class="{ active: activeCategory === 'all' }"
          @click="selectCategory('all')"
        >
          <span class="icon">📚</span>
          <span class="label">全部</span>
          <span class="count">{{ totalCount }}</span>
        </div>
        <div 
          v-for="(cat, key) in categories" 
          :key="key"
          class="category-item"
          :class="{ active: activeCategory === key }"
          @click="selectCategory(key)"
        >
          <span class="icon">{{ cat.icon }}</span>
          <span class="label">{{ cat.label }}</span>
          <span class="count">{{ cat.count }}</span>
        </div>
      </aside>

      <!-- 右侧问答列表 -->
      <main class="qa-content">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="filteredItems.length === 0" class="empty">
          暂无问答内容
        </div>
        <div v-else class="qa-cards">
          <div 
            v-for="item in paginatedItems" 
            :key="item.id"
            class="qa-card"
            @click="goToDetail(item)"
          >
            <h3 class="card-title">📌 {{ item.title }}</h3>
            <div class="card-meta">
              <span class="category">{{ getCategoryLabel(item.category) }} > {{ item.subCategory }}</span>
              <span class="difficulty">{{ getDifficultyLabel(item.difficulty) }}</span>
              <span class="date">{{ item.date }}</span>
            </div>
            <p class="card-preview">{{ item.preview }}</p>
            <div class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import qaIndex from './data/qa/index.json'

export default {
  name: 'QAList',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const searchQuery = ref('')
    const activeCategory = ref('all')
    const sortBy = ref('latest')
    const currentPage = ref(1)
    const pageSize = 20

    const categories = ref(qaIndex.categories)
    const allItems = ref(qaIndex.items)
    const totalCount = computed(() => qaIndex.total)

    // 筛选后的列表
    const filteredItems = computed(() => {
      let items = allItems.value

      // 分类筛选
      if (activeCategory.value !== 'all') {
        items = items.filter(item => item.category === activeCategory.value)
      }

      // 搜索筛选
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        items = items.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.preview.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      // 排序
      if (sortBy.value === 'latest') {
        items = [...items].sort((a, b) => b.timestamp - a.timestamp)
      } else if (sortBy.value === 'oldest') {
        items = [...items].sort((a, b) => a.timestamp - b.timestamp)
      } else if (sortBy.value === 'views') {
        items = [...items].sort((a, b) => b.views - a.views)
      }

      return items
    })

    // 分页
    const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize))
    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      const end = start + pageSize
      return filteredItems.value.slice(start, end)
    })

    const selectCategory = (category) => {
      activeCategory.value = category
      currentPage.value = 1
    }

    const handleSearch = () => {
      currentPage.value = 1
    }

    const handleSort = () => {
      currentPage.value = 1
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        window.scrollTo(0, 0)
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        window.scrollTo(0, 0)
      }
    }

    const goToDetail = (item) => {
      router.push({
        name: 'QADetail',
        params: { category: item.category, id: item.id }
      })
    }

    const getCategoryLabel = (key) => {
      return categories.value[key]?.label || key
    }

    const getDifficultyLabel = (level) => {
      const labels = {
        1: '⭐ 基础',
        2: '⭐⭐ 进阶',
        3: '⭐⭐⭐ 高级'
      }
      return labels[level] || ''
    }

    onMounted(() => {
      loading.value = false
    })

    return {
      loading,
      searchQuery,
      activeCategory,
      sortBy,
      currentPage,
      categories,
      totalCount,
      filteredItems,
      paginatedItems,
      totalPages,
      selectCategory,
      handleSearch,
      handleSort,
      prevPage,
      nextPage,
      goToDetail,
      getCategoryLabel,
      getDifficultyLabel
    }
  }
}
</script>

<style scoped>
.qa-list-page {
  min-height: 100vh;
  background: #f7f9fc;
  color: #1e293b;
  padding: 2rem;
  padding-top: 90px;
  position: relative;
}

/* Ambient Background */
.qa-list-page::before,
.qa-list-page::after {
  content: '';
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}

.qa-list-page::before {
  width: 400px;
  height: 400px;
  background: var(--color-primary-3);
  top: -100px;
  right: -50px;
}

.qa-list-page::after {
  width: 500px;
  height: 500px;
  background: var(--color-secondary-2);
  bottom: 50px;
  left: -150px;
}

.qa-header {
  max-width: 1400px;
  margin: 0 auto 2rem;
}

.qa-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-bar {
  display: flex;
  gap: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.9rem 1.3rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-1);
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.search-bar select {
  padding: 0.9rem 1.3rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  font-weight: 600;
}

.search-bar select:hover {
  border-color: var(--color-primary);
}

.search-bar select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-1);
}

.qa-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.qa-sidebar {
  position: sticky;
  top: 90px;
  height: fit-content;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  background: var(--color-primary-1);
  border-color: var(--color-primary-2);
}

.category-item.active {
  background: linear-gradient(135deg, var(--color-primary-1), var(--color-secondary-1));
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px var(--color-primary-2);
}

.category-item .icon {
  font-size: 1.5rem;
}

.category-item .label {
  flex: 1;
  font-weight: 600;
  color: #1e293b;
}

.category-item .count {
  background: #f1f5f9;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}

.category-item.active .count {
  background: white;
  color: var(--color-primary);
}

.qa-content {
  min-height: 400px;
}

.loading, .empty {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.qa-cards {
  display: grid;
  gap: 1.5rem;
}

.qa-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qa-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-title {
  margin: 0 0 1.2rem 0;
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  align-items: center;
}

.card-meta .category {
  color: var(--color-primary);
  font-weight: 600;
}

.card-meta .difficulty {
  color: var(--color-accent);
  font-weight: 600;
}

.card-meta .date {
  color: #94a3b8;
  font-weight: 500;
}

.card-preview {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.tag {
  background: var(--color-primary-1);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-2);
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: 'Consolas', monospace;
  transition: all 0.2s ease;
  font-weight: 600;
}

.tag:hover {
  background: var(--color-primary-2);
  border-color: var(--color-primary);
}



.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination button {
  padding: 0.7rem 1.4rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.pagination button:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--color-primary-1);
  color: var(--color-primary);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  color: #64748b;
  font-weight: 600;
}
</style>
