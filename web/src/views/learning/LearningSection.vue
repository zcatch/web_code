<template>
  <div class="section-page">
    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <div class="section-container">
      <!-- Left Sidebar - Navigation -->
      <aside class="section-nav">
        <div class="nav-header">
          <el-button
            class="back-btn"
            @click="goBack"
            circle
          >
            <el-icon><ArrowLeft /></el-icon>
          </el-button>
          <div class="nav-title">
            <span class="tech-icon">{{ currentTech?.icon }}</span>
            <span class="tech-name">{{ currentTech?.name }}</span>
          </div>
        </div>

        <!-- Chapter & Section List -->
        <div class="nav-list">
          <div
            v-for="chapter in currentTech?.chapters"
            :key="chapter.id"
            class="chapter-group"
          >
            <div class="chapter-title">{{ chapter.title }}</div>
            <div
              v-for="(section, index) in chapter.sections"
              :key="index"
              class="nav-item"
              :class="{ active: isCurrentSection(chapter.id, index) }"
              @click="navigateToSection(currentTech.id, chapter.id, index)"
            >
              <span class="nav-number">{{ index + 1 }}</span>
              <span class="nav-text">{{ section.title }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Content Area -->
      <main class="content-area">
        <div v-if="currentSection" class="section-content">
          <!-- Section Header -->
          <div class="section-header">
            <div class="breadcrumb">
              <span class="breadcrumb-item">{{ currentTech?.name }}</span>
              <el-icon><ArrowRight /></el-icon>
              <span class="breadcrumb-item">{{ currentChapter?.title }}</span>
            </div>
            <h1 class="section-title">{{ currentSection.title }}</h1>
          </div>

          <!-- Section Body -->
          <div class="section-body">
            <div class="content-text" v-html="formatContent(currentSection.content)"></div>

            <!-- Code Block -->
            <div v-if="currentSection.code" class="code-block">
              <div class="code-header">
                <span class="code-lang">{{ currentSection.language || 'code' }}</span>
                <button class="copy-btn" @click="copyCode(currentSection.code)">
                  <el-icon><DocumentCopy /></el-icon>
                  复制代码
                </button>
              </div>
              <pre><code>{{ currentSection.code }}</code></pre>
            </div>
          </div>

          <!-- Navigation Footer -->
          <div class="section-footer">
            <button
              v-if="prevSection"
              class="nav-button prev"
              @click="goToPrevSection"
            >
              <div class="nav-icon">
                <el-icon><ArrowLeft /></el-icon>
              </div>
              <div class="nav-content">
                <span class="nav-label">上一节</span>
                <span class="nav-title-text">{{ prevSection.title }}</span>
              </div>
            </button>

            <button
              v-if="nextSection"
              class="nav-button next"
              @click="goToNextSection"
            >
              <div class="nav-content">
                <span class="nav-label">下一节</span>
                <span class="nav-title-text">{{ nextSection.title }}</span>
              </div>
              <div class="nav-icon">
                <el-icon><ArrowRight /></el-icon>
              </div>
            </button>
          </div>
        </div>

        <!-- Loading or Error State -->
        <div v-else class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>内容加载中...</h3>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, DocumentCopy } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { techStacks } from './data/index';

const route = useRoute();
const router = useRouter();

const currentTech = ref(null);
const currentChapter = ref(null);
const currentSection = ref(null);
const currentChapterIndex = ref(0);
const currentSectionIndex = ref(0);

// 加载当前内容
const loadContent = () => {
  const { techId, chapterId, sectionIndex } = route.params;
  
  console.log('Loading content:', { techId, chapterId, sectionIndex });
  
  // 查找技术栈
  currentTech.value = techStacks.find(t => t.id === techId);
  if (!currentTech.value) {
    console.error('Tech not found:', techId);
    return;
  }
  
  console.log('Found tech:', currentTech.value.name);
  console.log('Chapters:', currentTech.value.chapters.length);

  // 查找章节
  currentChapterIndex.value = currentTech.value.chapters.findIndex(c => c.id === chapterId);
  currentChapter.value = currentTech.value.chapters[currentChapterIndex.value];
  if (!currentChapter.value) {
    console.error('Chapter not found:', chapterId);
    return;
  }
  
  console.log('Found chapter:', currentChapter.value.title);
  console.log('Sections:', currentChapter.value.sections.length);

  // 查找小节
  currentSectionIndex.value = parseInt(sectionIndex);
  currentSection.value = currentChapter.value.sections[currentSectionIndex.value];
  
  if (currentSection.value) {
    console.log('Found section:', currentSection.value.title);
  } else {
    console.error('Section not found:', sectionIndex);
  }
};

