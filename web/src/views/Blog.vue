<template>
  <div class="blog-page">
    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <div class="container blog-content">
      <!-- Header Section -->
      <header class="blog-header anim-fade-up">
        <h1 class="gradient-text">技术洞察</h1>
        <p class="subtitle">记录代码、设计与生活的点滴思考 ({{ total }} 篇)</p>
      </header>

      <!-- Advanced Filters Bar (Capsule Dashboard) -->
      <div class="filters-container anim-fade-up">
        <div class="search-dashboard">
          <div class="search-main">
            <el-input
              v-model="searchQuery"
              placeholder="搜索灵感、代码或心得..."
              size="large"
              clearable
              class="premium-input-search"
            >
              <template #prefix>
                <el-icon class="search-icon-active"><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div class="search-divider" v-if="!isMobile"></div>

          <div class="search-tools">
            <el-cascader
              v-model="selectedCategory"
              :options="categories"
              placeholder="全部分类"
              class="premium-cascader"
              size="large"
              :props="{ checkStrictly: true, emitPath: false }"
              clearable
            />
            
            <el-select
              v-model="selectedTags"
              multiple
              collapse-tags
              placeholder="选择标签"
              class="premium-select"
              size="large"
            >
              <el-option
                v-for="tag in allTags"
                :key="tag"
                :label="tag"
                :value="tag"
              />
            </el-select>

            <el-tooltip content="重置筛选" placement="top">
              <el-button 
                circle 
                size="large"
                class="premium-reset-btn"
                @click="resetFilters"
              >
                <el-icon><RefreshRight /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="displayedArticles.length > 0" class="blog-grid anim-fade-up">
        <div 
          v-for="article in displayedArticles" 
          :key="article.id" 
          class="article-card"
          @click="openArticle(article)"
        >
          <div class="card-image-wrapper">
            <div class="card-image" :style="{ background: article.gradient }"></div>
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
                 <el-tag 
                   v-for="tag in (article.tags || []).slice(0, 2)" 
                   :key="tag"
                   size="small"
                   effect="light"
                   round
                   class="premium-card-tag"
                 >
                   #{{ tag }}
                 </el-tag>
              </div>
              <span class="read-link">详情 <el-icon><ArrowRight /></el-icon></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state-wrapper anim-fade-up">
        <div class="empty-content-card">
          <div class="empty-icon-box">
             <div class="icon-ring"></div>
             <el-icon class="main-search-icon"><Search /></el-icon>
          </div>
          <h3 class="empty-title">未发现相关灵感</h3>
          <p class="empty-desc">尝试调整筛选条件或是换个搜索词试试吧</p>
          <div class="empty-actions">
            <el-button type="primary" round size="large" class="empty-reset-btn" @click="resetFilters">
              清空搜索条件
            </el-button>
          </div>
        </div>
      </div>

      <!-- Footer / Loading Area -->
      <footer class="footer-area anim-fade-up" v-if="total > 0">
        <!-- PC Pagination -->
        <div v-if="!isMobile && total > pageSize" class="pc-pagination">
           <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            background
            @current-change="handlePageChange"
          />
        </div>

        <!-- Mobile Scroll Trigger & Loader -->
        <div v-if="isMobile" class="mobile-infinite-footer">
          <!-- The "Sentinel" element for infinite scroll -->
          <div ref="scrollTrigger" class="scroll-trigger"></div>
          
          <div v-if="isLoading" class="loader-box">
            <div class="spinner"></div>
            <span>正在加载更多文章...</span>
          </div>
          <div v-else-if="noMore" class="finished-box">
            <el-icon><CircleCheck /></el-icon>
            <span>已经为您呈现全部 {{ total }} 篇文章</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Search, ArrowRight, RefreshRight, CircleCheck } from '@element-plus/icons-vue';
import { articles as rawArticles, categories } from '../data/blogData';

const router = useRouter();
const route = useRoute();

