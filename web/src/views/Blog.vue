<template>
  <div class="blog-page">
    <div class="container blog-content">
      <!-- Header Section -->
      <header class="blog-header anim-fade-up">
        <h1 class="gradient-text main-title">Nexus 视界</h1>
        <p class="subtitle">探索设计、技术与用户体验的前沿领域</p>
      </header>

      <!-- Ambient Background Orbs -->
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="ambient-orb orb-3"></div>

      <!-- Featured Article Section -->
      <section class="featured-section anim-fade-up anim-delay-1" v-if="featuredArticle && !searchQuery && selectedCategory.length === 0 && selectedTags.length === 0">
        <div class="featured-card glass-panel">
          <div class="featured-image" :style="{ background: featuredArticle.gradient }">
            <div class="featured-badge">每日推荐</div>
          </div>
          <div class="featured-content">
            <div class="meta-info">
               <span class="category-tag">{{ getCategoryLabel(featuredArticle.category) }}</span>
               <span class="dot">•</span>
               <span class="date">{{ featuredArticle.date }}</span>
            </div>
            <h2 class="featured-title">{{ featuredArticle.title }}</h2>
            <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
            <div class="featured-tags">
               <span v-for="tag in featuredArticle.tags" :key="tag" class="tag-pill">{{ tag }}</span>
            </div>
            <button class="read-btn primary" @click="openArticle(featuredArticle)">
              阅读全文 <i class="el-icon-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Filters -->
      <div class="glass-panel filters-bar anim-fade-up anim-delay-2">
        <div class="filter-group start">
          <el-input
            placeholder="搜索文章..."
            v-model="searchQuery"
            prefix-icon="el-icon-search"
            clearable
            class="search-input"
          ></el-input>
        </div>
        
        <div class="filter-group end">
          <el-cascader
            :options="categories"
            v-model="selectedCategory"
            placeholder="全部分类"
            clearable
            filterable
            class="category-select"
          ></el-cascader>

          <el-select 
            v-model="selectedTags" 
            multiple 
            collapse-tags 
            placeholder="标签筛选"
            class="tag-select"
          >
            <el-option
              v-for="tag in allTags"
              :key="tag"
              :label="tag"
              :value="tag">
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="blog-grid" v-if="paginatedArticles.length > 0">
        <div 
          v-for="(article, index) in paginatedArticles" 
          :key="article.id"
          class="article-card glass-panel anim-fade-up"
          :class="`anim-delay-${(index % 3) + 1}`"
          @click="openArticle(article)"
        >
          <div class="card-image-wrapper">
            <div class="card-image" :style="{ background: article.gradient }"></div>
            <div class="card-overlay"></div>
            <div class="card-category-badge">{{ getCategoryLabel(article.category) }}</div>
          </div>
          
          <div class="card-content">
            <div class="card-meta">
              <span class="date">{{ article.date }}</span>
            </div>
            
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-excerpt">{{ article.excerpt }}</p>
            
            <div class="card-footer">
              <div class="tags-container">
                 <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="tag-mini">{{ tag }}</span>
                 <span v-if="article.tags.length > 2" class="tag-more">+{{ article.tags.length - 2 }}</span>
              </div>
              <span class="read-link">阅读 <i class="el-icon-arrow-right"></i></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state glass-panel anim-fade-up">
        <i class="el-icon-search"></i>
        <h3>未找到相关文章</h3>
        <p>请尝试调整搜索关键词或筛选条件。</p>
        <button class="reset-btn" @click="resetFilters">清除筛选</button>
      </div>

      <!-- Pagination -->
      <div class="pagination-wrapper anim-fade-up" v-if="paginatedArticles.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredArticles.length"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      searchQuery: '',
      selectedCategory: [],
      selectedTags: [],
      currentPage: 1,
      pageSize: 9, // Increased page size
      categories: [
        {
          value: 'tech',
          label: '技术',
          children: [
            { value: 'frontend', label: '前端开发' },
            { value: 'backend', label: '后端架构' },
            { value: 'ai', label: 'AI & 机器学习' },
            { value: 'devops', label: 'DevOps & 云原生' },
          ]
        },
        {
          value: 'design',
          label: '设计',
          children: [
            { value: 'ui', label: 'UI 设计' },
            { value: 'ux', label: '用户体验' },
            { value: 'systems', label: '设计系统' },
          ]
        },
        {
          value: 'product',
          label: '产品',
          children: [
            { value: 'strategy', label: '产品策略' },
            { value: 'management', label: '团队管理' },
          ]
        }
      ],
      allTags: ['Vue.js', 'React', 'CSS', 'JavaScript', 'TypeScript', 'Figma', 'Node.js', '性能优化', '动画', '无障碍', '职场发展'],
      
      // Rich Mock Data
      featuredArticle: {
        id: 100,
        title: 'Web 的未来：超越屏幕',
        excerpt: '随着我们迈向更加身临其境的网络世界，增强现实和空间计算将如何重新定义我们与数字内容的交互方式？深入探讨 WebXR 和下一代界面。',
        date: '2025-10-24',
        category: ['tech', 'ai'],
        tags: ['AI', '未来科技', 'WebXR'],
        gradient: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)'
      },
      
      articles: [
        {
            id: 1,
            title: '精通 Glassmorphism：现代设计系统',
            excerpt: '玻璃拟态不仅仅是一种趋势，它是一种创造层级和深度的强大方式。学习如何使用 CSS backdrop-filter 和分层光效来有效实现它。',
            date: '2025-10-20',
            category: ['design', 'ui'],
            tags: ['CSS', 'Figma'],
            gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)'
        },
        {
            id: 2,
            title: 'Vue 3：组合式 API 的规模化实践模式',
            excerpt: '在 Vue 中扩展大型应用需要纪律。我们探讨高级组合式 API 模式、组合函数 (Composables) 以及状态管理策略。',
            date: '2025-10-18',
            category: ['tech', 'frontend'],
            tags: ['Vue.js', 'JavaScript'],
            gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
        },
        {
            id: 3,
            title: '使用 Node.js 构建弹性微服务',
            excerpt: '如何设计容错微服务。主题包括断路器、重试策略以及使用 OpenTelemetry 进行分布式追踪。',
            date: '2025-10-15',
            category: ['tech', 'backend'],
            tags: ['Node.js', '架构'],
            gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
        },
        {
            id: 4,
            title: '用户界面中的色彩心理学',
            excerpt: '色彩驱动情绪和行动。理解色彩理论可以显著提高转化率和用户满意度。',
            date: '2025-10-12',
            category: ['design', 'ux'],
            tags: ['设计', '心理学'],
            gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)'
        },
        {
            id: 5,
            title: '优化 Web 性能：LCP, FID 和 CLS',
            excerpt: '核心 Web 指标对 SEO 和 UX 至关重要。调试和修复现代 Web 应用性能瓶颈的实用指南。',
            date: '2025-10-10',
            category: ['tech', 'frontend'],
            tags: ['性能优化', 'CSS'],
            gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
        },
        {
            id: 6,
            title: 'TypeScript：你必须知道的高级类型',
            excerpt: '超越基本接口。学习映射类型、条件类型和模板字面量类型，编写更安全的代码。',
            date: '2025-10-08',
            category: ['tech', 'frontend'],
            tags: ['TypeScript', 'JavaScript'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 7,
            title: '设计系统：跨越鸿沟',
            excerpt: '如何构建和维护服务于设计师和开发者的设计系统。涵盖工具、工作流和文化。',
            date: '2025-10-05',
            category: ['design', 'systems'],
            tags: ['设计', 'Figma'],
            gradient: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'
        },
        {
            id: 8,
            title: 'Serverless 架构：利与弊',
            excerpt: 'Serverless 是否适合你的下一个项目？我们分析成本、冷启动和供应商锁定方面的权衡。',
            date: '2025-10-02',
            category: ['tech', 'devops'],
            tags: ['云原生', '后端'],
            gradient: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'
        },
        {
            id: 9,
            title: '无障碍优先：为每个人编码',
            excerpt: 'Web 无障碍是一项权利，而非功能。关于语义化 HTML、ARIA 标签和键盘导航的实用建议。',
            date: '2025-09-28',
            category: ['tech', 'frontend'],
            tags: ['无障碍', 'HTML'],
            gradient: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
        },
        {
            id: 10,
            title: '2026 年的产品策略',
            excerpt: '在 AI 优先的世界中，驾驭产品管理不断变化的格局。',
            date: '2025-09-25',
            category: ['product', 'strategy'],
            tags: ['管理', 'AI'],
            gradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
        }
      ]
    };
  },
  computed: {
    filteredArticles() {
      return this.articles.filter(article => {
        // Search Filter
        const matchesSearch = article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // Category Filter
        let matchesCategory = true;
        if (this.selectedCategory.length > 0) {
          // Exact match on full path or just the parent? 
          // Let's go with: if child selected, exact match. If parent selected, match any child.
          const [parent, child] = this.selectedCategory;
          const [artParent, artChild] = article.category || [];
          
          if (!child) {
             matchesCategory = artParent === parent;
          } else {
             matchesCategory = artParent === parent && artChild === child;
          }
        }

        // Tag Filter (OR logic)
        let matchesTags = true;
        if (this.selectedTags.length > 0) {
            matchesTags = this.selectedTags.some(tag => article.tags.includes(tag));
        }

        return matchesSearch && matchesCategory && matchesTags;
      });
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredArticles.slice(start, end);
    }
  },
  methods: {
    handlePageChange() {
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll effectively to grid start
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = [];
      this.selectedTags = [];
    },
    getCategoryLabel(categoryPath) {
      if (!categoryPath) return '通用';
      const parent = this.categories.find(c => c.value === categoryPath[0]);
      if (parent && categoryPath[1]) {
        const child = parent.children.find(c => c.value === categoryPath[1]);
        return child ? child.label : parent.label;
      }
      return parent ? parent.label : categoryPath[0];
    },
    openArticle(article) {
       this.$message({
         message: `正在打开 "${article.title}"... (模拟跳转)`,
         type: 'success',
         offset: 60
       });
    }
  }
};
</script>

