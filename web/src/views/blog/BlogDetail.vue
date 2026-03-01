<template>
  <div class="blog-detail-wrapper">
    <div class="blog-detail-page" v-if="article">
      <!-- Top Decorative Element -->
      <div class="top-decoration" :style="{ background: article.gradient ? `radial-gradient(circle at 50% -100px, ${article.gradient.split(',')[1].trim()} 0%, transparent 70%)` : '' }"></div>
      
      <!-- Hero Header -->
      <header class="article-hero">
        <div class="blog-container hero-content anim-fade-up">
          <div class="meta-top">
            <router-link to="/blog" class="back-link">
              <el-icon><ArrowLeft /></el-icon> <span>返回列表</span>
            </router-link>
          </div>
          
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-subtitle">
            <el-tag 
              size="small" 
              round 
              class="hero-category-tag clickable"
              @click="handleCategoryClick(article.category)"
            >
              {{ article.categoryLabel }}
            </el-tag>
            <span class="v-dot"></span>
            <span class="publish-date">{{ article.date }}</span>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="blog-container content-wrapper">
        <article class="article-body anim-fade-up shadow-text" v-html="article.content"></article>
        
        <!-- Tags Only Footer -->
        <div class="article-footer anim-fade-up">
          <div class="tags-list">
            <el-tag 
              v-for="tag in article.tags" 
              :key="tag" 
              class="footer-tag clickable"
              size="large"
              round
              @click="handleTagClick(tag)"
            >
              # {{ tag }}
            </el-tag>
          </div>
        </div>

        <!-- Compact Refined Navigation -->
        <nav class="article-nav anim-fade-up">
          <div class="minimal-nav">
            <div class="nav-link prev" v-if="prevArticle" @click="goToArticle(prevArticle.id)">
              <span class="nav-arrow"><el-icon><ArrowLeft /></el-icon> 上一篇</span>
              <span class="nav-text">{{ prevArticle.title }}</span>
            </div>
            
            <div class="nav-v-divider" v-if="prevArticle && nextArticle"></div>
            
            <div class="nav-link next" v-if="nextArticle" @click="goToArticle(nextArticle.id)">
              <span class="nav-arrow">下一篇 <el-icon><ArrowRight /></el-icon></span>
              <span class="nav-text">{{ nextArticle.title }}</span>
            </div>
          </div>
        </nav>
      </main>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-full">
      <div class="sakura-loader"></div>
      <p>正在为您呈现精彩内容...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { articles as blogArticles, categories } from './data/blogData';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const prevArticle = ref(null);
const nextArticle = ref(null);

const getCategoryLabel = (catValue) => {
  const cat = categories.find(c => c.value === catValue);
  return cat ? cat.label : catValue;
};

const loadArticle = () => {
  const routeId = route.params.id;
  if (!routeId) return;

  const id = parseInt(routeId);
  const found = blogArticles.find(a => Number(a.id) === id);
  
  if (found) {
    article.value = {
      ...found,
      categoryLabel: getCategoryLabel(found.category)
    };
    
    // Set neighboring articles
    const index = blogArticles.indexOf(found);
    prevArticle.value = index > 0 ? blogArticles[index - 1] : null;
    nextArticle.value = index < blogArticles.length - 1 ? blogArticles[index + 1] : null;
    
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } else {
    router.push('/blog');
  }
};

onMounted(() => {
  loadArticle();
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});

const handleCategoryClick = (cat) => {
  router.push({ path: '/blog', query: { category: cat } });
};

const handleTagClick = (tag) => {
  router.push({ path: '/blog', query: { tag: tag } });
};

onUnmounted(() => {
  // Keep scroll enabled
});

watch(() => route.params.id, loadArticle);
const goToArticle = (id) => router.push(`/blog/${id}`);
</script>

<style scoped>
.blog-detail-wrapper { min-height: 100vh; background-color: #ffffff; position: relative; }

.blog-container { width: 100%; max-width: 860px; margin: 0 auto; padding: 0 25px; }

.top-decoration {
  position: absolute; top: 0; left: 0; width: 100%; height: 500px;
  opacity: 0.12; pointer-events: none; z-index: 0;
}

/* Hero Section */
.article-hero { position: relative; padding: 160px 0 60px; z-index: 1; }
.meta-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }

.back-link {
  display: flex; align-items: center; gap: 8px; color: #94a3b8; font-weight: 700;
  text-decoration: none; transition: all 0.3s;
}
.back-link:hover { color: var(--color-primary); transform: translateX(-5px); }