// State - Using shallow copy to prevent reference issues
const articles = ref([...rawArticles]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const selectedTags = ref([]);
const currentPage = ref(1);
const pageSize = 9;
const isLoading = ref(false);
const isMobile = ref(false);
const mobileLimit = ref(9);

// Intersection Observer for Infinite Scroll
const scrollTrigger = ref(null);
let observer = null;

// Filter and Sort Logic
const allTags = computed(() => {
  const tags = new Set();
  articles.value.forEach(a => a.tags?.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
});

const filteredArticles = computed(() => {
  return articles.value.filter(a => {
    const searchStr = (a.title + a.excerpt + (a.tags?.join('') || '')).toLowerCase();
    const matchSearch = !searchQuery.value || searchStr.includes(searchQuery.value.toLowerCase());
    const matchCat = !selectedCategory.value || a.category === selectedCategory.value;
    const matchTags = selectedTags.value.length === 0 || 
      selectedTags.value.some(t => a.tags?.includes(t));
    return matchSearch && matchCat && matchTags;
  });
});

const total = computed(() => filteredArticles.value.length);
const noMore = computed(() => mobileLimit.value >= total.value);

const displayedArticles = computed(() => {
  if (isMobile.value) {
    return filteredArticles.value.slice(0, mobileLimit.value);
  } else {
    const start = (currentPage.value - 1) * pageSize;
    return filteredArticles.value.slice(start, start + pageSize);
  }
});

// Device Detection
const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };

// Infinite Scroll logic via Intersection Observer
const setupObserver = () => {
  if (observer) observer.disconnect();
  
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading.value && !noMore.value && isMobile.value) {
      loadMore();
    }
  }, { threshold: 0.1 });

  if (scrollTrigger.value) {
    observer.observe(scrollTrigger.value);
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  setupObserver();

  // URL 联动同步：检查查询参数
  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }
  if (route.query.tag) {
    selectedTags.value = [route.query.tag];
  }
  
  // 强制恢复全局滚动
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  if (observer) observer.disconnect();
});

// Reactively watch for trigger availability
watch(scrollTrigger, (newVal) => {
  if (newVal) setupObserver();
});

// Watch conditions to reset lists
watch([searchQuery, selectedCategory, selectedTags], () => {
    currentPage.value = 1;
    mobileLimit.value = pageSize;
});

// Methods
const getCategoryLabel = (cat) => categories.find(c => c.value === cat)?.label || cat;

const handlePageChange = (val) => {
  currentPage.value = val;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const loadMore = () => {
  isLoading.value = true;
  setTimeout(() => {
    mobileLimit.value += pageSize;
    isLoading.value = false;
  }, 800);
};

const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = null;
    selectedTags.value = [];
    currentPage.value = 1;
    mobileLimit.value = pageSize;
};

const openArticle = (article) => {
   router.push(`/blog/${article.id}`);
};
</script>

<style scoped>
.blog-page {
  width: 100%; min-height: 100vh; padding-top: 100px; padding-bottom: 50px;
  background-color: #f7f9fc; position: relative; z-index: 1; overflow-y: auto; overflow-x: hidden;
}

/* Redesigned Search Dashboard (Unified Capsule) */
.filters-container { display: flex; justify-content: center; margin-bottom: 50px; padding: 0 20px; }
.search-dashboard {
  background: white; padding: 10px 20px; border-radius: 60px;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08);
  display: flex; align-items: center; width: 100%; max-width: 960px;
  transition: all 0.3s ease; border: 1px solid rgba(226, 232, 240, 0.8);
}
.search-dashboard:focus-within {
  transform: translateY(-2px); box-shadow: 0 25px 50px -12px rgba(244, 114, 182, 0.15); border-color: var(--color-primary-2);
}
.search-main { flex: 1.2; margin-right: 10px; }
:deep(.premium-input-search .el-input__wrapper) {
  background: transparent !important; box-shadow: none !important; border: none !important;
  font-size: 1.05rem; padding-left: 15px !important;
}
.search-icon-active { color: var(--color-primary); font-size: 1.2rem; }
.search-divider { width: 1px; height: 30px; background: #e2e8f0; margin: 0 15px; opacity: 0.6; }
.search-tools { display: flex; align-items: center; gap: 12px; flex: 1; justify-content: flex-end; }
:deep(.premium-cascader .el-input__wrapper), :deep(.premium-select .el-input__wrapper) {
  background: #f8fafc !important; border-radius: 40px !important; box-shadow: none !important; border: 1px solid transparent !important;
  height: 48px; width: 170px; transition: all 0.3s;
}

/* Reset Button */
.premium-reset-btn {
  background: #f8fafc !important; border: 1px solid #e2e8f0 !important; color: #94a3b8 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; width: 46px !important; height: 46px !important;
  padding: 0 !important; display: flex !important; align-items: center !important; justify-content: center !important;
  flex-shrink: 0 !important; border-radius: 50% !important;
}
.premium-reset-btn:hover {
  background: var(--color-primary-1) !important; color: var(--color-primary) !important;
  border-color: var(--color-primary-2) !important; transform: rotate(180deg);
  box-shadow: 0 4px 12px rgba(244, 114, 182, 0.15);
}
.premium-reset-btn :deep(.el-icon) { font-size: 1.2rem; margin: 0; }

/* Background & Grid Articles */
.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); opacity: 0.3; z-index: -1; pointer-events: none; }
.orb-1 { width: 400px; height: 400px; background: var(--color-primary-3); top: -100px; right: -50px; }
.orb-2 { width: 500px; height: 500px; background: var(--color-secondary-2); bottom: 50px; left: -150px; }