// 判断是否是当前小节
const isCurrentSection = (chapterId, sectionIndex) => {
  return currentChapter.value?.id === chapterId && 
         currentSectionIndex.value === sectionIndex;
};

// 获取上一节
const prevSection = computed(() => {
  if (!currentTech.value) return null;

  // 当前章节的上一节
  if (currentSectionIndex.value > 0) {
    return {
      techId: currentTech.value.id,
      chapterId: currentChapter.value.id,
      sectionIndex: currentSectionIndex.value - 1,
      title: currentChapter.value.sections[currentSectionIndex.value - 1].title
    };
  }

  // 上一章节的最后一节
  if (currentChapterIndex.value > 0) {
    const prevChapter = currentTech.value.chapters[currentChapterIndex.value - 1];
    return {
      techId: currentTech.value.id,
      chapterId: prevChapter.id,
      sectionIndex: prevChapter.sections.length - 1,
      title: prevChapter.sections[prevChapter.sections.length - 1].title
    };
  }

  return null;
});

// 获取下一节
const nextSection = computed(() => {
  if (!currentTech.value || !currentChapter.value) return null;

  // 当前章节的下一节
  if (currentSectionIndex.value < currentChapter.value.sections.length - 1) {
    return {
      techId: currentTech.value.id,
      chapterId: currentChapter.value.id,
      sectionIndex: currentSectionIndex.value + 1,
      title: currentChapter.value.sections[currentSectionIndex.value + 1].title
    };
  }

  // 下一章节的第一节
  if (currentChapterIndex.value < currentTech.value.chapters.length - 1) {
    const nextChapter = currentTech.value.chapters[currentChapterIndex.value + 1];
    return {
      techId: currentTech.value.id,
      chapterId: nextChapter.id,
      sectionIndex: 0,
      title: nextChapter.sections[0].title
    };
  }

  return null;
});

// 导航方法
const goBack = () => {
  router.push({ name: 'LearningNotes' });
};

const navigateToSection = (techId, chapterId, sectionIndex) => {
  router.push({
    name: 'LearningSection',
    params: { techId, chapterId, sectionIndex }
  });
};

const goToPrevSection = () => {
  if (prevSection.value) {
    navigateToSection(
      prevSection.value.techId,
      prevSection.value.chapterId,
      prevSection.value.sectionIndex
    );
  }
};

const goToNextSection = () => {
  if (nextSection.value) {
    navigateToSection(
      nextSection.value.techId,
      nextSection.value.chapterId,
      nextSection.value.sectionIndex
    );
  }
};

// 格式化内容
const formatContent = (content) => {
  if (!content) return '';
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.+)$/, '<p>$1</p>')
    .replace(/•/g, '<span class="bullet">•</span>');
};

// 复制代码
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    ElMessage.success('代码已复制到剪贴板');
  } catch (err) {
    ElMessage.error('复制失败');
  }
};

// 监听路由变化
watch(() => route.params, () => {
  loadContent();
  // 滚动到顶部
  const contentArea = document.querySelector('.content-area');
  if (contentArea) {
    contentArea.scrollTop = 0;
  }
}, { deep: true });

onMounted(() => {
  loadContent();
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});
</script>

<style scoped>
.section-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fc;
  position: relative;
  padding-top: 70px;
}

/* Ambient Background */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary-3);
  top: -100px;
  right: -50px;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: var(--color-secondary-2);
  bottom: 50px;
  left: -150px;
}