.article-title { font-size: 3.6rem; font-weight: 900; line-height: 1.1; color: #0f172a; margin-bottom: 20px; letter-spacing: -2px; }

.article-subtitle { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
.hero-category-tag { 
  background: var(--color-primary-1) !important; 
  border: 1px solid var(--color-primary-2) !important; 
  color: var(--color-primary) !important; 
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hero-category-tag:hover {
  transform: translateY(-2px);
}

.v-dot { width: 4px; height: 4px; background: #cbd5e1; border-radius: 50%; }
.publish-date { font-size: 1.05rem; color: #94a3b8; font-weight: 600; }

.clickable { cursor: pointer; transition: all 0.3s; }

/* Content Section - Premium Typography */
.content-wrapper { padding-bottom: 80px; }
.article-body { 
  font-size: 1.2rem; line-height: 2; color: #334155; 
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

:deep(.article-body h2) { 
  font-size: 2.2rem; font-weight: 800; margin: 2em 0 0.8em; color: #0f172a; 
  display: flex; align-items: center; gap: 16px;
  position: relative;
}
:deep(.article-body h2::before) { 
  content: ''; width: 4px; height: 1.2em; background: var(--color-primary); 
  display: inline-block; border-radius: 4px;
}

:deep(.article-body h3) {
  font-size: 1.6rem; font-weight: 700; margin: 1.8em 0 0.8em; color: #1e293b;
}

:deep(.article-body p) { margin-bottom: 2em; letter-spacing: 0.01em; }

/* Custom List Markers */
:deep(.article-body ul) { list-style: none; padding-left: 10px; margin-bottom: 2em; }
:deep(.article-body li) { 
  position: relative; padding-left: 28px; margin-bottom: 12px; font-weight: 500;
}
:deep(.article-body li::before) {
  content: "✦"; position: absolute; left: 0; color: var(--color-primary); font-size: 1rem; top: 0;
}

/* Syntax Highlighting Mockup */
:deep(.article-body pre) { 
  background: #0f172a; color: #e2e8f0; padding: 28px; border-radius: 20px; margin: 3em 0; 
  font-family: 'Fira Code', 'JetBrains Mono', monospace; overflow-x: auto; 
  box-shadow: 0 20px 50px -15px rgba(15, 23, 42, 0.3);
  font-size: 0.95rem; line-height: 1.6; border: 1px solid rgba(255,255,255,0.08);
}
:deep(.article-body code) { font-family: inherit; }
:deep(.article-body .keyword) { color: #f472b6; font-weight: 600; }
:deep(.article-body .string) { color: #34d399; }
:deep(.article-body .comment) { color: #64748b; font-style: italic; }
:deep(.article-body .function) { color: #60a5fa; }

:deep(.article-body blockquote) {
  margin: 3em 0; padding: 30px 40px; background: #fdf2f8; border-left: 6px solid var(--color-primary);
  border-radius: 0 20px 20px 0; font-style: italic; font-size: 1.3rem; color: #831843;
  line-height: 1.8;
}

/* Footer Section */
.article-footer { margin-top: 40px; padding-top: 30px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-start; }
.footer-tag { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; color: #64748b !important; font-weight: 700; margin-right: 12px; transition: all 0.3s; }
.footer-tag:hover { border-color: var(--color-primary) !important; color: var(--color-primary) !important; background: #fff !important; }

/* REFINED Navigation Section - Compact & Elegant */
.article-nav { margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 40px; }
.minimal-nav { 
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
}
.nav-link { 
  flex: 1; cursor: pointer; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex; flex-direction: column; gap: 6px;
}
.nav-link.next { text-align: right; }
.nav-link:hover { transform: translateY(-3px); }
.nav-link:hover .nav-text { color: var(--color-primary); }

.nav-arrow { font-size: 0.85rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 6px; }
.nav-link.next .nav-arrow { justify-content: flex-end; }
.nav-text { 
  font-size: 1.15rem; font-weight: 800; color: #0f172a; line-height: 1.4; 
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  transition: color 0.3s;
}

.nav-v-divider { width: 1px; height: 40px; background: #e2e8f0; }

/* Loader */
.loading-full { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; color: #94a3b8; }
.sakura-loader { width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s infinite linear; }

@media (max-width: 768px) {
  .blog-container { padding: 0 20px; }
  .article-hero { padding: 110px 0 40px; }
  .article-title { font-size: 2.1rem; letter-spacing: -1px; margin-bottom: 15px; }
  .article-subtitle { margin-bottom: 30px; gap: 8px; }
  .publish-date { font-size: 0.95rem; }
  
  .article-body { font-size: 1.1rem; line-height: 1.8; }
  :deep(.article-body h2) { font-size: 1.6rem; margin: 1.8em 0 0.8em; }
  :deep(.article-body h2::before) { width: 20px; height: 3px; }
  :deep(.article-body p) { margin-bottom: 1.6em; }
  :deep(.article-body pre) { padding: 20px; border-radius: 16px; margin: 2em 0; font-size: 0.85rem; }
  :deep(.article-body blockquote) { padding: 20px; font-size: 1.1rem; margin: 2em 0; }
  
  .minimal-nav { flex-direction: column; align-items: stretch; gap: 20px; }
  .nav-v-divider { display: none; }
  .nav-text { font-size: 1rem; }
  .article-nav { margin-top: 40px; padding-top: 30px; }
}

@media (max-width: 480px) {
  .article-title { font-size: 1.85rem; }
  .article-hero { padding-top: 100px; }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.anim-fade-up { animation: fadeUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
</style>