.blog-header { text-align: center; margin-bottom: 40px; }
.gradient-text {
  font-size: 3.2rem; font-weight: 800; letter-spacing: -1px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { color: #64748b; font-size: 1.1rem; }

.blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 30px; }
.article-card {
  background: white; border-radius: 20px; overflow: hidden; border: 1px solid #f1f1f1;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer;
}
.article-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1); }
.card-image-wrapper { height: 200px; position: relative; overflow: hidden; }
.card-image { width: 100%; height: 100%; transition: transform 0.8s ease; }
.article-card:hover .card-image { transform: scale(1.1); }
.card-category-badge {
  position: absolute; top: 15px; left: 15px; background: rgba(255,255,255,0.9);
  padding: 5px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; color: var(--color-primary);
}

.card-content { padding: 25px; }
.card-meta { font-size: 0.8rem; color: #94a3b8; margin-bottom: 10px; font-weight: 600; }
.card-title { font-size: 1.35rem; font-weight: 800; color: #1e293b; margin-bottom: 12px; line-height: 1.4; transition: color 0.3s; }
.article-card:hover .card-title { color: var(--color-primary); }
.card-excerpt { font-size: 0.9rem; color: #64748b; line-height: 1.6; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px dashed #f1f5f9; }
.tags-container { display: flex; gap: 6px; }
:deep(.premium-card-tag) {
  background-color: #fdf2f8 !important; border: none !important; color: var(--color-primary-4) !important;
  font-weight: 700; font-size: 0.7rem; padding: 0 10px;
}
.read-link { color: var(--color-primary); font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 4px; }

/* Empty State Styling */
.empty-state-wrapper { padding: 100px 20px; display: flex; justify-content: center; align-items: center; min-height: 400px; }
.empty-content-card { text-align: center; max-width: 400px; display: flex; flex-direction: column; align-items: center; }
.empty-icon-box { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px; }
.icon-ring { position: absolute; width:100%; height:100%; border:4px solid var(--color-primary-1); border-left-color:var(--color-primary); border-radius:50%; opacity:0.3; animation:ringSpin 4s linear infinite; }
.main-search-icon { font-size: 50px; color: var(--color-primary-3); animation: iconBounce 3s ease-in-out infinite; }
.empty-title { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 12px; background: linear-gradient(135deg, #1e293b 0%, #64748b 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.empty-desc { color: #94a3b8; font-size: 1rem; margin-bottom: 35px; }
.empty-reset-btn { padding: 0 40px !important; height: 50px !important; font-weight: 700 !important; background: var(--color-primary) !important; border:none !important; box-shadow: 0 10px 20px -5px rgba(244,114,182,0.4) !important; }

/* Footer & Loader */
.footer-area { padding-top: 60px; padding-bottom: 50px; text-align: center; }
.pc-pagination { display: flex; justify-content: center; }
.mobile-infinite-footer { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.scroll-trigger { height: 10px; width: 100%; margin-bottom: 20px; }
.loader-box { color: var(--color-primary); display: flex; align-items: center; gap: 10px; font-weight: 700; }
.spinner { width: 1.2rem; height: 1.2rem; border: 3px solid var(--color-primary-1); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
.finished-box { color: #cbd5e1; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; }

@keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes iconBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes spin { to { transform: rotate(360deg); } }

/* Mobile Responiveness */
@media (max-width: 768px) {
  .search-dashboard { border-radius: 20px; flex-direction: column; padding: 20px; align-items: stretch; gap: 15px; }
  .search-main { margin-right: 0; }
  :deep(.premium-input-search .el-input__wrapper) { padding-left: 0 !important; }
  .search-tools { display: grid; grid-template-columns: 1fr 1fr 50px; gap: 10px; }
  :deep(.premium-cascader .el-input__wrapper), :deep(.premium-select .el-input__wrapper) { width: 100% !important; }
  .blog-grid { grid-template-columns: 1fr; }
}

.anim-fade-up { animation: fadeUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