/* Main Container */
.section-container {
  display: flex;
  height: calc(100vh - 70px);
  max-width: 1600px;
  margin: 0 auto;
}

/* Left Sidebar */
.section-nav {
  width: 320px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-header {
  padding: 25px 20px;
  border-bottom: 2px solid #f1f5f9;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-btn {
  background: white !important;
  border: 2px solid #e2e8f0 !important;
  color: #64748b !important;
  width: 40px !important;
  height: 40px !important;
  flex-shrink: 0;
}

.back-btn:hover {
  border-color: var(--color-primary) !important;
  color: var(--color-primary) !important;
}

.nav-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tech-icon {
  font-size: 1.8rem;
}

.tech-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e293b;
}

/* Navigation List */
.nav-list {
  padding: 20px 15px;
}

.chapter-group {
  margin-bottom: 25px;
}

.chapter-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 10px 15px;
  margin-bottom: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 6px;
}

.nav-item:hover {
  background: rgba(244, 114, 182, 0.05);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(168, 85, 247, 0.15));
  box-shadow: 0 2px 8px rgba(244, 114, 182, 0.2);
}

.nav-number {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.nav-item.active .nav-number {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  flex: 1;
}

.nav-item.active .nav-text {
  color: #1e293b;
  font-weight: 700;
}

/* Right Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px 60px;
}

.section-content {
  max-width: 900px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  margin-bottom: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #94a3b8;
}

.breadcrumb-item {
  font-weight: 600;
}

.breadcrumb .el-icon {
  font-size: 0.8rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

/* Section Body */
.section-body {
  background: white;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.content-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #475569;
}

.content-text :deep(p) {
  margin-bottom: 20px;
}

.content-text :deep(.bullet) {
  color: var(--color-primary);
  font-weight: 700;
  margin-right: 8px;
}

/* Code Block */
.code-block {
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #1e293b;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}

.code-lang {
  font-size: 0.85rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #475569;
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: #334155;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.code-block pre {
  margin: 0;
  padding: 25px;
  overflow-x: auto;
  background: #1e293b;
}

.code-block code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #e2e8f0;
}

/* Section Footer */
.section-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
}

.nav-button {
  flex: 1;
  max-width: 350px;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.nav-button:hover {
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(244, 114, 182, 0.1);
}

.nav-button.prev {
  margin-right: auto;
}

.nav-button.next {
  margin-left: auto;
}

.nav-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.nav-icon .el-icon {
  font-size: 1.2rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.nav-button:hover .nav-icon .el-icon {
  color: var(--color-primary);
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  flex: 1;
  min-width: 0;
}

.nav-button.next .nav-content {
  text-align: right;
}

.nav-label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-title-text {
  font-size: 1rem;
  color: #1e293b;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s;
}

.nav-button:hover .nav-title-text {
  color: var(--color-primary);
}

/* Empty State */
.empty-state {
  padding: 100px 40px;
  text-align: center;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

/* Scrollbar */
.section-nav::-webkit-scrollbar,
.content-area::-webkit-scrollbar {
  width: 8px;
}

.section-nav::-webkit-scrollbar-track,
.content-area::-webkit-scrollbar-track {
  background: transparent;
}

.section-nav::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.section-nav::-webkit-scrollbar-thumb:hover,
.content-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive */
@media (max-width: 1024px) {
  .section-container {
    flex-direction: column;
    height: auto;
  }

  .section-nav {
    width: 100%;
    max-height: 400px;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }

  .content-area {
    padding: 30px 20px;
    height: auto;
  }

  .section-body {
    padding: 25px;
  }

  .section-footer {
    flex-direction: column;
    gap: 12px;
  }

  .nav-button {
    max-width: 100%;
  }

  .nav-button.prev,
  .nav-button.next {
    margin: 0;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .nav-button {
    padding: 16px 20px;
  }

  .nav-icon {
    width: 36px;
    height: 36px;
  }

  .nav-icon .el-icon {
    font-size: 1.1rem;
  }

  .nav-title-text {
    font-size: 0.9rem;
  }
}
</style>