<style scoped>
.blog-page {
  /* Scrollable Container covering full viewport */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 100px; /* Space for fixed navbar */
  overflow-y: auto;
  overflow-x: hidden;
  overflow-x: hidden;
  background-color: #fafbfc; /* Slightly off-white for contrast */
  z-index: 10;
  box-sizing: border-box;
}

/* Ambient Orbs */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px); /* Heavy blur for soft glow */
  opacity: 0.6;
  z-index: -1; /* Behind content */
  pointer-events: none;
}

.orb-1 {
  top: 50px;
  left: -50px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(219,39,119,0.2) 0%, rgba(255,255,255,0) 70%);
  animation: floatOrb 10s ease-in-out infinite;
}

.orb-2 {
  top: 200px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(255,255,255,0) 70%);
  animation: floatOrb 14s ease-in-out infinite reverse;
}

.orb-3 {
  bottom: 100px;
  left: 20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(255,255,255,0) 70%);
  animation: floatOrb 12s ease-in-out infinite 2s;
}

@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -40px); }
}

.blog-content {
  padding-bottom: 80px;
}

.blog-header {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 3.5rem;
  margin-bottom: 12px;
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Featured Section */
.featured-section {
  margin-bottom: 50px;
}

.featured-card {
  display: flex;
  min-height: 400px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.6);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.featured-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.featured-image {
  flex: 1.2;
  position: relative;
  min-height: 300px;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--color-primary);
  color: white;
  padding: 6px 16px;
  font-weight: 700;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.featured-content {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.meta-info {
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dot {
  margin: 0 8px;
  color: #bdc3c7;
}

.featured-title {
  font-size: 2.25rem;
  line-height: 1.2;
  margin-bottom: 15px;
  color: var(--color-text-main);
}

.featured-excerpt {
  color: var(--color-text-muted);
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* Featured Tags */
.featured-tags {
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-pill {
  background: var(--color-surface);
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.featured-card:hover .tag-pill {
    background: rgba(255,255,255,0.8);
    color: var(--color-primary);
    border-color: rgba(79, 70, 229, 0.3);
}

/* Author Block */
.author-block {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.author-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 12px;
  font-size: 1.2rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 700;
  color: var(--color-text-main);
  font-size: 0.95rem;
}

.read-time {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Buttons */
.read-btn {
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  align-self: flex-start;
  color: white;
  background: var(--btn-primary-bg);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.read-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(219, 39, 119, 0.4);
}

/* Mobile Responsive Featured */
@media (max-width: 900px) {
  .featured-card {
    flex-direction: column;
  }
  .featured-image {
    min-height: 250px;
  }
  .featured-content {
    padding: 30px;
  }
  .main-title {
    font-size: 2.5rem;
  }
}

/* Filters Bar */
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 25px;
  border-radius: 16px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.filter-group.start {
  flex: 1;
  min-width: 250px;
}
.filter-group.end {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Grid Layout */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.article-card {
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,0.4);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: rgba(255,255,255,0.8);
}

.article-card:hover .card-title {
  color: var(--color-primary);
}

.card-image-wrapper {
  height: 220px;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.article-card:hover .card-image {
  transform: scale(1.1);
}

.card-category-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255,255,255,0.95);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.card-title {
  font-size: 1.35rem;
  margin-bottom: 12px;
  line-height: 1.3;
  color: var(--color-text-main);
  font-weight: 700;
  transition: color 0.3s ease;
}

.card-excerpt {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0,0,0,0.04);
}

/* Mini Tags in Card Footer */
.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-mini {
  background: rgba(0,0,0,0.03);
  color: #888;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.tag-more {
  font-size: 0.75rem;
  color: #aaa;
  align-self: center;
}

.author-mini {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.author-avatar-sm {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.read-link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.article-card:hover .read-link {
  opacity: 1;
  transform: translateX(0);
}

/* Empty State */
.reset-btn {
  margin-top: 15px;
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
}

.reset-btn:hover {
  background: var(--color-primary);
  color: white;
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 20px;
}

/* Fix for animation visibility */
.anim-fade-up {
  animation: fadeInDp 0.8s ease forwards;
  opacity: 0; /* Start hidden, animation reveals it */
}
</style>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      searchQuery: '',
      selectedCategory: [],
      selectedTags: [],
      currentPage: 1,
      pageSize: 9, // Increased page size
      categories: [
        {
          value: 'tech',
          label: '技术',
          children: [
            { value: 'frontend', label: '前端开发' },
            { value: 'backend', label: '后端架构' },
            { value: 'ai', label: 'AI & 机器学习' },
            { value: 'devops', label: 'DevOps & 云原生' },
          ]
        },
        {
          value: 'design',
          label: '设计',
          children: [
            { value: 'ui', label: 'UI 设计' },
            { value: 'ux', label: '用户体验' },
            { value: 'systems', label: '设计系统' },
          ]
        },
        {
          value: 'product',
          label: '产品',
          children: [
            { value: 'strategy', label: '产品策略' },
            { value: 'management', label: '团队管理' },
          ]
        }
      ],
      allTags: ['Vue.js', 'React', 'CSS', 'JavaScript', 'TypeScript', 'Figma', 'Node.js', '性能优化', '动画', '无障碍', '职场发展'],
      
      // Rich Mock Data
      featuredArticle: {
        id: 100,
        title: 'Web 的未来：超越屏幕',
        excerpt: '随着我们迈向更加身临其境的网络世界，增强现实和空间计算将如何重新定义我们与数字内容的交互方式？深入探讨 WebXR 和下一代界面。',
        date: '2025-10-24',
        category: ['tech', 'ai'],
        tags: ['AI', '未来科技', 'WebXR'],
        author: '陈雨',
        authorColor: '#FF6B6B',
        readTime: 8,
        gradient: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)'
      },
      
      articles: [
        {
            id: 1,
            title: '精通 Glassmorphism：现代设计系统',
            excerpt: '玻璃拟态不仅仅是一种趋势，它是一种创造层级和深度的强大方式。学习如何使用 CSS backdrop-filter 和分层光效来有效实现它。',
            date: '2025-10-20',
            category: ['design', 'ui'],
            tags: ['CSS', 'Figma'],
            author: '李明',
            authorColor: '#4ECDC4',
            readTime: 6,
            gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)'
        },
        {
            id: 2,
            title: 'Vue 3：组合式 API 的规模化实践模式',
            excerpt: '在 Vue 中扩展大型应用需要纪律。我们探讨高级组合式 API 模式、组合函数 (Composables) 以及状态管理策略。',
            date: '2025-10-18',
            category: ['tech', 'frontend'],
            tags: ['Vue.js', 'JavaScript'],
            author: '王强',
            authorColor: '#45B7D1',
            readTime: 12,
            gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
        },
        {
            id: 3,
            title: '使用 Node.js 构建弹性微服务',
            excerpt: '如何设计容错微服务。主题包括断路器、重试策略以及使用 OpenTelemetry 进行分布式追踪。',
            date: '2025-10-15',
            category: ['tech', 'backend'],
            tags: ['Node.js', '架构'],
            author: '张伟',
            authorColor: '#96CEB4',
            readTime: 15,
            gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
        },
        {
            id: 4,
            title: '用户界面中的色彩心理学',
            excerpt: '色彩驱动情绪和行动。理解色彩理论可以显著提高转化率和用户满意度。',
            date: '2025-10-12',
            category: ['design', 'ux'],
            tags: ['设计', '心理学'],
            author: 'Emma Wilson',
            authorColor: '#FFEEAD',
            readTime: 5,
            gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)'
        },
        {
            id: 5,
            title: '优化 Web 性能：LCP, FID 和 CLS',
            excerpt: '核心 Web 指标对 SEO 和 UX 至关重要。调试和修复现代 Web 应用性能瓶颈的实用指南。',
            date: '2025-10-10',
            category: ['tech', 'frontend'],
            tags: ['性能优化', 'CSS'],
            author: '刘洋',
            authorColor: '#D4A5A5',
            readTime: 9,
            gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
        },
        {
            id: 6,
            title: 'TypeScript：你必须知道的高级类型',
            excerpt: '超越基本接口。学习映射类型、条件类型和模板字面量类型，编写更安全的代码。',
            date: '2025-10-08',
            category: ['tech', 'frontend'],
            tags: ['TypeScript', 'JavaScript'],
            author: 'Robert Taylor',
            authorColor: '#9B59B6',
            readTime: 7,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 7,
            title: '设计系统：跨越鸿沟',
            excerpt: '如何构建和维护服务于设计师和开发者的设计系统。涵盖工具、工作流和文化。',
            date: '2025-10-05',
            category: ['design', 'systems'],
            tags: ['设计', 'Figma'],
            author: 'Lisa Wang',
            authorColor: '#E74C3C',
            readTime: 10,
            gradient: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'
        },
        {
            id: 8,
            title: 'Serverless 架构：利与弊',
            excerpt: 'Serverless 是否适合你的下一个项目？我们分析成本、冷启动和供应商锁定方面的权衡。',
            date: '2025-10-02',
            category: ['tech', 'devops'],
            tags: ['云原生', '后端'],
            author: 'Chris Martin',
            authorColor: '#3498DB',
            readTime: 8,
            gradient: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'
        },
        {
            id: 9,
            title: '无障碍优先：为每个人编码',
            excerpt: 'Web 无障碍是一项权利，而非功能。关于语义化 HTML、ARIA 标签和键盘导航的实用建议。',
            date: '2025-09-28',
            category: ['tech', 'frontend'],
            tags: ['无障碍', 'HTML'],
            author: '陈雨',
            authorColor: '#FF6B6B',
            readTime: 6,
            gradient: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
        },
        {
            id: 10,
            title: '2026 年的产品策略',
            excerpt: '在 AI 优先的世界中，驾驭产品管理不断变化的格局。',
            date: '2025-09-25',
            category: ['product', 'strategy'],
            tags: ['管理', 'AI'],
            author: 'Michael Brown',
            authorColor: '#F39C12',
            readTime: 11,
            gradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
        }
      ]
    };
  },
  computed: {
    filteredArticles() {
      return this.articles.filter(article => {
        // Search Filter
        const matchesSearch = article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // Category Filter
        let matchesCategory = true;
        if (this.selectedCategory.length > 0) {
          // Exact match on full path or just the parent? 
          // Let's go with: if child selected, exact match. If parent selected, match any child.
          const [parent, child] = this.selectedCategory;
          const [artParent, artChild] = article.category || [];
          
          if (!child) {
             matchesCategory = artParent === parent;
          } else {
             matchesCategory = artParent === parent && artChild === child;
          }
        }

        // Tag Filter (OR logic)
        let matchesTags = true;
        if (this.selectedTags.length > 0) {
            matchesTags = this.selectedTags.some(tag => article.tags.includes(tag));
        }

        return matchesSearch && matchesCategory && matchesTags;
      });
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredArticles.slice(start, end);
    }
  },
  methods: {
    handlePageChange() {
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll effectively to grid start
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = [];
      this.selectedTags = [];
    },
    getCategoryLabel(categoryPath) {
      if (!categoryPath) return '通用';
      const parent = this.categories.find(c => c.value === categoryPath[0]);
      if (parent && categoryPath[1]) {
        const child = parent.children.find(c => c.value === categoryPath[1]);
        return child ? child.label : parent.label;
      }
      return parent ? parent.label : categoryPath[0];
    },
    openArticle(article) {
       this.$message({
         message: `正在打开 "${article.title}"... (模拟跳转)`,
         type: 'success',
         offset: 60
       });
    }
  }
};
</script>

<style scoped>
.blog-page {
  padding-top: 100px;
  padding-bottom: 80px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  background-color: transparent; 
  position: relative; 
  z-index: 10;
}

/* Fix for animation visibility */
.anim-fade-up {
  animation: fadeInDp 0.8s ease forwards;
  opacity: 0; /* Start hidden, animation reveals it */
}

.blog-header {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 3.5rem;
  margin-bottom: 12px;
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Featured Section */
.featured-section {
  margin-bottom: 50px;
}

.featured-card {
  display: flex;
  min-height: 400px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.6);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.featured-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.featured-image {
  flex: 1.2;
  position: relative;
  min-height: 300px;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--color-primary);
  color: white;
  padding: 6px 16px;
  font-weight: 700;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.featured-content {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.meta-info {
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dot {
  margin: 0 8px;
  color: #bdc3c7;
}

.featured-title {
  font-size: 2.25rem;
  line-height: 1.2;
  margin-bottom: 15px;
  color: var(--color-text-main);
}

.featured-excerpt {
  color: var(--color-text-muted);
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* Author Block */
.author-block {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.author-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 12px;
  font-size: 1.2rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 700;
  color: var(--color-text-main);
  font-size: 0.95rem;
}

.read-time {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Buttons */
.read-btn {
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  align-self: flex-start;
  color: white;
  background: var(--btn-primary-bg);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.read-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(219, 39, 119, 0.4);
}

/* Mobile Responsive Featured */
@media (max-width: 900px) {
  .featured-card {
    flex-direction: column;
  }
  .featured-image {
    min-height: 250px;
  }
  .featured-content {
    padding: 30px;
  }
  .main-title {
    font-size: 2.5rem;
  }
}

/* Filters Bar */
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 25px;
  border-radius: 16px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.filter-group.start {
  flex: 1;
  min-width: 250px;
}
.filter-group.end {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Grid Layout */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.article-card {
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,0.4);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: rgba(255,255,255,0.8);
}

.article-card:hover .card-title {
  color: var(--color-primary);
}

.card-image-wrapper {
  height: 220px;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.article-card:hover .card-image {
  transform: scale(1.1);
}

.card-category-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255,255,255,0.95);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.card-title {
  font-size: 1.35rem;
  margin-bottom: 12px;
  line-height: 1.3;
  color: var(--color-text-main);
  font-weight: 700;
  transition: color 0.3s ease;
}

.card-excerpt {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0,0,0,0.04);
}

.author-mini {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.author-avatar-sm {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.read-link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.article-card:hover .read-link {
  opacity: 1;
  transform: translateX(0);
}

/* Empty State */
.reset-btn {
  margin-top: 15px;
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
}

.reset-btn:hover {
  background: var(--color-primary);
  color: white;
}
</style>
